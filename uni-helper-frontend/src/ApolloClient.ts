import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
    uri: '/api/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            'x-auth-token': localStorage.getItem('token'),
        },
    }));

    return forward(operation);
});

const client = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
});

export default client;
