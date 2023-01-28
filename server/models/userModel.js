const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  {
    timestamps: true,
  }
);

userModel.methods.passwordMatches = function (paramPassword) {
  return bcryptjs.compare(paramPassword, this.password);
};

userModel.pre('save', async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcryptjs.genSalt(15);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model('User', userModel);

module.exports = User;
