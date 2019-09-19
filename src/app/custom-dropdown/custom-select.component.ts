import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  QueryList,
  ViewChild
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomDropdownService } from './custom-dropdown.service';
import { CustomSelectOptionComponent } from './custom-select-option.component';
import { DropdownComponent } from './dropdown.component';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.html',
  styleUrls: ['./_custom-select.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    },
    CustomDropdownService
  ]
})
export class CustomSelectComponent implements AfterViewInit, ControlValueAccessor {

  constructor(private dropdownService: CustomDropdownService) {
    this.dropdownService.register(this);
  }

  @Input()
  public label: string;

  @Input()
  public placeholder: string;

  @Input()
  public selected: string[] = [];

  @Input()
  public required = false;

  @Input()
  public disabled = false;

  @Input()
  public multi = false;

  @ViewChild('input', { static: true })
  public input: ElementRef;

  @ViewChild(DropdownComponent, { static: true })
  public dropdown: DropdownComponent;

  @ContentChildren(CustomSelectOptionComponent)
  public options: QueryList<CustomSelectOptionComponent>;

  public selectedOption: CustomSelectOptionComponent[] = [];

  public displayText: string;

  private keyManager: ActiveDescendantKeyManager<CustomSelectOptionComponent>;

  public onChangeFn = (_: any) => { };

  public onTouchedFn = () => { };

  public ngAfterViewInit() {
    setTimeout(() => {
      if ( !this.selected ) { this.selected = []; }
      this.selectedOption = this.options.toArray().filter(option => this.selected.indexOf(option.key) !== -1);
      this.displayText = this.createDisplayText();
      this.keyManager = new ActiveDescendantKeyManager(this.options)
        .withHorizontalOrientation('ltr')
        .withVerticalOrientation()
        .withWrap();
    });
  }

  public createDisplayText() {
    if (this.multi) {
      let toReturn = '';
      if (this.selectedOption.length > 0) {
        this.selectedOption.forEach((option: CustomSelectOptionComponent, index) => {
          if (option) { toReturn = toReturn + option.value + ((index === this.selectedOption.length - 1) ? '' : ', '); }
        });
      }
      return toReturn;
    } else {
      return this.selectedOption.length > 0 && this.selectedOption[0] ? this.selectedOption[0].value : '';
    }
  }

  public showDropdown() {
    this.dropdown.show();
    if (!this.options.length) {
      return;
    }
  }

  public hideDropdown() {
    this.dropdown.hide();
  }

  public onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    setTimeout(() => {
      this.input.nativeElement.focus();
      this.input.nativeElement.click();
    }, 10);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) > -1) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        return;
      }

      if (!this.options.length) {
        event.preventDefault();
        return;
      }
    }

    if (event.key === 'Enter' || event.key === ' ') {
      const option = this.keyManager.activeItem;
      this.changeOption(option);
      this.displayText = this.createDisplayText();
      if (!this.multi) { this.hideDropdown(); }
      this.onChange();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      this.dropdown.showing && this.hideDropdown();
    } else if (['ArrowUp', 'Up', 'ArrowDown', 'Down', 'ArrowRight', 'Right', 'ArrowLeft', 'Left']
      .indexOf(event.key) > -1) {
      this.keyManager.onKeydown(event);
    } else if (event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'Tab') {
      this.dropdown.showing && event.preventDefault();
    }
  }

  public changeOption(option: CustomSelectOptionComponent) {
    const index = this.selectedOption.indexOf(option);
    if (!this.multi) {
      this.selectedOption[0] = option;
      this.selected[0] = option.key;
    } else {
      if (index === -1) {
        this.selectedOption.push(option);
        this.selected.push(option.key);
      } else {
        this.selectedOption.splice(index, 1);
        this.selected.splice(index, 1);
      }
    }
  }

  public selectOption(option: CustomSelectOptionComponent) {
    this.keyManager.setActiveItem(option);
    this.changeOption(option);
    this.displayText = this.createDisplayText();
    if (!this.multi) { this.hideDropdown(); }
    this.input.nativeElement.focus();
    this.onChange();
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.selected = obj;
  }

  public onTouched() {
    this.onTouchedFn();
  }

  public onChange() {
    this.onChangeFn(this.selected);
  }
}
