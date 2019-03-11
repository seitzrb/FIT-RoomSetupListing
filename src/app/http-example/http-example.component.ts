import { Component, OnInit } from '@angular/core';
import { HttpExampleService } from './http-example.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-http-example',
  templateUrl: './http-example.component.html',
  styleUrls: ['./http-example.component.css']
})
export class HttpExampleComponent implements OnInit {
  loading = false;
  data: any[];

  constructor(private exampleService: HttpExampleService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.exampleService.get()
      .pipe(finalize(() => { this.loading = false; }))
      .subscribe((res =>
        console.log(res))
      );
  }
}
