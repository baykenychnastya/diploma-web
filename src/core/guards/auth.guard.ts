import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    
    if (authService.isAuthenticated() ) {
        return true;
    }

    const router = inject(Router);
    router.navigate(['start']);
    return false;
};
