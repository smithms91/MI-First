const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: Object,
    required: true
  },
  hostEmail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Number
  },
  restrictedAge: {
    type: Boolean,
  }
},
  { timestamps: true, strict: true },
);

let Event;

try {
  Event = mongoose.model('Events', EventSchema);
} catch {
  Event = mongoose.models['Events'];
}

module.exports = Event