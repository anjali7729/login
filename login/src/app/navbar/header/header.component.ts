import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authservices:AuthService,private router:Router){}
  logout()
  {
    this.authservices.removeToken();
    this.router.navigateByUrl('login');
  }

}
