import { Highlightable } from '@angular/cdk/a11y';
import { Component, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { CustomDropdownService } from './custom-dropdown.service';
import { CustomSelectComponent } from './custom-select.component';

@Component({
  selector: 'custom-select-option',
  template: '<input type="checkbox" *ngIf="showCheckbox" [checked]="selected" />{{value}}',
  styleUrls: ['./_custom-select-option.scss']
})
export class CustomSelectOptionComponent implements Highlightable {

  @Input()
  public key: string;

  @Input()
  public value: string;

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.select && (this.select.selectedOption.indexOf(this) !== -1);
  }

  public get showCheckbox(): boolean {
    return this.select && this.select.multi;
  }

  @HostBinding('class.active')
  public active = false;

  private select: CustomSelectComponent;

  constructor(private dropdownService: CustomDropdownService) {
    this.select = this.dropdownService.getSelect();
  }

  public getLabel(): string {
    return this.value;
  }

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.select.selectOption(this);
  }
}
