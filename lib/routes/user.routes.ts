import {Request, Response} from "express";
import * as jwt from 'jsonwebtoken';

import { Config } from '../config';
import { ContactController } from '../controllers/crmController';
import { UserController } from '../controllers/user.controller';

// https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
// https://www.npmjs.com/package/jsonwebtoken

export class UserRoutes {
    public userController: UserController = new UserController();
    public contactController: ContactController = new ContactController();

    public routes(app): void {

        console.log('IN UPDTAED ROUTER CONFIG');

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            });

        app.route('/login')
            .post(this.userController.authenticate);

        app.route('/register')
            .post(this.userController.create);

        app.route('/profile')
            .get(this.userController.getUser);
            // .get((req: Request, res: Response) => {
            //     let token = req.headers['x-access-token'];
            //
            //     if (!token) {
            //         return res.status(401).send({ auth: false, message: 'No token provided.' });
            //     }
            //
            //     jwt.verify(token, Config.secret, function(err, decoded) {
            //
            //         if (err) {
            //             return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            //         }
            //
            //         res.status(200).send(decoded);
            //     });
            // });

        // Contact
        app.route('/contact')
            // GET endpoint
            .get(this.contactController.getContacts)
            // POST endpoint
            .post(this.contactController.addNewContact);

        // Contact detail
        app.route('/contact/:contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}
