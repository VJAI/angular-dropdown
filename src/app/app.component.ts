import { Component } from '@angular/core';

@Component({
  selector: 'custom-root',
  templateUrl: './app.component.html',
  styleUrls: ['./_app.scss']
})
export class AppComponent {

  public selectedDestination: string;
}
