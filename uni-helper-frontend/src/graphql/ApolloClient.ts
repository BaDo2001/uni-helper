import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    link: createHttpLink({
        uri: '/api/graphql',
    }),
    cache: new InMemoryCache(),
});

export default client;
