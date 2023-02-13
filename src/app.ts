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
import { UserAPI } from './datasources/user';

interface Context {
  token: String,
  dataSources: {
    booksAPI: BooksAPI;
    githubAPI: GithubAPI;
    userAPI: UserAPI;
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
        const token = req.headers.authorization || '';
        return {
          token: req.headers.authorization || '',
          dataSources: {
            booksAPI: new BooksAPI({cache}),
            githubAPI: new GithubAPI({cache}),
            userAPI: new UserAPI({cache}),
          }
        }
      },
    }),
  );
  return app
}
