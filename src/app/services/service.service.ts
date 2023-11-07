import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Service } from '../models/service.model';
import { API_URLS } from './environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  async loadServiceByCollabId(collab_id: number) {
    const res = await fetch(`${API_URLS.collaborators}/${collab_id}/services`)
    return res.json()
  }

  async loadServicesByType(type: string): Promise<Service[]> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await fetch(`${API_URLS.service}/type/${type}`)
          if (res.ok) {
            const data = await res.json()
            resolve(data)
          } else {
            reject(new Error('Request failed'))
          }
        } catch (error) {
          reject(error)
        }
      }, 500)
    })
  }

  async loadServicesByTypeAndCategory(type: string, category: string): Promise<Service[]> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await fetch(`${API_URLS.service}/type/${type}/category/${category}`)
          if (res.ok) {
            const data = await res.json()
            resolve(data)
          } else {
            reject(new Error('Request failed'))
          }
        } catch (error) {
          reject(error)
        }
      }, 500)
    })
  }

  async createServices(collab_id: number, service: Service) {
    await fetch(`${API_URLS.service}/by/${collab_id}`, 
    {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(service)
    }).then(res => {
      if (res.ok) {
          console.log("create service successfully.")
      } else {
          console.log("failed to update resource.")
      }
    })
  }

  async updateService(service_id: number, service: Service) {
    await fetch(`${API_URLS.service}/${service_id}`, 
    {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(service)
    }).then(res => {
      if (res.ok) {
          console.log("update service successfully.")
      } else {
          console.log("failed to update resource.")
      }
    })
  }

  async deleteService(service_id: number) {
    await fetch(`${API_URLS.service}/${service_id}`, 
    {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.ok) {
          console.log("update service successfully.")
      } else {
          console.log("failed to update resource.")
      }
    })
  }

}
