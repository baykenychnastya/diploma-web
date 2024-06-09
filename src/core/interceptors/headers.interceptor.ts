import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../services/auth.service";

export const jsonHeadersInterceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> => {

    const authService = inject(AuthService);
    const token = authService.getToken();

    const modifiedRequest = request.clone({
        setHeaders: {
          'Token': `${token}`
        },
    });

    return next(modifiedRequest);
  };
  