
const IdentityProvider = require('./controllers/identity.provider');
const IamProvider = require('./controllers/iam.provider');
const AuthorizationPermission = require('../security/authorization/authorization.permission');

const   passport = require('passport'),
        jwt = require('jsonwebtoken'),
        uuidv4 = require('uuid-v4'),
        privateKey =  ('../private.pem'),
        iss = 'urn:smartirrigationsystem.me',
        aud = 'urn:*.smartirrigationsystem.me',
        config = require('../env.config');

const   Master = config.permissionLevels.Master,
        Member = config.permissionLevels.Member,
        Surfer = config.permissionLevels.Surfer,
        validityTime = config.jwtValidityTimeInSeconds;

exports.routesConfig = function (app) {
    app.post('/auth/signup',
        [
            passport.authenticate('signUp', { session: false }),
            async (req, res, next) => {
                res.location('/users/' + req.user._id);
                res.status(201).send(req.user);
            }
        ]
    );

    app.get('/users', [
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.minimumPermissionLevelRequired(Member),
        IdentityProvider.list
    ]);

    app.get('/users/:userId', [
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.getById
    ]);

    /**
     * In a PUT request, the enclosed entity is considered to be
     * a modified version of the resource stored on the origin server,
     * and the client is requesting that the stored version be replaced.
     * So all the attributes are to be updated!
     * Thus this is a privileged action done only by administrator
     */
    app.put('/users/:userId', [
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.minimumPermissionLevelRequired(Master),
        AuthorizationPermission.sameUserCantDoThisAction,
        IdentityProvider.putById
    ]);

    /**
     * PATCH specifies that the enclosed entity contains a set of instructions describing
     * how a resource currently residing on the origin server should be modified to produce a new version.
     * So, some attributes could or should remain unchanged.
     * In our case, a regular user cannot change permissionLevel!
     * Thus only same user or admin can patch without changing identity permission level.
     */
    app.patch('/users/:userId', [
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.patchById
    ]);
    app.delete('/users/:userId', [
        passport.authenticate('jwt', { session: false }),
        AuthorizationPermission.minimumPermissionLevelRequired(Master),
        AuthorizationPermission.sameUserCantDoThisAction,
        IdentityProvider.removeById
    ]);


    /*app.post('e/authoriz', async (req,res,next) => {
        //TODO add PKCE FLOW

    });*/

    
};