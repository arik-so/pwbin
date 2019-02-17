import express = require('express');
const router = express.Router();

import RouteController from '../controllers/RouteController';

/* GET users listing. */
router.get('/', RouteController.handlePromise(async () => {
  return 'respond with a resource';
}));

export default router;
