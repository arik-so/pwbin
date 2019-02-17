import mongoose = require('mongoose');

/* const mongoosePromise = mongoose.connect('mongodb://localhost/curtain');
export default mongoosePromise; */

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/pwbin';
export default mongoose.createConnection(mongoUrl);