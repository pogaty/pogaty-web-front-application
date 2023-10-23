import { Problem } from "./problem.model";

export interface Client {
    client_id?: number,
    username?: string,
    password?: string,
    firstname?: string,
    lastname?: string,
    gender?: string,
    phoneNumber?: string,
    mail?: string,
    description?: string,
    rating?: number,
    problem?: Problem
}