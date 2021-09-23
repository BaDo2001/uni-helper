import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import helmet from 'helmet';
import { schema } from './schema';
import dotenv from 'dotenv';

const app = express();
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env' });
} else if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
}

const PORT = process.env.PORT;

const server = new ApolloServer({
    schema,
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen({ port: PORT }, () => console.log(`🚀GraphQL-Server is running on http://localhost:${PORT}/graphql`));
