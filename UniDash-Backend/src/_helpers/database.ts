import mongoose from "mongoose";
import config from "../config.json";

mongoose.connect(process.env.MONGODB_URI || config.connectionString,
    {useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Group: require('../models/group.model')
};