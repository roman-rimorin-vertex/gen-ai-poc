import * as dotenv from 'dotenv';
import { getEnvVar } from './util.js';

dotenv.config();

interface ApiResponse {
    web: {
        type: string;
        results: any[]; // You might want to define a more specific type for the objects within the results array
        family_friendly: boolean;
    };
}

export async function searchApi(query: string): Promise<any[]> {
    try {
        const baseUrl = getEnvVar('BRAVE_BASE_URL');
        // Include headers in the fetch options
        const response = await fetch(`${baseUrl}/res/v1/web/search?q=${query}`, {
        method: 'GET', // HTTP method
        headers: new Headers({
                "X-Subscription-Token": getEnvVar('BRAVE_API_KEY'),
                "Accept": "application/json",
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data: ApiResponse = await response.json();
        return data?.web?.results; // Fix: Check if data.web exists before accessing results
    } catch (error) {
        console.error('API search error:', error);
        throw error;
    }
}
  