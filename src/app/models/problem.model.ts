import { Client } from "./client.model";
import { Idea } from "./idea.model";

export interface Problem {
    problem_id: number,
    topic?: string,
    description?: string,
    rating?: string,
    idea_visible?: boolean,
    date?: string,
    client?: Client,
    ideas?: Idea[]
}