import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCircle, faSun, faCalendarWeek, faTasks, faCalendar, faBars, faCalendarAlt, faCalendarDay, faMoon, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { AppTranslateService } from '../../services/translate.service';
import { FormsModule } from '@angular/forms';
import { NavbarTagsComponent } from './navbar-tags/navbar-tags.component';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule,
        TranslateModule,
        NavbarTagsComponent
    ],
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public readonly authService = inject(AuthService);

    faSun = faSun;
    faCalendarAlt = faCalendarAlt;
    faTasks = faTasks;
    faCalendar = faCalendar;
    faPlus = faPlus;
  
    get currentLang() {
        return this.appTranslateService.currentLanguge;
    }

  constructor(private readonly appTranslateService: AppTranslateService,
  ) { }

  ngOnInit() {
    initFlowbite();
  }

  setLanguage(lang: string) {
    this.appTranslateService.currentLanguge.set(lang);
  }
}
