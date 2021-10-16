import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useAuthContextValue = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();

    const login = () => {
        // TODO Add login

        setAuthenticated(true);
        history.push('/dashboard');
    };

    const logout = () => {
        // TODO Add logout

        setAuthenticated(false);
        history.push('/login');
    };

    return {
        authenticated,
        login,
        logout,
    };
};

const AuthContext = createContext({} as ReturnType<typeof useAuthContextValue>);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider: React.FC = ({ children }) => (
    <AuthContext.Provider value={useAuthContextValue()}>
        {children}
    </AuthContext.Provider>
);

export default AuthProvider;
