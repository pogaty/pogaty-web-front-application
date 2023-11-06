import { Service } from './service.model';

export interface Collaborator {
  collaborator_id: number,
  email: string,
  password: string,
  name: string,
  service?: Service,
}
