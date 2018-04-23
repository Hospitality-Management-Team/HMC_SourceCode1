import mongoose from 'mongoose';
import { Router } from 'express';
import Accomodation from '../model/accomodation';
import Booking from '../model/booking';
import Account from '../model/account';
import bodyParser from 'body-parser';
import passport from 'passport';


import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();
  var mongoose = require('mongoose');	
  // '/v1/booking' - GET all bookings
  api.get('/', authenticate, (req, res) => {
    Booking.find({}, (err, bookings) => {
      if (err) {
        res.send(err);
      }
      res.json(bookings);
    });
  });

  // '/v1/booking/:id' - GET a specific accomodation
  api.get('/:id', (req, res) => {
    Booking.findById(req.params.id, (err, booking) => {
      if (err) {
        res.send(err);
      }
      res.json(booking);
    });
  });

  // '/v1/booking/add' - POST - add a booking
  api.post('/add',authenticate,  (req, res) => {
    let newBooking = new Booking();
    newBooking.firstname = req.body.firstname;
    newBooking.lastname = req.body.lastname;
    newBooking.fromdate = req.body.fromdate;
    newBooking.tilldate = req.body.tilldate;
    newBooking.total = req.body.total;
    var userid = mongoose.Types.ObjectId(req.body.user);
	newBooking.user = userid;
    var propid = mongoose.Types.ObjectId(req.body.property);
    newBooking.property = propid;

    newBooking.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Booking  saved successfully' });
    });
  });

  // '/v1/booking/:id' - DELETE - remove a booking
  api.delete('/:id', (req, res) => {
    Booking.remove({
      _id: req.params.id
    }, (err, booking) => {
      if (err) {
        res.send(err);
      }
      res.json({message: "Booking Successfully Removed"});
    });
  });


  // get bookings for a specific user id
  // '/v1/booking/user/:id'
  api.get('/user/:id', (req, res) => {
    Booking.find({booking: req.params.user}, (err, bookings) => {
      if (err) {
        res.send(err);
      }
      res.json(bookings);
    });
  });

  return api;
}
