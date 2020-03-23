import * as express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from "./routes/user.routes";
import * as mongoose from "mongoose";

class App {

    public app: express.Application;
    public routePrv: UserRoutes = new UserRoutes();
    public mongoUrl: string = 'mongodb://mongo:27017/CRMdb';

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*")
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
          next()
        });
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl)
            .then(() => {
                console.log('MongoDB is connected')
            })
            .catch(err => {
                console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
                // setTimeout(this.mongoSetup(), 10000)
            });
    }

}

export default new App().app;
