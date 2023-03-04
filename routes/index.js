//require the express Router() and api folder
const router = require('express').Router();
const apiRoutes = require('./api');

//this will add /api to the url; now, the url is localhost:3001/api here
router.use('/api', apiRoutes);

//default message if a wrong route is sent
router.use((req, res) => {
    return res.send("Oh No...WRONG ROUTE");
});

//export 
module.exports = router;