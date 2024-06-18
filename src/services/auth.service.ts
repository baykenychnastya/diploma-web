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
        return this.getSessionCookie();
    }

    getCookie(name: string): string | null {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }
    
      getSessionCookie(): string | null {
        return this.getCookie('__session');
      }

    private startRefreshToken() {
        setInterval(async () => await this.setToken(this.clerk), 2 * 60 * 1000);
    }

    private async setToken(clerk: Clerk) {
        console.log("setting new tiken");
        if (clerk.session) {
            this.token = await clerk.session.getToken();
            console.log("new token is set", this.token);
        }
    }
}