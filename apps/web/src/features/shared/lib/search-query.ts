import { ReadonlyURLSearchParams } from 'next/navigation';

export class SearchQuery {
  private query: URLSearchParams;

  constructor(query: ReadonlyURLSearchParams) {
    this.query = new URLSearchParams(query);
  }

  updateParam(param: string, value: string) {
    this.query.set(param, value);
  }

  deleteParam(param: string) {
    this.query.delete(param);
  }

  get() {
    return this.query.toString();
  }
}
