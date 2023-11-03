import { Injectable } from "@angular/core"
import { API_URLS } from "./environment"

@Injectable({
    providedIn: 'root'
  })

export class ParticipantService {
    async getParticipantClient(idea_id: number, client_id: number) {
        const res = await fetch(`${API_URLS.participants}/on_idea/${idea_id}/by/${client_id}`)
        return res.json()
    }
}