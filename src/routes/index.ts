import express = require('express');

const router = express.Router();

import RouteController from '../controllers/RouteController';
import PasswordController from '../controllers/PasswordController';

/* GET home page. */
router.get('/', RouteController.handlePromise(async (req, res) => {
    res.send('index');
}));

// PASSWORD
router.post('/pw/store', RouteController.handlePromise(PasswordController.store.bind(PasswordController)));
router.get('/:address', PasswordController.retrieve.bind(PasswordController));

export default router;
