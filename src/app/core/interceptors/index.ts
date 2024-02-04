import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseInterceptor } from './response-interceptor.service';
import { StatusInterceptor } from './status-interceptor.service';
import { ErrorInterceptor } from './error-interceptor.service';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: StatusInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
