import Express, { NextFunction, Request, Response } from "express";
var router = Express.Router();
import * as userController from "../controllers/user.controller";
//import Role from '../_helpers/role';
//import authorize from '../_helpers/authorize';

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req: any, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/getallusers', userController.getAllUsers);
router.get('/getuser/:email', userController.getUser);
router.delete('/deleteUserById', userController.deleteUserById);
router.put('/updateRoles', checkToken, userController.updateRoles);
router.get('/getdrivers', userController.getDrivers);


// authorize(Role.admin),
module.exports = router;