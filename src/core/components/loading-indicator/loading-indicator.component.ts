import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { delay } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    standalone: true,
    imports: [
        NgIf
    ],
    selector: 'app-loading-indicator',
    templateUrl: './loading-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent implements OnInit {
    loading = signal(false);

    constructor(private readonly spinnerService: SpinnerService) {
        spinnerService.loadingSub
            .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
            .subscribe((loading) => {
                this.loading.set(loading);
            });    
    }    

    ngOnInit() {
    }

}
