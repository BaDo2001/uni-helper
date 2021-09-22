import express, { RequestHandler } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { schema } from './schema';

const PORT = process.env.PORT || 5000;

const app = express();
app.use('*', cors() as RequestHandler);
app.use(helmet());
app.use(compression());

const server = new ApolloServer({
    schema,
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen({ port: PORT }, () => console.log(`🚀GraphQL-Server is running on http://localhost:${PORT}/graphql`));
