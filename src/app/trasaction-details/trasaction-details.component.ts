import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/data/services/token/token.service';
import {ActivatedRoute,Router } from '@angular/router';
import { BankService } from '../data/services/bank/bank.service';

@Component({
  selector: 'app-trasaction-details',
  templateUrl: './trasaction-details.component.html',
  styleUrls: ['./trasaction-details.component.css']
})
export class TrasactionDetailsComponent implements OnInit {
  id:string = "";
  transactionDetails:any = [];
  constructor(
    private bankService: BankService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getTransactionDetails();
   }

  ngOnInit(): void {
  }
  getTransactionDetails(){
    this.bankService.getTransactionDetails(this.id).subscribe(
      (data:any) => {
        this.transactionDetails = data;
    });
  }
}
