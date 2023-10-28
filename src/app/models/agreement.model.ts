import { Client } from "./client.model";
import { Idea } from "./idea.model";

export class Agreement {
    agreement_id?: number
    agreed?: boolean
    idea?: Idea
    client?: Client
}