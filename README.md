# Cryptocurrency Price Tracking API

## Overview
This API allows users to track the latest prices of cryptocurrencies (Bitcoin, Ethereum, and Matic) and calculate statistical data like the standard deviation of their prices over the last 100 records. The API uses a background job to fetch price data every two hours and stores the data in a MongoDB database.

## Features
- **Cron Job for Data Fetching**: A background job that runs every 2 hours to fetch the latest price, market cap, and 24-hour price change of Bitcoin, Ethereum, and Matic.
- **Standard Deviation Calculation**: An API endpoint that calculates the standard deviation of the price of a specified cryptocurrency using the last 100 price records stored in the database.
- **Data Capping**: The database is capped to store only the last 100 records for each cryptocurrency to optimize data storage. Older records beyond the 100 most recent are discarded.
- **Price, Market Cap, and 24-hour Change**: The API provides real-time price, market cap, and 24-hour price change for the cryptocurrencies.
- **CORS Enabled**: API is accessible from any origin, making it suitable for public use and cross-origin requests.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for modeling and querying)
- **API Integration**: Axios for fetching real-time cryptocurrency data from the CoinGecko API
- **Background Jobs**: Node-Cron for scheduling tasks
- **Security**: CORS middleware for cross-origin access

## API Endpoints

### 1. `/stats`
Fetches the most recent price, market cap, and 24-hour price change of the specified cryptocurrency.

#### Request:
```bash
GET /api/v1/stats?coin={coinSymbol}
```

#### Parameters:

-   **coin**: The symbol of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`).

#### Response:
```bash
{
  "price": 95013,
  "market_cap": 1882177580702.4028,
  "percent_change_24h": 2.3603971003585102
}
```
-   **price**: The current price of the cryptocurrency in USD.
-   **market_cap**: The current market capitalization of the cryptocurrency in USD.
-   **percent_change_24h**: The percentage change in the cryptocurrency's price over the past 24 hours.

### 2. `/deviation`
Calculates and returns the standard deviation of the last 100 price records for the requested cryptocurrency.
#### Request:
```bash
GET /api/v1/deviation?coin={coinSymbol}
```
#### Parameters:

-   **coin**: The symbol of the cryptocurrency (e.g., `bitcoin`, `ethereum`, `matic-network`).
```json
{
"deviation":  199.32223253052425
}
```
### 3. Background Job (Cron Job)

The background job fetches the cryptocurrency data (price, market cap, and 24-hour change) every 2 hours and saves it to the MongoDB database. This is done automatically without user interaction.

-   **Frequency**: Every 2 hours
-   **Data**: Price in USD, market cap in USD, and 24-hour change percentage
-   **Cryptocurrencies Tracked**: Bitcoin, Ethereum, and Matic
```bash 
0 */2 * * *
```
### Local Deployment
```bash
git clone https://github.com/rohithvarma444/crypto-api.git
cd crypto-api
npm install

#.env
MONGO_URI=your_mongodb_connection_string
npm start
```