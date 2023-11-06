import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-collab-service',
  templateUrl: './collab-service.component.html',
  styleUrls: ['./collab-service.component.css'],
})
export class CollabServiceComponent implements OnInit {
  data = localStorage.getItem('collabInfo');
  serviceData: Service | null;

  serviceName: string = '';
  serviceCategory: string | undefined = '';
  serviceType: string | undefined = '';
  serviceDescription: string | undefined = '';

  constructor(private serviceService: ServiceService) {
    this.serviceData = null;
  }
  ngOnInit(): void {
    if (this.data) {
      const userInfo = JSON.parse(this.data);
      const service_id = userInfo.username;

      this.serviceService.loadServiceByID(service_id).then((data) => {
        this.serviceData = data;
      });
      console.log(this.data + '1');
    }
  }

  createService(
    name: string,
    category: string | undefined,
    serviceType: string | undefined,
    description: string | undefined
  ) {
    if (this.serviceData) {
      // add the data of the serviceData
      this.serviceData.name = name;
      this.serviceData.category = category;
      this.serviceData.serviceType = serviceType;
      this.serviceData.description = description;

      // Call the create method
      this.serviceService.createService(this.serviceData);
      console.log(`create service`);
    }
    console.log(`method createService worked`);
    window.location.reload();
  }

  updateService(
    name: string,
    category: string | undefined,
    serviceType: string | undefined,
    description: string | undefined
  ) {
    if (this.serviceData) {
      // add the data of the serviceData
      this.serviceData.name = name;
      this.serviceData.category = category;
      this.serviceData.serviceType = serviceType;
      this.serviceData.description = description;

      // Call the create method

      console.log(`update service method complete`);
    }
    console.log(`method updateService worked`);
    window.location.reload();
  }

  deleteService() {}

  onClickAdd() {
    this.createService(
      this.serviceName,
      this.serviceCategory,
      this.serviceType,
      this.serviceDescription
    );
  }

  onClickEdit() {}

  onClickDelete() {}
}
