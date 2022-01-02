import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredient: Ingredients[];
  private isChangedSub: Subscription;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredient = this.shoppingService.getIngredients();
    this.isChangedSub = this.shoppingService.IngredientsChanged.subscribe(
      (Ingred: Ingredients[]) => {
        this.ingredient = Ingred;
      }
    );
  }

  ngOnDestroy(): void {
    this.isChangedSub.unsubscribe();
  }
  onEditItem(index: number) {
    this.shoppingService.StartedEditing.next(index);
  }
}
