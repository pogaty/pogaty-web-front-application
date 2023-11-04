import { Injectable } from "@angular/core";
import { Client } from "../models/client.model";
import { API_URLS } from "./environment";

@Injectable({
    providedIn: 'root'
  })

export class ClientService {
    constructor() { }

    async loadUsers(username: string): Promise<Client | undefined>  {
        const res = await fetch(`${API_URLS.clients}/${username}`)
        if (res.ok) {
            return res.json()
        } 

        return undefined
    }

    async loadRandomUsers(): Promise<Client[]> {
      const res = await fetch(`${API_URLS.clients}/rand`)
      return res.json()
    }

    async loadWithoutParticipantAndSelf(client_id: number, idea_id: number): Promise<Client[]> {
      const res = await fetch(`${API_URLS.clients}/without/${client_id}/on_idea/${idea_id}`)
      return res.json()
    }

    async createClient(client: Client): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        fetch(`${API_URLS.clients}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(client)
        })
          .then((res) => {
            if (res.ok) {
              console.log("created client.")
              resolve()
            } else {
              reject("User duplicated on database!")
            }
          })
      });
    }
}