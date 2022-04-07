import { Component, OnInit ,ViewChild} from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';
import { BankService } from '../data/services/bank/bank.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {
  displayedColumns: string[] = ['name','email','bankAccountNo','bankAccountBalance','state', 'city','postcode','actions'];
  customerList = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private bankService: BankService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }
  getCustomerList(){
    this.bankService.getCustomerList().subscribe(
      (data:any) => {
        if(data){
          this.customerList = new MatTableDataSource(data);
          this.customerList.paginator = this.paginator;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customerList.filter = filterValue.trim().toLowerCase();
    this.customerList.paginator = this.paginator;
  }

  updateCustomer(id:any){
    this.router.navigateByUrl("/app/refresh", { skipLocationChange: true }).then(() => {
      this.router.navigate(["/create",id]);
    })
  }

}
