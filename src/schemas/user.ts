export const UserTypeDefs = `#graphql
  type User {
    id: ID
    name: String!
    email: String!
  }
  type AuthPayload {
    user: User
    token: String
  }
  type Query {
    hello: String
  }
  type Mutation {
    createUser(name: String!, email: String!): User
    signup(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload
  }
`;
