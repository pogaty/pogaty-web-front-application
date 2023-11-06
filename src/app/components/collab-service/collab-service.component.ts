import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ServiceService } from 'src/app/services/service.service';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { Collaborator } from 'src/app/models/collaborator.model';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-collab-service',
  templateUrl: './collab-service.component.html',
  styleUrls: ['./collab-service.component.css'],
})
export class CollabServiceComponent implements OnInit {
  data = localStorage.getItem('collabInfo');
  collabData: Collaborator | null;
  serviceData: Service | null;

  serviceName: string = '';
  serviceCategory: string | undefined = '';
  serviceType: string | undefined = '';
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
    }
  }

  createService(
    name: string,
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
      const serviceData: any = {
        name: name,
        category: category,
        serviceType: serviceType,
        description: description,
      };

      this.serviceService.createService(serviceData);
      console.log(`method1 createService worked`);
    }

    console.log(`method createService worked`);
  }

  updateService(
    name: string,
    category: string | undefined,
    serviceType: string | undefined,
    description: string | undefined
  ) {
    console.log(name);
    if (!name) {
      console.error('The service must be have name.');
    }
    if (this.data && this.collabService) {
      const collabInfo = JSON.parse(this.data);
      const service_id = collabInfo.id;

      // Initialize serviceData
      const serviceData: any = {
        name: name,
        category: category,
        serviceType: serviceType,
        description: description,
      };

      this.serviceService.updateService(service_id, serviceData);
      console.log(`method1 createService worked`);
    }
    console.log(`method createService worked`);
    window.location.reload();
  }

  deleteService() {
    if (this.data) {
      const collabInfo = JSON.parse(this.data);
      const service_id = collabInfo.id;

      this.serviceService.deleteServiceById(service_id);
    }

    console.log(`method deleteService worked`);
    window.location.reload();
  }

  onClickAdd() {
    this.createService(
      this.serviceName,
      this.serviceCategory,
      this.serviceType,
      this.serviceDescription
    );
  }

  onClickEdit() {
    this.updateService(
      this.serviceName,
      this.serviceCategory,
      this.serviceType,
      this.serviceDescription
    );
  }

  onClickDelete() {
    this.deleteService();
  }
}
