import { Component, ElementRef, ViewChild , OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { removeLeadingTrailSpaces } from 'src/app/core/helpers/whitespace.validator';
import { AuthService } from '../../../data/services/auth/auth.service';
import { TokenService } from 'src/app/data/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('submitButton', { read: ElementRef })
  submitButton!: ElementRef;
  title="Customer Login";
  hide = true;
  errorMessage = " ";
  submitted = false;
  loginForm = new FormGroup({
    loginId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), removeLeadingTrailSpaces]),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    private TokenService: TokenService
  ) { }

  ngOnInit(): void {
  }
  login(){
    if(this.loginForm.valid){
      this.submitted = true;
      this.authService.login(this.loginForm.value).subscribe(
        (data:any) => {
          if(data){
            let userData = {
              'name':data.name,
              'loginId': data.loginId,
              'id': data.id
            };
            this.TokenService.saveUser(userData);
            this.TokenService.saveUserRole(0);
            this.router.navigate(['/home']);
            this.submitButton.nativeElement.disabled = false;
          }
           this.errorMessage = "User not exists";
        },
        (error) => {
          this.errorMessage = "User not exists";
          this.submitted = true;
          this.submitButton.nativeElement.disabled = false;
        },
        () => {
          //Complete callback
        }
      );
    }
  }

}
