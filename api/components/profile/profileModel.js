const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  company: {
    type: String,
  },
  bio: {
    type: String,
  },
  status: {
    type: String,
  },
  website: {
    type: String,
  },
  mobilenumber: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  location: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: false,
      },
      current: {
        type: Boolean,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: false,
      },
      current: {
        type: Boolean,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    githubusername: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
