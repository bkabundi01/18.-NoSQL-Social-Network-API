//require Router() from express
const router = require('express').Router();
//require all of the methods for CRUD from the users controller
const {

} = require('../../controllers/user-Controller');

/**
 *  getting all users, or creating a new user
 * url here is localhost:3001/api/users
 */
router.route('/').get().post;

/**
 * getting, updating, and deleting a user by _id
 */
router.route('/:id').get().put().delete();

/**
 * adding a new friend to a user's friend list, or removing them from friend list
 * url here is localhost:3001/api/users/:userId/friends/:friendID
 */
router.route('/:userId/friends/:friendID').post().delete();

module.exports = router;