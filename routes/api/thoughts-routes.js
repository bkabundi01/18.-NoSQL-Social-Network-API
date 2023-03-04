//require Router() from express and all the methods for CRUD from thought controller
const router = require('express').Router();
const {

} = require('../../controllers/thought-Controller');


/**
 * getting all thoughts/creating a new thought
 * url here is localhost:3001/api/thoughts
 */
router.route('/').get().post();

/**
 * getting/updating/deleting by ID
 * url here is localhost:3001/api/thoughts:id
 */
router.route('/:id').get().put().delete();

/**
 * create a reaction/ delete a reaction
 * url here is localhost:3001/api/thoughts/:thoughtId/reactions
 */
router.route('/:thoughtId/reactions').post().delete();

module.exports = router;