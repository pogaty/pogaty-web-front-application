import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { API_URLS } from './environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {}

  async loadUsers(username: string): Promise<Client | null> {
    const res = await fetch(`${API_URLS.clients}/${username}`);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  updateUser(client_id: number) {
    fetch(`${API_URLS.clients}/${client_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        console.log('update successfully.');
      } else {
        console.log('failed to update resource.');
      }
    });
  }
}
