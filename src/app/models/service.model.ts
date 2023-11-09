import { Collaborator } from "./collaborator.model";

export interface Service {
  service_id?: number,
  name?: string,
  description?: string,
  category?: string,
  serviceType?: string,
  collaborator: Collaborator
}
