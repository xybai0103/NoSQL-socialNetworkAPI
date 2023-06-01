const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.createdAt; // Remove the original 'createdAt' property from the result
        return ret;
      },
    },
    id: false,
  }
);

// Create a virtual property `formattedCreatedAt` that Use a getter method to format the timestamp on query
reactionSchema
  .virtual('formattedCreatedAt')
  .get(function () {
    const date = new Date(this.createdAt);
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
  });

module.exports = reactionSchema;
