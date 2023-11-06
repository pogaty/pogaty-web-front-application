import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Service } from '../models/service.model';
import { API_URLS } from './environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  async loadServices(): Promise<Service | null> {
    const res = await fetch(`${API_URLS.service}`);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  async loadServiceByID(service_id: number): Promise<Service | null> {
    const res = await fetch(`${API_URLS.service}/${service_id}`);
    if (res.ok) {
      return res.json();
    }
    return null;
  }

  createService(serviceData: any) {
    return this.http.post(`${API_URLS.service}`, serviceData).subscribe(
      (response) => {
        // Handle the successful response
        console.log('Data sent successfully:', response);
        // You can also reset the form or perform other actions here
      },
      (error) => {
        // Handle any errors
        console.error('Error:', error);
      }
    );
  }

  updateService(service_id: number | undefined, serviceData: any) {
    return this.http
      .patch(`${API_URLS.service}/${service_id}`, serviceData)
      .subscribe(
        (response) => {
          // Handle the successful response
          console.log('Data update successfully:', response);
          // You can also reset the form or perform other actions here
        },
        (error) => {
          // Handle any errors
          console.error('Error:', error);
        }
      );
  }

  deleteServiceById(service_id: number) {
    const url = `${API_URLS.service}/${service_id}`;
    return this.http.delete<void>(url).subscribe(
      (response) => {
        // Handle the successful response
        console.log('delete service successfully:', response);
        // You can also reset the form or perform other actions here
      },
      (error) => {
        // Handle any errors
        console.error('Error:', error);
      }
    );
  }
}
