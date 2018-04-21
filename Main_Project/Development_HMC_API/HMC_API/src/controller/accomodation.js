import mongoose from 'mongoose';
import { Router } from 'express';
import Accomodation from '../model/accomodation';
import Review from '../model/review';
import bodyParser from 'body-parser';
import passport from 'passport';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // '/v1/accomodation' - GET all accomodations
  api.get('/', authenticate, (req, res) => {
    Accomodation.find({}, (err, accomodations) => {
      if (err) {
        res.send(err);
      }
      res.json(accomodations);
    });
  });

  // '/v1/accomodation/:id' - GET a specific accomodation
  api.get('/:id', (req, res) => {
    Accomodation.findById(req.params.id, (err, accomodation) => {
      if (err) {
        res.send(err);
      }
      res.json(accomodation);
    });
  });

  // '/v1/accomodation/add' - POST - add a accomodation
  api.post('/add',authenticate,  (req, res) => {
    let newAccomodation = new Accomodation();
    newAccomodation.ownerfirstname = req.body.ownerfirstname;
    newAccomodation.ownerlastname = req.body.ownerlastname;
    newAccomodation.accomodationtype = req.body.accomodationtype;
    newAccomodation.avgcost = req.body.avgcost;
    newAccomodation.geometry.coordinates = req.body.geometry.coordinates;
    newAccomodation.mailaddress = req.body.mailaddress;
    newAccomodation.phonenumber = req.body.phonenumber;
    newAccomodation.propertytype = req.body.propertytype;
    newAccomodation.no_of_rooms = req.body.no_of_rooms;
    newAccomodation.streetname = req.body.streetname;
    newAccomodation.apartmentno = req.body.apartmentno;
    newAccomodation.zipcode = req.body.zipcode;
    newAccomodation.imageurllocation1 = req.body.imageurllocation1;
    newAccomodation.imageurllocation2 = req.body.imageurllocation2;
    newAccomodation.imageurllocation3 = req.body.imageurllocation3;

    newAccomodation.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Accomodation  saved successfully' });
    });
  });

  // '/v1/accomodation/:id' - DELETE - remove a accomodation
  api.delete('/:id', (req, res) => {
    Accomodation.remove({
      _id: req.params.id
    }, (err, accomodation) => {
      if (err) {
        res.send(err);
      }
      Review.remove({
        accomodation: req.params.id
      }, (err, review) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Accomodation  and Reviews Successfully Removed"});
      });
    });
  });

  // '/v1/accomodation/:id' - PUT - update an existing record
  api.put('/:id', (req, res) => {
    Accomodation.findById(req.params.id, (err, accomodation) => {
      if (err) {
        res.send(err);
      }
      accomodation.name = req.body.name;
      accomodation.accomodationtype = req.body.accomodationtype;
      accomodation.avgcost = req.body.avgcost;
      accomodation.geometry.coordinates = req.body.geometry.coordinates;
      accomodation.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Accomodation  info updated' });
      });
    });
  });

  // add a review by a specific accomodation id
  // '/v1/accomodation/reviews/add/:id'
  api.post('/reviews/add/:id', (req, res) => {
    Accomodation.findById(req.params.id, (err, accomodation) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.accomodation = accomodation._id;
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        accomodation.reviews.push(newReview);
        accomodation.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Accomodation  review saved' });
        });
      });
    });
  });

  // get reviews for a specific accomodation id
  // '/v1/accomodation/reviews/:id'
  api.get('/reviews/:id', (req, res) => {
    Review.find({accomodation: req.params.id}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
}
