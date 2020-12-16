import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged = false;

  constructor(private service: GlobalService) { }

  ngOnInit(): void {
    this.service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    )
    this.service.checkLogStatus();
  }

}
