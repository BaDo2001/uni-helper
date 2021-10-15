import { IQueryResolvers } from '../../../generated-typings/graphql-types';

const QueryResolver: Required<IQueryResolvers> = {
    users: () => {
        return [
            { name: 'John Doe', email: 'john.doe@example.com', age: 27, country: null, id: null },
            { name: 'Jane Doe', email: 'jane.doe@example.com', age: 30, country: null, id: null },
        ];
    },
    Bsz2: () => {
        return {
            id: '3',
            name: 'Bevezetés a számításelméletbe 2.',
            credits: 5,
        };
    },
};

export default QueryResolver;
