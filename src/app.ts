require('dotenv').config()
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { connect_db } from './config/db'
import { BookResolvers, UserResolvers } from './resolvers'
import { BookTypeDefs, UserTypeDefs } from './schemas'
import { BooksAPI } from './datasources/books';

interface Context {
  // token?: String;
  dataSources: {
    booksAPI: BooksAPI;
  };
}
const PORT = process.env.PORT || 4000;
connect_db()

export async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  httpServer.listen({ port: PORT });
  const server = new ApolloServer<Context>({
    typeDefs: [BookTypeDefs, UserTypeDefs],
    resolvers: [BookResolvers, UserResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const { cache } = server;
        return {
          // token: req.headers.token || "Not found User",
          dataSources: {
            booksAPI: new BooksAPI({cache}),
          }
        }
      },
    }),
  );
return app
}
