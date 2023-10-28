import { Injectable } from "@angular/core"
import { API_URLS } from "./environment"
import { Agreement } from "../models/agreement.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: 'root'
  })

export class AgreementService {
    constructor(
        private http: HttpClient,
    ) { }

    async loadAgreeReactions(idea_id: number): Promise<Agreement[]> {
        const res = await fetch(`${API_URLS.agreements}/on_idea/${idea_id}/agree`)
        if (res.ok) {
            return res.json()
        } 
        return []
    }

    async loadDisagreeReactions(idea_id: number): Promise<Agreement[]> {
        const res = await fetch(`${API_URLS.agreements}/on_idea/${idea_id}/disagree`)
        if (res.ok) {
            return res.json()
        } 
        return []
    }

    updateAgreed(idea_id: number, client_id: number, agreement: Agreement) {
        fetch(`${API_URLS.ideas}/${idea_id}/reaction_by/${client_id}`,
        {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(agreement),  
        }).then (res => {
            if (res.ok) {
                console.log("agreement updated.")
            } else {
                console.log("failed to update resource.")
            }
        })
    }
}