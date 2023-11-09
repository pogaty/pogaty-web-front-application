import { Injectable } from '@angular/core';
import { Collaborator } from '../models/collaborator.model';
import { API_URLS } from './environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CollaboratorService {
  constructor(private http: HttpClient) {}

  async loadUserCollabs(collabName: string): Promise<Collaborator | null> {
    const res = await fetch(`${API_URLS.collaborators}/search/${collabName}`);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  async createCollaborator(collab: Collaborator): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fetch(`${API_URLS.collaborators}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collab)
      })
        .then((res) => {
          if (res.ok) {
            console.log("created collab")
            resolve()
          } else {
            reject("User duplicated on database!")
          }
        })
    });
  }

  getPicture(profilePath: string | undefined) {
    return `${API_URLS.clients}/image/${profilePath}`;
  }
}
