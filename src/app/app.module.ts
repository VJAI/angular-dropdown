import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { CustomSelectComponent } from './custom-dropdown/custom-select.component';
import { CustomSelectOptionComponent } from './custom-dropdown/custom-select-option.component';
import { DropdownComponent } from './custom-dropdown/dropdown.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomSelectComponent,
    CustomSelectOptionComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OverlayModule,
    PortalModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
