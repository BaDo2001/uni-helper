import React, { createContext, useContext, useState } from 'react';
import type { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useLoginMutation } from '../../generated-typings/graphql-types';
import { useMessageContext } from './MessageContext';

export type AuthScope = 'ADMIN' | 'NONE' | 'USER';

export interface HistoryState {
    referrer: string;
}

const useAuthContextValue = () => {
    const [authInfo, setAuthInfo] = useState<GoogleLoginResponse | null>(null);
    const [authScope, setAuthScope] = useState<AuthScope>('NONE');
    const history = useHistory<HistoryState>();
    const [loginMutation] = useLoginMutation();
    const { addMessage } = useMessageContext();

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

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (history.location.state && history.location.state.referrer !== 'login') {
                    history.push(history.location.state.referrer);
                } else {
                    history.push('/dashboard');
                }
            } else {
                addMessage({ id: uuid(), message: 'Something went wrong. Please try again.', type: 'ERROR' });
            }
        } catch (error: unknown) {
            addMessage({ id: uuid(), message: 'Something went wrong. Please try again.', type: 'ERROR' });
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
