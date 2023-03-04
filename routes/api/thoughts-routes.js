//require Router() from express and all the methods for CRUD from thought controller
const router = require('express').Router();
const {
    gettingAllThoughts, 
    getOneThoughtByID, 
    createNewThought, 
    updatingThought, 
    deletingThought,
    addingReaction,
    deletingReaction
} = require('../../controllers/thought-Controller');
 

/**
 * getting all thoughts/creating a new thought
 * url here is localhost:3001/api/thoughts
 */
router.route('/').get(gettingAllThoughts).post(createNewThought);

/**
 * getting/updating/deleting by ID
 * url here is localhost:3001/api/thoughts:id
 */
router.route('/:id').get(getOneThoughtByID).put(updatingThought).delete(deletingThought);

/**
 * create a reaction/ delete a reaction
 * url here is localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId 
 */
router.route('/:thoughtId/reactions').post(addingReaction).delete(deletingReaction);

module.exports = router;