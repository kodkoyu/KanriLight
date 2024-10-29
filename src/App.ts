import Express, { Application, Request, Response, Router } from "express";
import BodyParser from 'body-parser';

const App: Application = Express();

App.use(BodyParser.json());
App.use("/api/Status", (req: Request, res: Response) => { res.send("<h1>I working! Ok?</h1>") });

export { App };