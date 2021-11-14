import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import dotenv from 'dotenv';
import { authMiddleWareExpress } from './middleware/auth';
import schema from './graphql/schema';
import { connectDB } from './db/db';

const app = express();
app.use(compression());

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env' });

    app.get('/', (req, res) => {
        res.sendStatus(200);
    });
} else if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
}

const { PORT } = process.env;

const server = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: ({ req }) => ({
        user: req.authInfo,
    }),
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/graphql', authMiddleWareExpress);

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

const startServer = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectDB();
    httpServer.listen({ port: PORT }, () => {
        // eslint-disable-next-line no-console
        console.log(`\n🚀 GraphQL-Server is running on http://localhost:${PORT ?? 4000}/graphql\n`);
    });
};

startServer();
