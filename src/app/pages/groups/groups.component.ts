import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: any;
  clients: any;

  constructor(private service: GlobalService) { }

  ngOnInit(): void {
     this.service.httpGetProfile();

    this.service.onHttpGetGroups.subscribe(
      (res: any) => {
        this.groups = res.groups;
        this.clients = res.accounts;
        console.log(res)

      }
    );
    //this.groups = this.service.onHttpGetGroups();

  }




}
