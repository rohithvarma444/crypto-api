import axios from 'axios';
import { Crypto } from '../models/crytoModel.js';

export async function fetchData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true');
        const data = response.data;

        for (const [symbol, stats] of Object.entries(data)) {
            const crypto = new Crypto({
                name: symbol,
                price_usd: stats.usd,
                market_cap_usd: stats.usd_market_cap,
                percent_change_24h: stats.usd_24h_change
            });

            await crypto.save();
        }
        console.log('Data fetched and saved successfully');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}