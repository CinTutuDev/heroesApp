import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent {
  public sidebarItems = [
    {
      label: 'Listado',
      icon: 'label',
      url: './list',
    },
    {
      label: 'Añadir',
      icon: 'add',
      url: './new-hero',
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search',
    },
  ];

  constructor(private authS: AuthService, private route: Router) {}

  get user(): User | undefined {
    return this.authS.currentUser;
  }

  onLogout(): void {
    this.authS.logout();
    this.route.navigate(['/auth/login']);
  }
}
