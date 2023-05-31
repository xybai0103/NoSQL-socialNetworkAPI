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
    },
    id: false,
  }
);

// Create a virtual property `formattedCreatedAt` that Use a getter method to format the timestamp on query
reactionSchema
  .virtual('formattedCreatedAt')
  .get(function () {
    const date = this.createdAt;
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}
      /${date.getDate().toString().padStart(2, '0')}
      /${date.getFullYear()}`;
    return formattedDate;
  });

module.exports = reactionSchema;
