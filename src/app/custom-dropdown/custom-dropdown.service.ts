import { CustomSelectComponent } from './custom-select.component';

export class CustomDropdownService {

  private select: CustomSelectComponent;

  public register(select: CustomSelectComponent) {
    this.select = select;
  }

  public getSelect(): CustomSelectComponent {
    return this.select;
  }
}