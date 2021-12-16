import { getModelForClass, prop } from '@typegoose/typegoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import type { Document } from 'mongoose';
import type { ResolverDefinition } from 'graphql-compose';
import { AuthScope, getUserFromToken } from '../../middleware/auth';
import { Subject, SubjectTC } from './Subject';
import type { Context } from '../../graphql/schema';

class UserSchema {
    @prop({ required: true })
    public googleID!: string;

    @prop({ required: true })
    public authScope!: AuthScope;

    @prop({ required: true, type: () => [String] })
    public subjectIds!: string[];
}

export const User = getModelForClass(UserSchema, { schemaOptions: { collection: 'users' } });
export const UserTC = composeMongoose<Document<UserSchema> & UserSchema, Context>(User);

UserTC.addFields({
    subjects: {
        type: [SubjectTC],
        resolve: async user => Subject.find({
            _id: user.subjectIds,
        }),
    },
});

interface LoginArgs {
    oAuthToken: string;
}

UserTC.addResolver({
    kind: 'mutation',
    name: 'login',
    args: {
        oAuthToken: 'String!',
    },
    type: UserTC,
    resolve: async ({ args }) => {
        const { user, googleID } = await getUserFromToken(args.oAuthToken);

        if (user) {
            return user;
        }

        const newUser = new User({ googleID, authScope: 'USER', subjectIds: [] });

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        newUser.save();

        return newUser;
    },
} as ResolverDefinition<unknown, Context, LoginArgs>);

UserTC.addResolver({
    name: 'me',
    type: UserTC,
    resolve: ({ context }) => {
        if (!context.user?.userId) {
            return null;
        }

        return UserTC.mongooseResolvers.findById().resolve({ args: { _id: context.user.userId } }) as Document & UserSchema;
    },
} as ResolverDefinition<unknown, Context, unknown>);
