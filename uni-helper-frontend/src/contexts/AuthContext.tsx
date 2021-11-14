import React, { createContext, useContext, useState } from 'react';
import type { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { useLoginMutation } from '../../generated-typings/graphql-types';

export type AuthScope = 'ADMIN' | 'NONE' | 'USER';

const useAuthContextValue = () => {
    const [authInfo, setAuthInfo] = useState<GoogleLoginResponse | null>(null);
    const [authScope, setAuthScope] = useState<AuthScope>('NONE');
    const history = useHistory();
    const [loginMutation] = useLoginMutation();

    const refreshToken = async (expiresIn: number) => {
        if (authInfo) {
            const authRes = await authInfo.reloadAuthResponse();

            setAuthInfo({
                ...authInfo,
                tokenObj: authRes,
            });
            localStorage.setItem('token', authRes.id_token);

            setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                refreshToken(authInfo.tokenObj.expires_in);
            }, (expiresIn - 5 * 60) * 1000);
        }
    };

    const login = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const response = res as GoogleLoginResponse;

        try {
            const loginData = await loginMutation({ variables: { oAuthToken: response.tokenObj.id_token } });

            if (loginData.data?.UserLogin?.authScope) {
                setAuthInfo(response);
                setAuthScope(loginData.data.UserLogin.authScope as AuthScope);
                localStorage.setItem('token', response.tokenObj.id_token);
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                refreshToken(response.tokenObj.expires_in);

                history.push('/dashboard');
            } else {
                // eslint-disable-next-line no-console
                console.log(loginData);
            }
        } catch (error: unknown) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    const logout = () => {
        setAuthInfo(null);
        setAuthScope('NONE');
        localStorage.removeItem('token');

        history.push('/login');
    };

    return {
        authScope,
        login,
        logout,
    };
};

const AuthContext = createContext({} as ReturnType<typeof useAuthContextValue>);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => <AuthContext.Provider value={useAuthContextValue()}>{children}</AuthContext.Provider>;

export default AuthProvider;
