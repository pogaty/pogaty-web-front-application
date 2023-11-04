import { Injectable } from "@angular/core"
import { API_URLS } from "./environment"
import { Idea } from "../models/idea.model"

@Injectable({
    providedIn: 'root'
  })

export class ParticipantService {
    async getParticipantClient(idea_id: number, client_id: number) {
        const res = await fetch(`${API_URLS.participants}/on_idea/${idea_id}/by/${client_id}`)
        return res.json()
    }

    async getIdeasByClient(client_username: string): Promise<Idea[]> {
        const res = await fetch(`${API_URLS.participants}/idea_by/${client_username}`)
        return res.json()
    }

    async addParticipant(idea_id: number, client_id: number) {
        await fetch(`${API_URLS.participants}/on_idea/${idea_id}/by/${client_id}`, 
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({role: "member"})
        }).then(res => {
        if (res.ok) {
            console.log("add participant successfully.")
        } else {
            console.log("failed to update resource.")
        }
        })
    }

    async removeParticipant(idea_id: number, client_id: number) {
        await fetch(`${API_URLS.participants}/on_idea/${idea_id}/by/${client_id}`, 
        {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
        }).then(res => {
        if (res.ok) {
            console.log("delete participant successfully.")
        } else {
            console.log("failed to update resource.")
        }
        })
    }

}