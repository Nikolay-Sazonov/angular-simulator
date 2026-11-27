import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  console.log(`➡️ [HTTP] ${req.method} ${req.url}`);

  return next(req).pipe(
    tap((event ) => {
      if (event.type === 4) {
        const elapsed = Date.now() - started;
        console.log(`✅ [HTTP] ${req.method} ${req.url} → Status: ${event.status} (${elapsed}ms)`);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const elapsed = Date.now() - started;
      console.error(`❌ [HTTP] ${req.method} ${req.url} → Error: ${error.status} ${error.statusText} (${elapsed}ms)`);
      return throwError(() => error);
    })
  );
};
