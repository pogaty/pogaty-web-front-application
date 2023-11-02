import { Injectable } from "@angular/core";
import { Collaborator } from "../models/collaborator.model";
import { API_URLS } from "./environment";

@Injectable({
    providedIn: 'root'
  })

export class CollaboratorService {
    constructor() { }

    async loadUsers(name: string): Promise<Collaborator| null> {
        const res = await fetch(`${API_URLS.collaborators}/${name}`)
        if (res.ok) {
            return res.json()
        } 
        return null
    }
}