import { Injectable, WritableSignal } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TodoItem, TodoService } from '../../../services/todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListState {
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  todos$ = this.todosSubject.asObservable().pipe(
    map((list) =>
      list.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return b.createdAt.getTime() - a.createdAt.getTime(); // sort by date
      })
    )
  );

  constructor(private readonly todoService: TodoService) {}

  async loadTodos() {
    const list = await firstValueFrom(this.todoService.getTodo());
    this.todosSubject.next(list);
  }

  async add(task: WritableSignal<string>) {
    await firstValueFrom(
      this.todoService.createPost(task()).pipe(
        tap((newTodo) => {
          task.set('');
          const currentTodos = this.todosSubject.getValue();
          this.todosSubject.next([...currentTodos, newTodo]);
        })
      )
    );
  }

  async update(todo: TodoItem) {
    const updatedTodo = await firstValueFrom(
      this.todoService.update(todo)
    );
    const currentTodos = this.todosSubject
      .getValue()
      .map((item) => (item.id === updatedTodo.id ? updatedTodo : item));
    this.todosSubject.next(currentTodos);
  }

  async delete(id: string) {
    await firstValueFrom(this.todoService.delete(id));
    const currentTodos = this.todosSubject
      .getValue()
      .filter((item) => item.id !== id );
    this.todosSubject.next(currentTodos);
  }
}
