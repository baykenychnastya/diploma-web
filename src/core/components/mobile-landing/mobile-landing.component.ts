import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        TranslateModule
    ],
    selector: 'mobile-landing',
    templateUrl: './mobile-landing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileLandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
