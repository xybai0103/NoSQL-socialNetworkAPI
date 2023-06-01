const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `formattedCreatedAt` that Use a getter method to format the timestamp on query
thoughtSchema
  .virtual('formattedCreatedAt')
  .get(function () {
    const date = this.createdAt;
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}
      /${date.getDate().toString().padStart(2, '0')}
      /${date.getFullYear()}`;
    return formattedDate;
  });

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
