require('dotenv').config()
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { resolvers } from './resolvers/book'
import { typeDefs } from './schemas/book'

import { BooksAPI } from './datasources/books';

interface Context {
  dataSources: {
    booksAPI: BooksAPI;
  };
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

export async function startServer() {
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
       return {
        dataSources: {
          booksAPI: new BooksAPI({cache}),
        },
      }
    },
  });
  return url;
}
