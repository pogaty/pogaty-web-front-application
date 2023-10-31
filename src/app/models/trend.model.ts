import { Client } from "./client.model"
import { Idea } from "./idea.model"

export class Trend {
    trend_id?: number
    trend?: boolean
    idea?: Idea
    client?: Client
}