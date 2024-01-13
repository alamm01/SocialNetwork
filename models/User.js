const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/([a-zA-Z0-9])@([a-zA-Z0-9])\.(a-zA-Z)/,"Must be a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function (){
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
