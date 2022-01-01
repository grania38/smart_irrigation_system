const express = require('express');
const app = express();
const dotenv =require('dotenv')
const bodyParser = require('body-parser');
const passport = require('passport')
app.use(passport.initialize())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const path =require("path");
require('dotenv').config();

//connect to database
require('./connection.pools')();
require('./identity/models/identity.schema');
require('./identity/controllers/iam.provider');
require('./Field/field.schema');

const SecurityRouter = require('./security/routes.config');
const IdentityRouter = require('./identity/routes.config');
const FieldRouter = require('./Field/routes.config')

//bind routes to the express application
SecurityRouter.routesConfig(app);
IdentityRouter.routesConfig(app);
FieldRouter.routesConfig(app)
module.exports = app;