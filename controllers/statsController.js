import { Crypto } from '../models/crytoModel.js';

export async function statsController(req, res) {
    try {
        const symbol = req.query.coin;

        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: 'Coin symbol is required'
            });
        }

        const latestCrypto = await Crypto.findOne({ name: symbol })
            .sort({ timestamp: -1 })
            .limit(1);

        if (!latestCrypto) {
            return res.status(404).json({
                success: false,
                message: 'Currency not found'
            });
        }

        return res.status(200).json({
            price: latestCrypto.price_usd,
            market_cap: latestCrypto.market_cap_usd,
            percent_change_24h: latestCrypto.percent_change_24h
        });
    } catch (error) {
        console.error('Error in statsController:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export async function getStandardDeviation(req, res) {
    try {
        const symbol = req.query.coin;

        if (!symbol) {
            return res.status(400).json({
                status: 'error',
                message: 'Coin symbol is required'
            });
        }

        const prices = await Crypto.find({ name: symbol })
            .sort({ timestamp: -1 })
            .limit(100)
            .select('price_usd -_id');

        if (prices.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No data found for this cryptocurrency'
            });
        }

        const priceValues = prices.map(p => p.price_usd).filter(value => value != null);
        
        if (priceValues.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No valid price data available'
            });
        }

        const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;

        const variance = priceValues.reduce((sq, n) => {
            return sq + Math.pow(n - mean, 2);
        }, 0) / (priceValues.length - 1);

        const stdDev = Math.sqrt(variance);

        return res.json({
            deviation: stdDev,
        });

    } catch (error) {
        console.error('Error in getStandardDeviation:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}