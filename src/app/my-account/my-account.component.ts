import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/data/services/token/token.service';
import { environment } from 'src/app/environments/environment';
import { Router } from '@angular/router';
import { BankService } from '../data/services/bank/bank.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  currentUser:any;
  customerDetails:any = [];
  constructor(
    private tokenStorageService: TokenService,
    private bankService: BankService,
    private router: Router,
  ) { 
    this.currentUser = this.tokenStorageService.getUser();
    this.getUserDetails(this.currentUser?.id);
  }

  ngOnInit(): void {
  }
  
  getUserDetails(id:any){
    this.bankService.getCustomerDetails(id).subscribe(
      (data:any) => {
        this.customerDetails = data;
    })
  }

  updateProfile(){
    this.router.navigateByUrl("/app/refresh", { skipLocationChange: true }).then(() => {
      this.router.navigate(["/create",this.currentUser?.id]);
    })
  }
}
