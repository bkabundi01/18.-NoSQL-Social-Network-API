//require model and Schema from mongoose
const {Schema, model} = require('mongoose');

//the schema for the reactions 
const reactionSchema = new Schema(
    {
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method
            get: (timestamp) => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


//schema to create a new thought 
const thoughtSchema = new Schema(
    //the fields and their types 
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter to format timestamp
            get: (timestamp) => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    }
);

//virtual for thought
thoughtSchema.virtual('reactionCount').get(function() {
    return `${this.reactions.length} reactions!`;
});

//initialize 
const Thought = model("Thought", thoughtSchema);

//export
module.exports = Thought;