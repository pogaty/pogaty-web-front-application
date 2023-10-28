import { Client } from "./client.model";

export interface Participant {
    participant_id: number,
    role?: string,
    client?: Client
}