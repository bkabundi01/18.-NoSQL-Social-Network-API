//require User and Thought models from the models folder
const {User, Thought} = require('../models');

//controller for thoughts...contains all of the data manipulation here

const thoughtController = {

    /**
     * points to /api/thoughts
     * getting all thoughts
     */
    gettingAllThoughts(req, res) {
        Thought.find({})
            //allows the nested documents to expand
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .then((thoughtData) => res.status(200).json(thoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json({message: 'Could not find thoughts'})
            });
    },

    /**
     * points to /api/thoughts/:id
     * getting a single thought by id parameter
     */
    getOneThoughtByID(req, res) {
        Thought.findOne({_id: req.params.id})
            .populate({
                path: 'reactions',
                select: "-__v"
            })
            .select("-__v")
            .then((thoughtData) => {
                if(!thoughtData) {
                    return res.status(404).json({message: "Sorry! No thoughts associated with this id"})
                }
                return res.status(200).json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    /**
     * creating a thought 
     * also pushes the thought's _id to user's thoughts field
     */
    createNewThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                //here is where it connects with User
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$push: {thoughts: thoughtData.id}},
                    {new: true}
                );
            })
            .then((userThoughtData) => {
                if (!userThoughtData) {
                    return res.status(404).json({message: "Created thought...No user associated with id"});
                }
                res.status(200).json({message: "Created thought"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    /**
     * updating a thought by the id
     */
    updatingThought(req ,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { runValidators: true, new: true }) //new: after update, see the updated object
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({message: "Could not update thought...No thought with that id"});
                }
                res.status(200).json({message: "Updated thought!"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    /**
     * deleting a thought by the ID
     */
    deletingThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({ message: "No thought with this id!" });
                  }

                //this is where the thought id from users thought fiels is deleted
                return User.findOneAndUpdate(
                    {thoughts: req.params.id},
                    {$pull: {thoughts: req.params.id}},
                    {new: true}
                );
            })
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({message: "Could not delete thought...No thought with that id"});
                }
                res.status(200).json({message: "Deleted thought!"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    
    //----------------------------------------------------------REACTIONS CRUD METHODS--------------------------------------------------

    /**
     * adding a reaction
     */
    addingReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true})
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({message: "Could not add reaction...No thought with that id"});
                }
                res.status(200).json({message: "Added a reaction!"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    /**
     * deleting a reaction
     */
    deletingReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions:{reactionId: req.params.reactionId}}},
            {new: true})
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json({message: "Could not delete reaction...No thought with that id"});
                }
                res.status(200).json({message: "Deleted a reaction!"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    }
};

//exporting 
module.exports = thoughtController;