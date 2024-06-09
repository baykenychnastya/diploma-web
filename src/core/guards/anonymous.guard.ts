import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { inject } from "@angular/core";

export const anonymousGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    
    if (!authService.isAuthenticated() ) {
        return true;
    }

    const router = inject(Router);
    router.navigate(['tasks']);
    return false;
};
