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
    signup(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload
  }
`;