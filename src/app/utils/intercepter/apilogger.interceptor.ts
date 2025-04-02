import { HttpInterceptorFn } from '@angular/common/http';

export const apiloggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url, 'Request URL is this =>')
  return next(req);
};
