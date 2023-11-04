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

  async loadUsers(username: string): Promise<Client | null> {
    const res = await fetch(`${API_URLS.clients}/${username}`);
    if (res.ok) {
      return res.json();
    }
    return null;
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
}
