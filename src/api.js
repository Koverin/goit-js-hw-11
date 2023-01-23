import axios from 'axios';
export default class ApiServer {
  constructor() {
    this.searchQ = '';
    this.page = 1;
  }

  async requestApi() {
    console.log(this);
    const MY_KEY = '32945444-fd4efa3e9426c87bced8145d3';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios.get(
      `${BASE_URL}?key=${MY_KEY}&q=${this.searchQ}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );

    return response.data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  updatePage() {
    this.page = 1;
  }

  get query() {
    return this.searchQ;
  }

  set query(newQuery) {
    this.searchQ = newQuery;
  }
}
