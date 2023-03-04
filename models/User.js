//here, require the model and Schema from mongoose
const {Schema, model} = require('mongoose');

//this is the schema to create a user
const userSchema = new Schema(
    //the fields and their types here
    {
        username: {
            type: String,
            unique: true,
            required: "true",
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                //referencing the Thought model 
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                //self reference to User model
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    //allowing the virtual here
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//here, creating the virtual; retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount')
        //getter
          .get(function() {
            return `${this.friends.length} friends!`;
          });


//initialize the User model
const User = model("User", userSchema);

//export User
module.exports = User;