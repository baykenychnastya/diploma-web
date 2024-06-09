import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TagListState } from '../TagList.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ColorPickerModule
    ],
    selector: 'add-tag-modal',
    templateUrl: './add-tag-modal.component.html',
})
export class AddTagModalComponent implements OnInit {
    name = signal('');
    color = signal('#000000');
    
    constructor(private readonly tagListState: TagListState) { }

    ngOnInit() {
    }

    async add(event: MouseEvent) {
        if (!this.name() || !this.color()) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }

        await this.tagListState.add(this.name, this.color);
        this.name = signal('');
        this.color = signal('#000000');
    }

}
