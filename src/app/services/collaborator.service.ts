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
    console.log(collabName + 'from service');
    const res = await fetch(`${API_URLS.collaborators}/search/${collabName}`);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  createNewCollaborator(collaboratorData: any) {
    return this.http.post(API_URLS.collaborators, collaboratorData).subscribe(
      (response) => {
        // Handle success response here
        console.log('Collaborator created:', response);
        // You might want to add additional handling after successful registration
      },
      (error) => {
        // Handle error response here
        console.error('Error creating collaborator:', error);
        // You might want to add error handling for failed registration
      }
    );
  }
}
