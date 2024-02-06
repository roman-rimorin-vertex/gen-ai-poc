import { scrapeWebPage } from './web-scraper.js';
import { searchApi } from './brave-search.js';

const query = 'How many starts are there?';

const results = await searchApi(query);

const url = (results[0] as { url: string }).url;

const scrapedPage = await scrapeWebPage(url);

console.log(scrapedPage);
  