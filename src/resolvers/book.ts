import { GraphQLError } from 'graphql';

export const BookResolvers = {
  Query: {
    book: async (_, { id }, { token, dataSources }) => {
      if (!token){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      };
      return dataSources.booksAPI.getBook(id);
    },
    books: async (_, __, { token, dataSources }) => {
      if (!token){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      };
      return dataSources.booksAPI.getBooks();
    },
    orderBook: async (_, { id }, { token, dataSources }) => {
      if (!token){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      };
      return dataSources.booksAPI.getOrderBook(id);
    },
    orderBooks: async (_, __, { token, dataSources }) => {
      if (!token){
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      };
      return dataSources.booksAPI.getOrderBooks();
    },
  },
  Mutation: {
    createOrderBook: async (_, {orderBook}, { dataSources }) => {
      dataSources 
      return dataSources.booksAPI.postOrderBook(orderBook);
    },
    updateOrderBook: async (_, {orderBook}, { dataSources }) => {
      await dataSources.booksAPI.updateOrderBook(orderBook);
			return "Update complete!";
		},
    deleteOrderBook: async (_, { id }, { dataSources }) => {
			await dataSources.booksAPI.removeOrderBook(id);
      return "Delete complete!";
		}
  }
};