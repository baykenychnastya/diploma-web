import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../core/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        RouterOutlet,
        NavbarComponent
    ],
    selector: 'app-full',
    templateUrl: './full.component.html',
})
export class FullComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
