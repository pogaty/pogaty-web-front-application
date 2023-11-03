import { Agreement } from "./agreement.model";
import { Participant } from "./participant.model";

export interface Idea {
    idea_id: number,
    ideaHeader?: string,
    key?: string,
    board?: string,
    agreement?: number,
    publicState?: boolean,
    date?: string,
    participants?: Participant[],
    agreements?: Agreement[]
}