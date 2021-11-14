import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../db/models/User';

export type AuthScope = 'USER' | 'ADMIN';

export const isAuthorized = (needed: AuthScope, owned?: AuthScope) => {
    if (owned === 'ADMIN') {
        return true;
    }

    return owned === needed;
};

export interface AuthInfo {
    userId: string;
    authScope: AuthScope;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            authInfo?: AuthInfo;
        }
    }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID as string);

export const getUserFromToken = async (token?: string) => {
    if (!token || token === '') {
        throw new Error();
    }

    const payload = (
        await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID as string,
        })
    ).getPayload();

    if (!payload) {
        throw new Error();
    }

    const user = await User.findOne({ googleID: payload.sub });

    return {
        googleID: payload.sub,
        user,
    };
};

export const authMiddleWareExpress = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-auth-token'] as string;

    try {
        const { user } = await getUserFromToken(token);

        if (!user) {
            return next();
        }

        req.authInfo = {
            userId: user.id,
            authScope: user.authScope,
        };

        next();
    } catch (error) {
        return next();
    }
};
