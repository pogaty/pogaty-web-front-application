import { Service } from './service.model';

export interface Collaborator {
  collab_id?: number;
  email?: string;
  password?: string;
  name?: string;
  service?: Service;
  fileImage?: string;
}
