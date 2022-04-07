import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/data/services/token/token.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  userRole:any = 0;
  constructor(private tokenStorageService:TokenService,) { 
    this.userRole = this.tokenStorageService.getUserRole();
  }

  ngOnInit(): void {
  }

}
