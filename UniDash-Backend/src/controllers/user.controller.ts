import * as userService from "../services/user.service";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { LoginRequest, NewUser, UpdateRoles, User } from "../models/user.model";

export function authenticate(req: Request, res: Response, next: NextFunction) {
       userService.authenticate(req.body)
        .then(user => user ? res.json(user) :
            res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

export function register(req: Request, res: Response, next: NextFunction) {
   userService.addUser(req.body)
        .then(user => user ? res.json(user) :
        res.status(400).json({ message: 'Email is already taken' }))
        .catch(err => next(err));
}

export function getAllUsers(req: Request, res: Response, next: NextFunction) {
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

export function getUser(req: any, res: Response, next: NextFunction) {
    userService.getByEmail(req.query.email)
        .then(user => user ? res.json(user) : 
            res.status(400).json({ message: 'User does not exist'}))
        .catch(err => next(err));
}

export function getDrivers(req: any, res: Response, next: NextFunction) {
    userService.getDrivers()
        .then((drivers: User[]) => drivers ? res.json(drivers) : 
            res.status(400).json({ message: 'User does not exist'}))
        .catch(err => next(err));
}

export function updateRoles(req: any, res: Response, next: NextFunction) {
    userService.updateRoles(req.token, req.body)
        .then(result => result ? res.json({message: result}) : 
            res.status(400).json({ message: 'Error: Failure to update status'}))
        .catch(err => next(err));
}

export function deleteUserById(req: Request, res: Response, next: NextFunction) {
    userService.deleteUserById(req.body.id)
        .then((result: boolean) => {
            console.log(result)
            res.json({ message: 'Success: User Deleted' }) 
            
            // success ? res.json({ message: 'Success: User Deleted' })
            // : res.status(400).json({ message: 'User does not exist'})
        })
        .catch(err => next(err));
}