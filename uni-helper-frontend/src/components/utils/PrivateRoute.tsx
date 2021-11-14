import React from 'react';
import type { RouteProps } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export interface Props {
    adminOnly?: boolean;
}

const PrivateRoute: React.FC<Props & RouteProps> = ({ children, adminOnly, ...rest }) => {
    const { authScope } = useAuthContext();

    const isAllowed = adminOnly ? authScope === 'ADMIN' : authScope !== 'NONE';

    return (
        <Route {...rest}>
            {isAllowed ? children : <Redirect to="login" /> }
        </Route>
    );
};

export default PrivateRoute;
