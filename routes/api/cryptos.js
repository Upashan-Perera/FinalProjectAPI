const express = require('express');
const router = express.Router();
// Import Project model
const Crypto = require('../../models/crypto')

router.get('/', async (req,res,next) => {
    // for now, just enter success
    // res.status(200).json('success');
    // Show an unfiltered list of Projects
    // Project.find((err, projects) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.json(projects);
    //     }
    // })
    let cryptos = await Crypto.find();
    res.status(200).json(cryptos);
})

// C mapped to POST
router.post("/", async (req, res, next) => {

    if (!req.body.rank) {
        res.status(400).json({ validationError: "Rank is a required field." });
      }else if (!req.body.symbol) {
        res.status(400).json({ validationError: "Symbol is a required field." });
      }else if (!req.body.cmc) {
        res.status(400).json({ validationError: "CMC is a required field." });
      }else if (!req.body.quote.USD.vol_24H) {
        res.status(400).json({ validationError: "vol_24H is a required field." });
      }else if (!req.body.quote.USD.percentage_change_1h) {
        res.status(400).json({ validationError: "percentage_change_1h is a required field." });
      }else if (!req.body.quote.USD.percentage_change_24h) {
        res.status(400).json({ validationError: "percentage_change_24h is a required field." });
      }else if (!req.body.quote.USD.percentage_change_7d) {
        res.status(400).json({ validationError: "percentage_change_7d is a required field." });
      }else {
        let crypto = new Crypto({
            rank:req.body.rank,
            name: req.body.name,
            symbol: req.body.symbol,
            cmc: req.body.cmc,
            update:req.body.update,
            update_time: req.body.update_time,
            circulating_supply: req.body.circulating_supply,
            max_supply: req.body.max_supply, 
            total_supply:req.body.total_supply,
            price: req.body.quote.USD.price,
            market_cap: req.body.quote.USD.market_cap,
            vol_24H: req.body.quote.USD.vol_24H,
            percentage_change_1h: req.body.quote.USD.percentage_change_1h,
            percentage_change_24h: req.body.quote.USD.percentage_change_24h,
            percentage_change_7d: req.body.quote.USD.percentage_change_7d,
        });
        await crypto.save();
        res.status(201).json(crypto);
      }
});

// U mapped to PUT
router.put("/:_id", async (req, res, next) => {
    if (!req.body.rank) {
        res.status(400).json({ validationError: "Rank is a required field." });
      }else if (!req.body.symbol) {
        res.status(400).json({ validationError: "Symbol is a required field." });
      }else if (!req.body.cmc) {
        res.status(400).json({ validationError: "CMC is a required field." });
      }else if (!req.body.quote.USD.vol_24H) {
        res.status(400).json({ validationError: "vol_24H is a required field." });
      }else if (!req.body.quote.USD.percentage_change_1h) {
        res.status(400).json({ validationError: "percentage_change_1h is a required field." });
      }else if (!req.body.quote.USD.percentage_change_24h) {
        res.status(400).json({ validationError: "percentage_change_24h is a required field." });
      }else if (!req.body.quote.USD.percentage_change_7d) {
        res.status(400).json({ validationError: "percentage_change_7d is a required field." });
      }else {
        let crypto = await Crypto.findByIdAndUpdate(
          req.params._id,
          {
            rank:req.body.rank,
            name: req.body.name,
            symbol: req.body.symbol,
            cmc: req.body.cmc,
            update:req.body.update,
            update_time: req.body.update_time,
            circulating_supply: req.body.circulating_supply,
            max_supply: req.body.max_supply, 
            total_supply:req.body.total_supply,
            price: req.body.quote.USD.price,
            market_cap: req.body.quote.USD.market_cap,
            vol_24H: req.body.quote.USD.vol_24H,
            percentage_change_1h: req.body.quote.USD.percentage_change_1h,
            percentage_change_24h: req.body.quote.USD.percentage_change_24h,
            percentage_change_7d: req.body.quote.USD.percentage_change_7d,
          },
          { new: true } // need this parameter so that mongoose returns the updated version of Contact
        );
        res.status(200).json(crypto);
      }
    });

     // D mapped to DELETE
router.delete("/:_id", async (req, res, next) => {
    await Crypto.findByIdAndDelete(req.params._id);
    res.status(200).json({ 'success': 'true' });
  });
//   router.get("/rank", async (req, res, next) => {
//     // find() and sort() are built-in mongoose module methods
//     let crypto = await Crypto.find().sort([["name"]]);
//     res.status(200).json(crypto);
//   });
module.exports = router;