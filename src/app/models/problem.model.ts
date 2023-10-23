import { Client } from "./client.model";

export interface Problem {
    problem_id?: number,
    topic?: string,
    description?: string,
    rating?: string,
    date?: string,
    client?: Client
}