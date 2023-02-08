import { RESTDataSource, RequestOptions } from '@apollo/datasource-rest';

const BASE_URL = process.env.BASE_URL;
const BOOK_API_TOKEN = process.env.BOOK_API_TOKEN

interface Book {
  id: Number,
  name: String,
  type: String,
  available: Boolean
}

export class BooksAPI extends RESTDataSource {
  override baseURL = BASE_URL

  // override willSendRequest(request: RequestOptions) {
  //   request.headers.set('Authorization', BOOK_API_TOKEN);
  // }

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
}