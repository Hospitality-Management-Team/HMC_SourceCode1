import mongoose from 'mongoose';
import Account from './account';
import Accomodation from './accomodation';
let Schema = mongoose.Schema;

// Schema for accomodation model
let BookingSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  fromdate: {
    type: Date,
    required: true
  },
  tilldate: {
    type: Date,
    required: true
  },
  total: Number,
  user: [{type: Schema.Types.ObjectId, ref: 'Account'}],
  property: [{type: Schema.Types.ObjectId, ref: 'Accomodation'}]
});

module.exports = mongoose.model('Booking', BookingSchema);
