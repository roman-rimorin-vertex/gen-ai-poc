import fetch from 'node-fetch';
import cheerio from 'cheerio';

interface ScrapedData {
  title?: string;
}

export async function scrapeWebPage(url: string): Promise<ScrapedData> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('title').text();

    return { title }; 
    
  } catch (error) {
    console.error('Error scraping web page:', error);
    throw error;
  }
}

