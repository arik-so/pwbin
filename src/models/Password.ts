import mongoose = require('mongoose');
import connection from '../storage';
import {Document, Schema} from 'mongoose';
import {ObjectID} from 'bson';

export interface PasswordModel extends Document {
    _id: ObjectID,
    content: string,
    address: string,
    createdAt: Date,
    updatedAt: Date
}

const passwordSchema = new mongoose.Schema({
    content: {type: String, required: true},
    address: {type: String, required: true, unique: true, index: true}
}, {
    timestamps: true
});

const Password = connection.model<PasswordModel>('Password', passwordSchema);
export default Password;