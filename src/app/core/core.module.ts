import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }]
})
export class CoreModule { }
