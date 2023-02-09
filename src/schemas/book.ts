export const typeDefs = `#graphql
  type Book {
    id: ID!
    name: String!
    type: String!
    available: Boolean!
  }
  
  type OrderBook {
    id: ID!
    bookId:  ID!
    customerName: String!
    createdBy: String
    quantity: Int
    timestamp: Int
  }

  type Query {
    book(id: ID!): Book
    books: [Book]
    orderBook(id: ID!): OrderBook
    orderBooks: [OrderBook]
  }

  type CreateOrderBookResponse {
    created: Boolean!
    orderId: String!
  }

  input OrderInput {
    bookId: ID!
    customerName: String!
  }

  input UpdateOrderInput {
    id: ID!
    bookId: ID!
    customerName: String!
  }

  type Mutation {
    createOrderBook(orderBook: OrderInput): CreateOrderBookResponse
    updateOrderBook(orderBook: UpdateOrderInput): String!
    deleteOrderBook(id: ID!): String!
  }
`;