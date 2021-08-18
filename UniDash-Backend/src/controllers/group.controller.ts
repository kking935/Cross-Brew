import * as groupService from "../services/group.service";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { Group } from "../models/group.model";

export function register(req: Request, res: Response, next: NextFunction) {
   groupService.addGroup(req.body)
        .then((group: any) => group ? res.json(group) :
        res.status(400).json({ message: 'Name is already taken' }))
        .catch((err: any) => next(err));
}

export function getAllGroups(req: Request, res: Response, next: NextFunction) {
    groupService.getAllGroups()
        .then((groups: Group[]) => res.json(groups))
        .catch((err: any) => next(err));
}

export function getGroup(req: any, res: Response, next: NextFunction) {
    groupService.getByName(req.query.name)
        .then((group: any) => group ? res.json(group) : 
            res.status(400).json({ message: 'Group does not exist'}))
        .catch((err: any) => next(err));
}

// export function getGroupMembers(req: any, res: Response, next: NextFunction) {
//     groupService.getGroupMembers(req.query.name)
//         .then((group: any) => group ? res.json(group) : 
//             res.status(400).json({ message: 'Group does not exist'}))
//         .catch((err: any) => next(err));
// }

export function updateMembers(req: any, res: Response, next: NextFunction) {
    groupService.updateMembers(req.body.name, req.body.members)
        .then((result: any) => result ? res.json({message: result}) : 
            res.status(400).json({ message: 'Error: Failure to update status'}))
        .catch(err => next(err));
}
export function deleteGroupById(req: Request, res: Response, next: NextFunction) {
    groupService.deleteGroupById(req.body.id)
        .then((success: boolean) => success ? res.json({ message: 'Success: Group Deleted' }) : 
            res.status(400).json({ message: 'Group does not exist'}))
        .catch((err: any) => next(err));
}

// export function updateGroupName(req: any, res: Response, next: NextFunction) {
//     userService.updateStatus(req.token, req.body.status)
//         .then(result => result ? res.json({message: result}) : 
//             res.status(400).json({ message: 'Error: Failure to update status'}))
//         .catch(err => next(err));
// }
