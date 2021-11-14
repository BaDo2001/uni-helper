import type { ResolverMiddleware } from 'graphql-compose';
import type { AuthScope } from '../../middleware/auth';
import { isAuthorized } from '../../middleware/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line import/prefer-default-export
export const authMiddlewareGraphQL: (authScope: AuthScope) =>
ResolverMiddleware<any, any> = authScope => (resolve, source, args, context, info) => {
    if (!isAuthorized(authScope, context.user?.authScope as AuthScope)) {
        throw new Error('Unauthorized');
    }

    return resolve(source, args, context, info) as ResolverMiddleware<any, any>;
};
