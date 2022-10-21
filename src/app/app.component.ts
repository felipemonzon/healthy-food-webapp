import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'healthy food';

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);
  }
}
