import { Injectable } from "@angular/core";
import { Client } from "../models/client.model";
import { API_URLS } from "./environment";

@Injectable({
    providedIn: 'root'
  })

export class ClientService {
    constructor() { }

    async loadUsers(username: string): Promise<Client| null> {
        const res = await fetch(`${API_URLS.clients}/${username}`)
        if (res.ok) {
            return res.json()
        } 
        return null
    }
}