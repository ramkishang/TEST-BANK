import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute,Router } from '@angular/router';
import { BankService } from '../data/services/bank/bank.service';
import { TokenService } from 'src/app/data/services/token/token.service';


@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {
  id:string = "";
  submitted:boolean = false;
  customerList:any = [];
  currentUser:any;
  customerDetails:any = [];
  trasansactionForm  = new FormGroup({
    recipient: new FormControl('', [Validators.required]),
    sender: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });
  constructor(
    private bankService: BankService,
    private tokenStorageService: TokenService,
    private router: Router,
  ) { 
    this.currentUser = this.tokenStorageService.getUser();
    this.getUserDetails(this.currentUser?.id);
  }

  ngOnInit(): void {
    this.getCustomerList();
  }
  sendMoney(){
    if(this.trasansactionForm.valid){
      this.submitted = true;
      this.bankService.sendMoney(this.trasansactionForm.value).subscribe(
        (data:any) => {
        if(data){
          alert("Money Sent successfully");
          this.router.navigateByUrl("/app/refresh", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/send-money']);
          });
        }else{
          alert("Server error");
        }
      })
    }
  }
  getCustomerList(){
    this.bankService.getCustomerList().subscribe(
      (data:any) => {
        if(data){
          this.customerList = data;
        }
      });
  }
  getUserDetails(id:any){
    this.bankService.getCustomerDetails(id).subscribe(
      (data:any) => {
        this.customerDetails = data;
        this.trasansactionForm.controls['sender'].setValue(this.customerDetails?.bankAccountNo);
    })
  }
  availBalance(event:any){
    let sendAmount = event.target.value;
    let availBalance = this.customerDetails.bankAccountBalance;
    if(sendAmount > availBalance){
      this.trasansactionForm.controls['amount'].setValue(0);
      alert("You cannot exceed send amount than the available balance");
    }
  }
}
