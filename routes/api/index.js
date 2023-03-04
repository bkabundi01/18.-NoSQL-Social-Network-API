//require the express Router() and all of the routes
const router = require('express').Router();
const thoughtRoutes = require('./thoughts-routes');
const userRoutes = require('./users-routes');

//directs to the User routes; url here is localhost:3001/api/users
router.use('/users', userRoutes);

//directs to the Thout routes; url here is localhost:3001/api/thoughts
router.use('/thoughts', thoughtRoutes);

//default if the route entered is wrong
router.use((req, res) => {
    return res.send("Oh No...WRONG ROUTE");
});

module.exports = router;