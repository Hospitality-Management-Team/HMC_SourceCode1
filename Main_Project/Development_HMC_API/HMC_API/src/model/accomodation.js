import mongoose from 'mongoose';
import Review from './review';
let Schema = mongoose.Schema;

let AccomodationSchema = new Schema({
  ownerfirstname: {
    type: String,
    required: true
  },
  ownerlastname: {
    type: String,
    required: true
  },
  accomodationtype: {
    type: String,
    required: true
  },
  avgcost: Number,
  geometry: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  mailaddress: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  propertytype: String,
  streetname: String,
  apartmentno: Number,
  zipcode: Number,
  imageurllocation1: String,
  imageurllocation2: String,
  imageurllocation3: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

module.exports = mongoose.model('Accomodation', AccomodationSchema);
