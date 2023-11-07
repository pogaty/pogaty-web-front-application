import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { API_URLS } from './environment';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  async loadUsers(username: string): Promise<Client | undefined>  {
    const res = await fetch(`${API_URLS.clients}/${username}`)
    if (res.ok) {
      return res.json()
    } 
    return undefined
  }

  updateUser(client_id: number, client: Client | null) {
    fetch(`${API_URLS.clients}/${client_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client), // Send the client data as the request body
    })
      .then((res) => {
        if (res.ok) {
          console.log('Update successful.');
        } else {
          console.log('Failed to update resource.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getPicture(profilePath: string | undefined) {
    return `${API_URLS.clients}/image/${profilePath}`;
  }

  updateClientImage(clientId: number, imageFile: File) {
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.put(`${API_URLS.clients}/${clientId}/image`, formData);
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