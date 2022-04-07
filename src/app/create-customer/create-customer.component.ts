import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute,Router } from '@angular/router';
import { removeLeadingTrailSpaces } from '../core/helpers/whitespace.validator';
import { BankService } from '../data/services/bank/bank.service';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  id:string = "";
  isUpdate:boolean = false;
  submitted:boolean = false;
  accounts:any = [
    {value: 'current', type: 'Current Account'},
    {value: 'saving', type: 'Saving Account'},
  ];
  hide = true;
  customerCreateForm  = new FormGroup({
    name: new FormControl('', [Validators.required]),
    idNo: new FormControl('', [Validators.required]),
    bankAccountNo: new FormControl('', [Validators.required]),
    bankAccountBalance: new FormControl(0, [Validators.required]),
    loginId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), removeLeadingTrailSpaces]),
    email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]),
    type: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postcode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    state: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });
  constructor(
    private bankService: BankService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.id = this.activatedRoute.snapshot.params.id;
    if(this.id){
      this.isUpdate = true;
      this.customerCreateForm.controls["type"].setValidators(null);
      this.getCustomerDetails();
    }
  }

  ngOnInit(): void {
  }
  createCustomer(){
    if(this.customerCreateForm.valid){
      this.submitted = true;
      this.bankService.createCutomer(this.customerCreateForm.value).subscribe(
        (data:any) => {
        if(data){
          alert("Customer created successfully");
          this.router.navigate(['/home']);
        }else{
          alert("Server error");
        }
      })
    }
  }
  updateCustomer(){
    if(this.customerCreateForm.valid){
      this.submitted = true;
      this.bankService.updateCutomer(this.id,this.customerCreateForm.value).subscribe(
        (data:any) => {
        if(data){
          alert("Customer updated successfully");
          this.router.navigate(['/home']);
        }else{
          alert("Server error");
        }
      })
    }
  }
  getCustomerDetails(){
    this.bankService.getCustomerDetails(this.id).subscribe(
      (data:any) => {
        this.customerCreateForm.patchValue(data);
    })
  }
}
