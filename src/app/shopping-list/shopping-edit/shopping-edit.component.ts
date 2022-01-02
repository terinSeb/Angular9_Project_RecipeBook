import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients;
  @ViewChild('f') slForm: NgForm;
  constructor(private shoppinService: ShoppingService) {}

  ngOnInit(): void {
    this.subscription = this.shoppinService.StartedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  onAddItem(content: NgForm) {
    const Fromvalue = content.value;
    const newIngredient = new Ingredients(Fromvalue.name, Fromvalue.amount);
    if (this.editMode) {
      this.shoppinService.updateIngredients(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppinService.addIngredients(newIngredient);
    }
    content.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppinService.deleteItem(this.editedItemIndex);
    this.onClear();
  }
}
