//require User and Thought models from the models folder
const {User, Thought} = require('../models');

//controller for thoughts...contains all of the data manipulation here

const userController = {

    /**
     * points to /api/users
     * getting all users
     */
    gettingAllUsers(req, res) {
        User.find({})
            //allows the nested documents to expand
            .populate({
                path: "friends",
                select: "-__v"
            })
            .select("-__v")
            .then((userData) => res.status(200).json(userData))
            .catch((err) => {
                console.log(err);
                res.status(400).json({message: 'Could not find users'})
            });
    },

    /**
     * points to /api/users/:id
     * getting a single user by id parameter
     */
    getOneUserByID(req, res) {
        User.findOne({_id: req.params.id})
            .populate({
                path: 'friends',
                select: "-__v"
            })
            .populate({
                path: 'thoughts',
                select: "-__v"
            })
            .select("-__v")
            .then((userData) => {
                if(!userData) {
                    return res.status(404).json({message: "Sorry! No user associated with this id"})
                }
                return res.status(200).json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    /**
     * creating a user
     * points to /api/users
     */
    createNewUser(req, res) {
        User.create(req.body)
            .then((userThoughtData) => {
                if (!userThoughtData) {
                    return res.status(404).json({message: "Created User...No user associated with id"});
                }
                res.status(200).json({message: "Created User...Found User"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },


    /**
     * updating a user by the id
     * /api/users/:id
     */
    updatingUser(req ,res) {
        User.findOneAndUpdate(
            { _id: req.params.videoId },
            req.body,
            { runValidators: true, new: true }) //new: after update, see the updated object
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({message: "Could not update thought...No thought with that id"});
                }
                res.status(200).json({message: "Updated thought!...Found User"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    /**
     * deleting a user by the ID
     * /api/users/:id
     */
    deletingUser(req, res) {
        Thought.deleteMany({userId: req.params.id})
            .then(() => {
             User.findOneAndDelete(
                    {userId: req.params.id},                  
                );
            })
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({message: "Could not delete user...No user with that id"});
                }
                res.status(200).json({message: "Deleted user!...Found User"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    
    //----------------------------------------------------------FRIENDS CRUD METHODS--------------------------------------------------

    /**
     * adding a friend
     */
    addingFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.params.friendId}},
            {new: true})
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({message: "Could not add reaction...No user with that id"});
                }
                res.status(200).json({message: "Added a friend!...Found User"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    /**
     * deleting a friend
     */
    deletingFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true})
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({message: "Could not delete friend...No user with that id"});
                }
                res.status(200).json({message: "Deleted a friend!...Found User"});
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    }
};

module.exports = userController;