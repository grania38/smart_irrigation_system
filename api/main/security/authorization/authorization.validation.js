const jwt = require('jsonwebtoken'),
    refreshSecret = require('../../env.config').actualRefreshSecret,
    crypto = require('crypto');
    fs = require('fs');

const config = require('../../env.config');
const cert = fs.readFileSync(process.env.CERT_FILE || config['jwt-key']);

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            console.log(authorization)
            if (authorization[0] !== 'Bearer') {
                
                return res.status(401).send();
            } else {
                
                var aud = 'urn:'+(req.get('origin')?req.get('origin'):"smartirrigationsystem.me");
                try{
                    req.jwt = jwt.verify(authorization[1], cert, {issuer:"urn:smartirrigationsystem.me",audience:aud,algorithms: ['RS512']});
                }catch(err){
                     console.log(err)
                }
                
                return next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(403).send();
    }
};

exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let salt = req.body.refresh_token.split("$")[0]
    let refresh_token = req.body.refresh_token.split("$")[1]

    refresh_token = Buffer.from(refresh_token, 'base64').toString();
    let hash = crypto.createHmac('sha512', salt).update(req.jwt.userId + refreshSecret + req.jwt.jti).digest("base64");

    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};