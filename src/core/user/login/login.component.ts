import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
    standalone: true,
    imports: [
    ],
    selector: 'app-login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements AfterViewInit {

    @ViewChild('login') loginElement!: ElementRef<HTMLDivElement>;

    constructor(private readonly authService: AuthService) { }

    ngAfterViewInit() {
        this.authService.mountSignIn(this.loginElement.nativeElement);
    }
}
