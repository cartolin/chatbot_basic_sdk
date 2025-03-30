import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie';


export const clientSdkInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const customer = cookieService.get('chat_saas_id') || '';

  const modifiedReq = req.clone({
    setHeaders: {
      customer
    }
  });

  return next(modifiedReq);
};
