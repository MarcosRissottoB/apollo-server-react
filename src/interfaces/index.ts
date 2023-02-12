export interface Book {
  id: Number,
  name: String,
  type: String,
  available: Boolean
}

export interface OrderBook {
  id: String
  bookId: Number
  customerName: String
  createdBy: String
  quantity: Number
  timestamp: Number
}

export interface CurrentGithubUser {
  name: String,
  githubLogin: String,
  githubToken: String,
  avatar: String,
}
