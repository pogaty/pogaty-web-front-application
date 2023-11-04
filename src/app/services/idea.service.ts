import { Injectable } from "@angular/core";
import { API_URLS } from "./environment";
import { Idea } from "../models/idea.model";

@Injectable({
    providedIn: 'root'
  })

export class IdeaService {

    async getIdeaById(idea_id: number) {
        const res = await fetch(`${API_URLS.ideas}/${idea_id}`)
        return res.json()
    }

    async getIdeaParticipator(idea_id: number, client_id: number) {
        const res = await fetch(`${API_URLS.ideas}/participator/${idea_id}/except/${client_id}`)
        return res.json()
    }

        async createIdea(problem_id: number, client_id: number, idea: any) {
            await fetch(`${API_URLS.problems}/idea/${problem_id}/by/${client_id}`, 
            {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idea)
            }).then(res => {
            if (res.ok) {
                console.log("create idea successfully.")
            } else {
                console.log("failed to update resource.")
            }
            })
        }

        async updateIdea(idea_id: number, idea: any): Promise<Idea> {
            return new Promise(async (resolve, reject) => {
                const res = await fetch(`${API_URLS.ideas}/${idea_id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(idea)
                })

                if (res.ok) {
                    const data = res.json()
                    resolve(data)
                } else {
                    reject(new Error('Request failed'))
                }
            })
        }

        async deleteIdea(idea_id: number) {
            await fetch(`${API_URLS.ideas}/${idea_id}`, 
            {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
            }).then(res => {
            if (res.ok) {
                console.log("deleted idea successfully.")
            } else {
                console.log("failed to update resource.")
            }
            })
        }


}