import { Injectable } from "@angular/core";
import { API_URLS } from "./environment";
import { Idea } from "../models/idea.model";

@Injectable({
    providedIn: 'root'
  })

export class IdeaService {
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
}