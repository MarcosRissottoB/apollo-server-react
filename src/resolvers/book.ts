export const resolvers = {
  Query: {
    book: async (_, { id }, { dataSources }) => {
      return dataSources.booksAPI.getBook(id);
    },
    books: async (_, __, { dataSources }) => {
      return dataSources.booksAPI.getBooks();
    },
  },
};