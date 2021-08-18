import Express, { NextFunction, Request, Response } from "express";
var router = Express.Router();
import * as groupController from "../controllers/group.controller";

router.post('/register', groupController.register);
router.get('/getallgroups', groupController.getAllGroups);
router.get('/getgroup/:name', groupController.getGroup);
// router.get('/getgroupmembers/:name', groupController.getGroupMembers);

router.delete('/deleteGroupById', groupController.deleteGroupById);
// router.put('/updateGroupName', groupController.updateGroupName);
router.put('/updateMembers', groupController.updateMembers);

module.exports = router;