import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { UsersSurveysRepository } from "../repositories/UsersSurveysRepository";
import SendMailService from "../service/SendMailService";
import { resolve } from 'path';

class SendmailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const usersSurveysRepository = getCustomRepository(UsersSurveysRepository);

        const userAlreadyExists = await usersRepository.findOne({ email });

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "user does not exists"
            });
        }

        const survey = await surveysRepository.findOne({ id: survey_id });

        if (!survey) {
            return response.status(400).json({
                error: "surveys does not exists"
            });
        }

        const usersSurveys = usersSurveysRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        });

        await usersSurveysRepository.save(usersSurveys);

        const path = resolve(__dirname, "..", "views", "npsMail.hbs");

        const variables = {
            name: userAlreadyExists.name,
            title: survey.title,
            description: survey.description,
            path: path
        }
        await SendMailService.execute(email, survey.title, variables, path);

        return response.status(201).json(usersSurveys);
    }
}

export { SendmailController }

