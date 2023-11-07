import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ServiceService } from 'src/app/services/service.service';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { Collaborator } from 'src/app/models/collaborator.model';
import { Service } from 'src/app/models/service.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collab-service',
  templateUrl: './collab-service.component.html',
  styleUrls: ['./collab-service.component.css'],
})
export class CollabServiceComponent implements OnInit {
  data = localStorage.getItem('collabInfo');
  services: Service[] = [];

  collabData: Collaborator | null;
  serviceData: Service | null;

  serviceID: number | undefined = 0;
  serviceName: string | undefined = '';
  serviceCategory: string | undefined = '';
  serviceType: string | undefined = 'business';
  serviceDescription: string | undefined = '';

  constructor(
    private serviceService: ServiceService,
    private collabService: CollaboratorService
  ) {
    this.serviceData = null;
    this.collabData = null;
  }

  ngOnInit(): void {
    if (this.data) {
      const userInfo = JSON.parse(this.data);
      const collab_name = userInfo.name;

      this.collabService.loadUserCollabs(collab_name).then((data) => {
        this.collabData = data;
      });

      this.renderService();
    }
  }

  renderService() {
    if (this.data)
      this.serviceService
        .loadServiceByCollabId(JSON.parse(this.data).collab_id)
        .then((data) => {
          this.services = data;
          console.log(this.services);
        });
  }

  cleardata() {
    this.serviceName = '';
    this.serviceType = '';
    this.serviceCategory = '';
    this.serviceDescription = '';
  }

  createService(
    name: string | undefined,
    category: string | undefined,
    serviceType: string | undefined,
    description: string | undefined
  ) {
    console.log(name);
    if (!name) {
      console.error('The service must be have name.');
      return;
    }
    if (this.data && this.collabService) {
      // Initialize serviceData
      const serviceData: Service = {
        name: name,
        category: category || 'any',
        serviceType: serviceType,
        description: description,
      };

      this.serviceService.createServices(
        JSON.parse(this.data).collab_id,
        serviceData
      ).then(() => {
        this.services.push(serviceData);
        this.renderService()
      })
    }

    this.cleardata();
  }

  updateService(
    name: string | undefined,
    category: string | undefined,
    serviceType: string | undefined,
    description: string | undefined,
    service_id: number
  ) {
    console.log(name);
    if (!name) {
      console.error('The service must be have name.');
    }
    if (this.data && this.collabService) {
      // Initialize serviceData
      const serviceData: Service = {
        name: name,
        category: category || 'any',
        serviceType: serviceType,
        description: description,
      };

      this.serviceService.updateService(service_id, serviceData).then(() => {
        this.renderService();
      });
    }
    this.cleardata();
    window.location.reload();
  }

  deleteService(service: Service) {
    if (this.data && service.service_id) {
      this.serviceService.deleteService(service.service_id).then(() => {
        const index = this.services.indexOf(service);
        if (index !== -1) {
          this.services.splice(index, 1);
        }
        this.renderService();
      });
    }
  }

  onClickAdd() {
    this.createService(
      this.serviceName,
      this.serviceCategory,
      this.serviceType,
      this.serviceDescription
    );
  }

  onClickEdit(service_id: number | undefined) {
    console.log('Editing service with ID:', service_id);
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].service_id == service_id) {
        this.serviceID = service_id;
        this.serviceName = this.services[i].name;
        this.serviceType = this.services[i].serviceType;
        this.serviceCategory = this.services[i].category;
        this.serviceDescription = this.services[i].description;
      }
    }
  }

  onClickSave(service_id: number | undefined) {
    console.log('Saving service with ID:', service_id);
    if (service_id)
      this.updateService(
        this.serviceName,
        this.serviceCategory,
        this.serviceType,
        this.serviceDescription,
        service_id
      );
  }

  onClickDelete(service: Service | undefined) {
    if (service) this.deleteService(service);
  }
}
