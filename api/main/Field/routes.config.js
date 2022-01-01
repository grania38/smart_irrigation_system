const FieldProvider = require('./controller');
const IamProvider = require('../identity/controllers/iam.provider');
const AuthorizationPermission = require('../security/authorization/authorization.permission');

const   passport = require('passport'),
        config = require('../env.config');


exports.routesConfig = function (app) {
    app.post('/field/:userId/new',[
        passport.authenticate('jwt', { session: false }),
        FieldProvider.createField
    
    ]);

    app.delete('/users/:userId/delete/:fieldId',[
        passport.authenticate('jwt', { session: false } ),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        FieldProvider.removeById
    ]);
    app.get('/users/:userId/field/:fieldId/',[
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        FieldProvider.getById
    ]);

    app.post('/users/:userId/update/:fieldId/',[
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        FieldProvider.putById
    ]);

    app.get('/users/:userId/list/',[
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        FieldProvider.getList
    ]);
    

};
