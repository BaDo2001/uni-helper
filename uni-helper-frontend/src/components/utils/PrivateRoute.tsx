import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const { authenticated } = useAuthContext();

    return (
        <Route {...rest}>
            {authenticated ? children : <Redirect to="login" />}
        </Route>
    );
};

export default PrivateRoute;
