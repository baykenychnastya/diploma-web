import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TagsService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    get(): Observable<TagItem[]> {
        return this.http.get<TagItem[]>(`${this.apiUrl}/tags`);
    }

    create(name: string, color: string): Observable<TagItem> {
        return this.http.post<TagItem>(`${this.apiUrl}/tags`, {
            name,
            color
        });
    }

    delete(id: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/tags/${id}`);
    }
}

export interface TagItem {
    id: string,
    name: string,
    color: Date,
    createdAt: Date,

    editable: boolean
}