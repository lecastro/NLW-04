import { Router } from 'express';
import { UserController } from './controller/UserController';
import { SurveysController } from './controller/SurveysController';
import { SendmailController } from './controller/SendMailController';

const router = Router();

const userControler = new UserController();
const surveysController = new SurveysController();
const sendmailController = new SendmailController();

router.post("/users", userControler.create);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

router.post("/sendEmail", sendmailController.execute);

export { router };