import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model'
import { ShoppingService } from './shopping.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredient: Ingredients[] ; 
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.ingredient = this.shoppingService.getIngredients();
    this.shoppingService.IngredientsChanged
    .subscribe(
      (Ingred:Ingredients[]) =>{
        this.ingredient = Ingred;
      }
    )
  }

}
