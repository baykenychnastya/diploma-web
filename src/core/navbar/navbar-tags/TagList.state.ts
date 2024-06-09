import { Injectable, WritableSignal } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TodoItem, TodoService } from '../../../services/todo.service';
import { TagItem, TagsService } from '../../../services/tags.service';

@Injectable({
  providedIn: 'root',
})
export class TagListState {
  private tagsSubject = new BehaviorSubject<TagItem[]>([]);
  tags$ = this.tagsSubject.asObservable().pipe(
    map((list) =>
      list.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime(); // sort by date
      })
    )
  );

  constructor(private readonly tagsService: TagsService) {}

  async loadTags() {
    const list = await firstValueFrom(this.tagsService.get());
    this.tagsSubject.next(list);
  }

  async add(name: WritableSignal<string>, color: WritableSignal<string>) {
    await firstValueFrom(
      this.tagsService.create(name(), color()).pipe(
        tap((newTodo) => {
          const currentTags = this.tagsSubject.getValue();
          this.tagsSubject.next([...currentTags, newTodo]);
        })
      )
    );
  }

  async delete(id: string) {
    await firstValueFrom(this.tagsService.delete(id));
    const currentTags = this.tagsSubject
      .getValue()
      .filter((item) => item.id !== id );
    this.tagsSubject.next(currentTags);
  }
}
