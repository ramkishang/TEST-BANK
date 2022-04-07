import { Component,EventEmitter, OnInit,Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { TokenService } from 'src/app/data/services/token/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleBarsForBank:EventEmitter<any> = new EventEmitter();
  currentUser:any;
  constructor(
    private tokenStorageService:TokenService,
    private authService: AuthService,
    private router: Router,
    ) { 
    this.currentUser = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
  }
  toggleSidebar(){
    this.toggleBarsForBank.emit();
  }
  logout(){
    let userRole = this.tokenStorageService.getUserRole();
    let loginData = {
      "loginId": this.currentUser?.loginId,
    }
    if(userRole == 1){
      this.authService.adminLogout(loginData).subscribe(
        (data:any) => {
          this.tokenStorageService.signOut();
          this.router.navigateByUrl("/app/refresh", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/adminLogin']);
          })
        });
    }else{
      this.authService.logout(loginData).subscribe(
        (data:any) => {
          this.tokenStorageService.signOut();
          this.router.navigateByUrl("/app/refresh", { skipLocationChange: true }).then(() => {
            this.router.navigate(['/login']);
          })
        });
    }
  }
}
