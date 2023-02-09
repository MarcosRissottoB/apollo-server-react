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