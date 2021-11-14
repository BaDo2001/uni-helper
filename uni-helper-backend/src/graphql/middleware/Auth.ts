import { ResolverMiddleware } from 'graphql-compose';
import { AuthScope, isAuthorized } from '../../middleware/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authMiddlewareGraphQL: (authScope: AuthScope) => ResolverMiddleware<any, any, any> =
(authScope) => (resolve, source, args, context, info) => {
    if (!isAuthorized(authScope, context.user?.authScope)) {
        throw new Error('Unauthorized');
    }

    return resolve(source, args, context, info);
};
