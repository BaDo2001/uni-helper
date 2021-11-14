import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export interface Props {
    adminOnly?: boolean;
}

const PrivateRoute: React.FC<RouteProps & Props> = ({ children, adminOnly, ...rest }) => {
    const { authScope } = useAuthContext();

    const isAllowed = adminOnly ? authScope === 'ADMIN' : authScope !== 'NONE';

    return (
        <Route {...rest}>
            {isAllowed ? children : <Redirect to="login" /> }
        </Route>
    );
};

export default PrivateRoute;
