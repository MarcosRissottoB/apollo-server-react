export const resolvers = {
  Query: {
    book: async (_, { id }, { dataSources }) => {
      return dataSources.booksAPI.getBook(id);
    },
    books: async (_, __, { dataSources }) => {
      return dataSources.booksAPI.getBooks();
    },
    orderBook: async (_, { id }, { dataSources }) => {
      return dataSources.booksAPI.getOrderBook(id);
    },
    orderBooks: async (_, __, { dataSources }) => {
      return dataSources.booksAPI.getOrderBooks();
    },
  },
  Mutation: {
    createOrderBook: async (_, {orderBook}, { dataSources }) => { 
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