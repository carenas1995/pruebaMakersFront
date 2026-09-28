import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../datos/http-servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  terminoBusqueda: string = '';
  idiomaActual: string = 'es';

  @Output() buscar = new EventEmitter<string>();

  constructor(private translate: TranslateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.idiomaActual = this.translate.currentLang || this.translate.defaultLang || 'es';
  }

  cambiarIdioma(lang: string): void {
    this.idiomaActual = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  onBuscar(): void {
    this.buscar.emit(this.terminoBusqueda);
  }
}