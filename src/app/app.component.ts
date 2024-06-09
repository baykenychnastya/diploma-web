import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { LoadingIndicatorComponent } from '../core/components/loading-indicator/loading-indicator.component';
import { MobileLandingComponent } from '../core/components/mobile-landing/mobile-landing.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppTranslateService } from '../services/translate.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { AddTagModalComponent } from '../core/navbar/navbar-tags/add-tag-modal/add-tag-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [        
        RouterOutlet,
        LoadingIndicatorComponent,
        MobileLandingComponent,
        AddTagModalComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
 
    public readonly authService = inject(AuthService);
    init = signal(false);


    constructor(translate: TranslateService, appTranslateService: AppTranslateService) {
        translate.addLangs(['en', 'ua']);
        translate.setDefaultLang('ua');
        
        toObservable(appTranslateService.currentLanguge).pipe(
            tap(currentLang => translate.use(currentLang))
        ).subscribe();
    }
    
    async ngOnInit() {
        this.init.set(true);
    }
}


