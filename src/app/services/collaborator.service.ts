import { Injectable } from '@angular/core';
import { Collaborator } from '../models/collaborator.model';
import { API_URLS } from './environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CollaboratorService {
  constructor(private http: HttpClient) {}

  async loadUsers(name: string): Promise<Collaborator | null> {
    const res = await fetch(`${API_URLS.collaborators}/search/${name}`);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  createNewCollaborator(collaboratorData: any) {
    return this.http.post(API_URLS.collaborators, collaboratorData);
  }
}
