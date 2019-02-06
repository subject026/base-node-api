import generateControllers from "../../modules/generateControllers";
import { User } from "./user.model";

export const { createOne, getAll } = generateControllers(User);
