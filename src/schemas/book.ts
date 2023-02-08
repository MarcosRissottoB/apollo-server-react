export const typeDefs = `#graphql
  type Book {
    id: Int
    name: String
    type: String
    available: Boolean
  }
  type Query {
    book(id: ID!): Book
    books: [Book]
  }
`;