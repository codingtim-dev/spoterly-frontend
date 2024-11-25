import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('authToken');

  if (token) {

    const headers = req.headers.set('Authorization', 'Bearer ' + token);

    req = req.clone({headers})

  }
  return next(req).pipe(tap((response) => {console.log("response ", response)}));

}
