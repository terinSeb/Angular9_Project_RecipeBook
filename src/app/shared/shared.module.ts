import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { dropDownDirective } from './dropdown.directive';
import { LoadingSpinnerComponenet } from './loading-spinner/loading-spinner';
import { PlaceholderDirective } from './placeHolder/placeholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponenet,
    dropDownDirective,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponenet,
    dropDownDirective,
    PlaceholderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
