import { Injectable } from '@angular/core';
import { CustomSelectComponent } from './custom-select.component';

@Injectable()
export class CustomDropdownService {

  private select: CustomSelectComponent;

  public register(select: CustomSelectComponent) {
    this.select = select;
  }

  public getSelect(): CustomSelectComponent {
    return this.select;
  }
}