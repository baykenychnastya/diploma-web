import { Injectable } from "@angular/core";
import { Clerk } from "@clerk/clerk-js";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private clerk: Clerk = new Clerk(environment.authPublishableKey);
    private token: string | null = null;

    get userImg() {
        return this.clerk.user?.imageUrl;
    }

    get username() {
        return this.clerk.user?.username;
    }

    isAuthenticated(): boolean {
        return !!this.clerk.user;
    }

    async init() {
        await this.clerk.load();

        this.setToken(this.clerk);
        this.startRefreshToken();
    }

    mountSignIn(node: HTMLDivElement) {
        this.clerk.mountSignIn(node);
    }

    async signOut() {
        this.clerk.signOut();
    }

    getToken() {
        return this.token;
    }

    private startRefreshToken() {
        setInterval(() => this.setToken(this.clerk), 2 * 60 * 1000);
    }

    private async setToken(clerk: Clerk) {
        if (clerk.session) {
            this.token = await clerk.session.getToken();
        }
    }
}