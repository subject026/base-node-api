import generateControllers from "../../util/generateControllers";
import { User } from "./user.model";

export const { createOne, getAll } = generateControllers(User);
