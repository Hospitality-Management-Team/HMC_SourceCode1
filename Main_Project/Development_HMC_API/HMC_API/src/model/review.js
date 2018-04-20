import mongoose from 'mongoose';
import Accomodation from './accomodation';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: String,
  text: String,
  accomodation: {type: Schema.Types.ObjectId, ref: 'Accomodation'}
});

module.exports = mongoose.model('Review', ReviewSchema);
