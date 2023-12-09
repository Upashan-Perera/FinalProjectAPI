const express = require('express');
const router = express.Router();
// Import Project model
const Crypto = require('../../models/crypto');
const pageSize = 10;


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

// GET /cryptos
/**
 * @openapi
 * /cryptos:
 *   get:
 *     description: Lists all cryptos
 *     responses:
 *       200:
 *         description: Returns an unfiltered list of cryptos
 */

// // GET /cryptos
// router.get('/', (req, res, next) => {
//   // Filter the list via optional URL query string parameters
//   // using the req.query object
//   // Expected query string ?status=STARTED&course=WebAPI
  
//   // create variable for storing page number
//   // extract value from query string
//   // Expected ?page=1
//   let page = req.query.page || 1; // default to page 1 
//   // calculate how many records to skip
//   // page 1 shows records 1 to 10 so skip 0
//   // page 2 shows records 11 to 20 so skip 10
//   let skipSize = pageSize * (page - 1);

//   // create empty query object
//   let query = {};
//   // if course is included in request, then add it to query object
//   if (req.query.name)
//   {
//       query.name = req.query.name;
//   }
//   // if status is included in request, then add it to query object
//   if (req.query.rank)
//   {
//       query.rank = req.query.rank;
//   }

//   // Modify find() to accept query
//   Crypto.find(
//       query, // filter 
//       (err, cryptos) => { // callback
//           if (err) {
//               console.log(err);
//               res.status(500).json({ 'ErrorMessage': 'Server threw an exception' });
//           }
//           else {
//               res.status(200).json(cryptos);
//           }
//       })
//       // implement pagination
//       .sort({ name: 1 }) // to achieve a consistent result sort by name A to Z
//       .limit(pageSize) // set page size limit
//       .skip(skipSize); // 'jump' to the first element in page x
// });

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