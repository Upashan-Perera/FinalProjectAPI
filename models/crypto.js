// Import Mongoose
const mongoose = require("mongoose");
// Create schema definition object > JSON format
const schemaDefObj = {
  rank: {
    type: String,
    require: true,
  },
  name: {
    type: String, 
  },
  symbol: {
    type: String,
    require: true,
  },
  cmc: {
    type: String,
    require: true,
  },
  update: {
    type: String,
  },
  update_time: {
    type: String, 
  },
  circulating_supply: {
    type: String, 
  },
  max_supply: {
    type: String, 
  },
  total_supply: {
    type: String, 
  }, 
  quote: {
    price: {
        type: String,
        require: true,
      },
      market_cap: {
        type: String, 
      },
      vol_24H: {
        type: String,
        require: true,
      },
      percentage_change_1h: {
        type: String,
        require: true,
      },
      percentage_change_24h: {
        type: String,
        require: true,
      },
      percentage_change_7d: {
        type: String,
        require: true,
      },
  } , 
};
// Create mongoose schema
const cryptoSchema = new mongoose.Schema(schemaDefObj);
// Export mongoose model
module.exports = mongoose.model("Crypto", cryptoSchema);