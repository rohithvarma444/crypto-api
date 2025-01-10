const { time } = require("console");
const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ["bitcoin", "ethereum", "matic-network"],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    price_usd: {
        type: Number,
        required: true
    },
    market_cap_usd: {
        type: Number,
        required: true
    },
    percent_change_24h: {
        type: Number,
        required: true
    }
});

cryptoSchema.pre('save', async function(next) {
    try {
        const model = mongoose.model('Crypto');
        const count = await model.countDocuments();
        
        if (count >= 300) {
            await model.findOneAndDelete({}, { sort: { timestamp: 1 } });
        }
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('Crypto', cryptoSchema);

