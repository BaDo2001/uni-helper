import React from 'react';
import type { RouteProps } from 'react-router-dom';
import { useHistory, Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export interface Props {
    adminOnly?: boolean;
}

const PrivateRoute: React.FC<Props & RouteProps> = ({ children, adminOnly, ...rest }) => {
    const { authScope } = useAuthContext();

    const isAllowed = adminOnly ? authScope === 'ADMIN' : authScope !== 'NONE';

    const history = useHistory();

    return (
        <Route {...rest}>
            {isAllowed ? children : (
                <Redirect to={{
                    pathname: '/login',
                    state: {
                        referrer: history.location.pathname,
                    },
                }}
                />
            ) }
        </Route>
    );
};

export default PrivateRoute;
