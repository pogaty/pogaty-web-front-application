import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service.';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  clients: Client[] = []

  constructor(
    private clientService: ClientService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.clientService.loadRandomUsers().then((data) => {
      this.clients = data
    })
  }

  profileSample(username: string) {
    this.dataService.setProfileOpen({bool: true, username: username})
  }

  getImg (client: Client) {
    const id = client.client_id
    if (id) {
      return this.dataService.getClientById(id)
    }
    return 
  }

}
