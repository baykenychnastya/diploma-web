import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TagListState } from './TagList.state';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { TagItem } from '../../../services/tags.service';

@Component({
    standalone: true,
    imports: [
        TranslateModule,
        CommonModule
    ],
    selector: 'app-navbar-tags',
    templateUrl: './navbar-tags.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarTagsComponent implements OnInit {

  constructor(public readonly tagListState: TagListState) { }

  ngOnInit() {
    initFlowbite();

    this.tagListState.loadTags();
  }

  async delete(tag: TagItem) {
    await this.tagListState.delete(tag.id);
  }
}
