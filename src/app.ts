require('dotenv').config()
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { connect_db } from './config/db'
import { BookResolvers, UserResolvers, GithubResolvers } from './resolvers'
import { BookTypeDefs, UserTypeDefs, GithubTypeDefs } from './schemas'
import { BooksAPI } from './datasources/books';
import { GithubAPI } from './datasources/github';

interface Context {
  // token?: String;
  dataSources: {
    booksAPI: BooksAPI;
    githubAPI: GithubAPI;
  };
}
const PORT = process.env.PORT || 4000;
connect_db()

export async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  httpServer.listen({ port: PORT });
  const server = new ApolloServer<Context>({
    typeDefs: [BookTypeDefs, UserTypeDefs, GithubTypeDefs],
    resolvers: [BookResolvers, UserResolvers, GithubResolvers],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: 'http://localhost:3000',
      credentials: true
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const { cache } = server;
        return {
          // token: req.headers.token || "Not found User",
          dataSources: {
            booksAPI: new BooksAPI({cache}),
            githubAPI: new GithubAPI({cache}),
          }
        }
      },
    }),
  );
return app
}
