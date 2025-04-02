import { HttpInterceptorFn } from '@angular/common/http';

export const apiloggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  return next(req);
};
