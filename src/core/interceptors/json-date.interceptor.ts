import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const jsonDateInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    map((val: HttpEvent<any>) => {
      if (val instanceof HttpResponse) {
        const body = val.body;
        convert(body);
      }
      return val;
    })
  );
};

const _isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;

function isIsoDateString(value: any): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return _isoDateFormat.test(value);
  }
  return false;
}
function convert(body: any) {
  if (body === null || body === undefined) {
    return body;
  }
  if (typeof body !== 'object') {
    return body;
  }
  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) {
      body[key] = new Date(value);
    } else if (typeof value === 'object') {
      convert(value);
    }
  }
}
