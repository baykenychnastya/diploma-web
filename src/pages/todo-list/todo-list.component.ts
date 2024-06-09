import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { TodoListState } from './states/TodoList.state';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TagListState } from '../../core/navbar/navbar-tags/TagList.state';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        NgMultiSelectDropDownModule
    ],
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
    todo: WritableSignal<string> = signal('');
    now = signal(new Date());

    dropdownSettings:IDropdownSettings = {
        singleSelection: false,
        enableCheckAll: false,
        idField: 'id',
        textField: 'name',
        itemsShowLimit: 3,
      };

    constructor(readonly todoListState: TodoListState, 
        readonly tagListState: TagListState,
        private readonly authService: AuthService) {
        this.todoListState.loadTodos();
    }

    async ngOnInit() {
        
    }

    getCurrentDate() {
        return this.now().getDate();
    }

    add() {
        if (!this.todo()) {
            return;
        }

        this.todoListState.add(this.todo);
    }

    comlete(item: TodoItem) {
        item.completed = !item.completed;
        this.todoListState.update(item);
    }

    update(item: TodoItem) {
        this.todoListState.update(item);
    }

    delete(item: TodoItem) {
        this.todoListState.delete(item.id);
    }

    enableEdit(item: TodoItem) {
        item.editable = true;
    }

    saveTags(item: TodoItem) {
        this.todoListState.update(item);
    }
}
