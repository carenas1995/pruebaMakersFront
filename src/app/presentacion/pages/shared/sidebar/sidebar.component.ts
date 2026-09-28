import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../datos/http-servicios/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {

  }

  ngOnInit() {
    
  }

  logout() {
    this.authService.logout();
  }

}
