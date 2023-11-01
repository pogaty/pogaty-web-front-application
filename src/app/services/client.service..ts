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

    async createClient(client: Client): Promise<void> {
        await fetch(`${API_URLS.clients}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(client)
        }).then(res => {
          if (res.ok) {
            console.log("created client.")
          } else {
            console.log("failed to update resource.")
          }
        })
      }
}