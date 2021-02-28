import { Entity, EntityRepository, Repository } from "typeorm";
import { UsersSurveys } from "../models/UsersSurveys";

@EntityRepository(UsersSurveys)
class UsersSurveysRepository extends Repository<UsersSurveys>{

}
export { UsersSurveysRepository }