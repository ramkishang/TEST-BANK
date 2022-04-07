import { Component, OnInit,ViewChild } from '@angular/core';
import { TokenService } from 'src/app/data/services/token/token.service';
import { BankService } from '../data/services/bank/bank.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.css']
})
export class MyTransactionsComponent implements OnInit {
  currentUser:any;
  displayedColumns: string[] = ['datetime','recipient','value','actions'];
  trasactionList = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tokenStorageService: TokenService,
    private bankService: BankService,
    private router: Router,
  ) { 
    this.currentUser = this.tokenStorageService.getUser();
    this.getUserTrasactionDetails(this.currentUser?.id);
  }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.trasactionList.filter = filterValue.trim().toLowerCase();
    this.trasactionList.paginator = this.paginator;
  }

  getUserTrasactionDetails(id:any){
    this.bankService.getCustomerTrasanctionList(id).subscribe(
      (data:any) => {
        if(data){
          this.trasactionList = new MatTableDataSource(data);
          this.trasactionList.paginator = this.paginator;
        }
      });
  }
  viewTransaction(id:any){
    this.router.navigateByUrl("/app/refresh", { skipLocationChange: true }).then(() => {
      this.router.navigate(["/transaction-details",id]);
    })
  }
}
