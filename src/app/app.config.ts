import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jsonDateInterceptor } from '../core/interceptors/json-date.interceptor';
import { jsonHeadersInterceptor } from '../core/interceptors/headers.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { spinnerInterceptor } from '../core/interceptors/spinner.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppTranslateService } from '../services/translate.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [  
    {
        provide: APP_INITIALIZER,
        useFactory: initializeAuth,
        multi: true,
        deps: [AuthService]
    },
    {
        provide: LOCALE_ID,
        deps: [AppTranslateService],
        useFactory: (translateService: AppTranslateService) => translateService.currentLanguge()
    },
    CookieService,
    provideHttpClient(
        withInterceptors([
            jsonDateInterceptor,
            jsonHeadersInterceptor,
            spinnerInterceptor
        ])
    ),
    provideRouter(routes),
    provideAnimationsAsync(),

    importProvidersFrom(HttpClientModule),
    importProvidersFrom(TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })),
  ],
};


export function initializeAuth(authService: AuthService): () => Promise<void> {
    return async () => await authService.init();
}  
