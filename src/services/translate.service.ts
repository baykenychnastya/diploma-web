import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AppTranslateService {
  
    currentLanguge = signal('ua');
}