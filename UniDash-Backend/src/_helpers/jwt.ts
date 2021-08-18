import expressJwt, { secretType } from "express-jwt";
import { getByEmail } from "../services/user.service";
import * as config from "../config.json";

// declare type for express jwt to avoid error. May not be the best way...
const expJwt: any = expressJwt;

module.exports = jwt;

//expressJwt(...) returns a function that takes three paramaters req, res and next. Thus, this will register as middleware.
function jwt() {
    const secret: secretType = config.secret;
        return new expJwt({ secret, isRevoked: Boolean }).unless({
            path: [
                // public routes that don't require authentication
                '/',
                '/user/register',
                '/user/authenticate'
            ]
        });}


async function isRevoked(req: Request, payload: any, done: Function) {
   // console.log("isRevoked():", req.body, payload);

   /** changed to get by email, there was no getByUsername function in user.service... */
    const user = await getByEmail(payload.sub);

   // console.log("user in JWT",user);
    // revoke token if user no longer exists
    if (!user) {

        return done(null, true);
    }

    // done (Function) - A function with signature function(err, secret) to be invoked when the secret is retrieved.
    done();
};