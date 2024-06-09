import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getTodo(): Observable<TodoItem[]> {
        return this.http.get<TodoItem[]>(`${this.apiUrl}/todos`);
    }

    createPost(task: string): Observable<TodoItem> {
        return this.http.post<TodoItem>(`${this.apiUrl}/todos`, {
            todo: task
        });
    }

    update(todo: TodoItem): Observable<TodoItem> {
        return this.http.put<TodoItem>(`${this.apiUrl}/todos/${todo.id}`, {
            completed: todo.completed,
            todo: todo.todo,
            tagIds: todo.tagIds
        });
    }

    delete(id: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/todos/${id}`);
    }
}

export interface TodoItem {
    id: string,
    todo: string,
    createdAt: Date,
    completed: boolean,
    tagIds: string[],

    editable: boolean
}