import { RESTDataSource, AugmentedRequest } from '@apollo/datasource-rest';

import {Book, OrderBook} from '../interfaces';

const BASE_URL = process.env.BASE_URL;
const BOOK_API_TOKEN = process.env.BOOK_API_TOKEN

export class BooksAPI extends RESTDataSource {
  override baseURL = BASE_URL

  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers['authorization'] = BOOK_API_TOKEN;
  }

  async getBook(id): Promise<Book> {
    return this.get<Book>(`books/${id}`);
  }

  async getBooks(limit = '10'): Promise<Book[]> {
    const data = await this.get('books', {
      params: {
        limit,
      },
    });
    return data;
  }

  async getOrderBook(id): Promise<OrderBook> {
    return this.get<OrderBook>(`orders/${id}`);
  }

  async getOrderBooks(limit = '10'): Promise<OrderBook[]> {
    const data = await this.get('orders', {
      params: {
        limit,
      },
    });
    return data;
  }

  async postOrderBook(orderBook) {
    return this.post(`orders`, 
      { body: orderBook }, 
    );
  }

  async updateOrderBook(orderBook) {
    return this.patch( `orders/${orderBook.id}`,
       { body: orderBook },
    );
  }

  async removeOrderBook(id) {
    return this.delete(`orders/${id}`);
  }
}