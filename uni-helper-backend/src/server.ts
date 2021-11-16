import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import { authMiddleWareExpress } from './middleware/auth';
import schema from './graphql/schema';
import { connectDB } from './db/db';

const app = express();
app.use(compression());

const server = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: ({ req }) => ({
        user: req.authInfo,
    }),
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use('/api/graphql', authMiddleWareExpress);

server.applyMiddleware({ app, path: '/api/graphql' });

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env' });

    app.get('/', (req, res) => {
        res.sendStatus(200);
    });
} else if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../public')));

    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: path.join(__dirname, '../../public') });
    });
}

const httpServer = createServer(app);

const startServer = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    connectDB();
    httpServer.listen({ port: process.env.PORT }, () => {
        // eslint-disable-next-line no-console
        console.log(`\n🚀 GraphQL-Server is running on http://localhost:${process.env.PORT ?? 5000}/api/graphql\n`);
    });
};

startServer();
