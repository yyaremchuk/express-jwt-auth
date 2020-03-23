import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserSchema } from '../models/user.model';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

const config: any = {
    secret: 'supersecret'
}

export class UserController {

    public create(req: Request, res: Response) {
        let newUser = new User(req.body);
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        newUser.password = hashedPassword;

        newUser.save((err, user) => {

            if (err) {
                res.send(err);
            }

            var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
    }

    public getUsers(req: Request, res: Response) {
        User.find({}, (err, user) => {

            if (err) {
                res.send(err);
            }

            res.json(user);
        });
    }

    public authenticate(req: Request, res: Response) {
        User.findOne({ email: req.body.email }, function (err, user) {

            if (err) {
                return res.status(500).send('Error on the server.');
            }

            if (!user) {
                return res.status(404).send('No user found.');
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }

            var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        });
    }

    public getUser(req: Request, res: Response) {
        let token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        }

        jwt.verify(token, config.secret, function(err, decoded) {

            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }

            User.findById(decoded.id, (err, user) => {

                if (err) {
                    res.send(err);
                }

                const temp = {
                    fullName: user.fullName,
                    email: user.email,
                    location: user.location,
                    skills: user.skills
                };

                res.json(temp);
            });
        });
    }

    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, user) => {

            if (err) {
                res.send(err);
            }

            res.json(user);
        });
    }

    public deleteUser(req: Request, res: Response) {
        User.remove({ _id: req.params.contactId }, (err, user) => {

            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted contact!'});
        });
    }
}
