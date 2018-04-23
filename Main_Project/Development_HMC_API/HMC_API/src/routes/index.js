import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import accomodation from '../controller/accomodation';
import account from '../controller/account';
import booking from '../controller/booking';


let router = express();

// connect to db
initializeDb(db => {

  // internal middleware
  router.use(middleware({ config, db }));

  // api routes v1 (/v1)
  router.use('/accomodation', accomodation({ config, db }));
  router.use('/account', account({ config, db }));
  router.use('/booking', booking({ config, db }));
});

export default router;
