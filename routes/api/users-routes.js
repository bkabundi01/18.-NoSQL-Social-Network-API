//require Router() from express
const router = require('express').Router();
//require all of the methods for CRUD from the users controller
const {
    gettingAllUsers,
    getOneUserByID,
    createNewUser,
    updatingUser,
    deletingUser,
    addingFriend,
    deletingFriend
} = require('../../controllers/user-Controller');

/**
 *  getting all users, or creating a new user
 * url here is localhost:3001/api/users
 */
router.route('/').get(gettingAllUsers).post(createNewUser);

/**
 * getting, updating, and deleting a user by _id
 * url here is localhost:3001/api/users/:id
 */
router.route('/:id').get(getOneUserByID).put(updatingUser).delete(deletingUser);

/**
 * adding a new friend to a user's friend list, or removing them from friend list
 * url here is localhost:3001/api/users/:userId/friends/:friendID
 */
router.route('/:userId/friends/:friendID').post(addingFriend).delete(deletingFriend);

module.exports = router;