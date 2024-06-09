import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, finalize, map, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { SpinnerService } from "../../services/spinner.service";

export const spinnerInterceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> => {
    const spinnerService = inject(SpinnerService);
    spinnerService.setLoading(true, request.url);
    return next(request).pipe(
        finalize(() => {
            spinnerService.setLoading(false, request.url);
        }),
    );
  };
  