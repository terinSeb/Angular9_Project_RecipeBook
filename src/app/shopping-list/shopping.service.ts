import { EventEmitter } from '@angular/core';
import {Ingredients} from '../shared/ingredients.model'

export class ShoppingService{
  IngredientsChanged = new EventEmitter<Ingredients[]>();

  private ingredient: Ingredients[] = [
    new Ingredients('Apple',5),
    new Ingredients('Mango',10)
  ]; 

  getIngredients(){
   return this.ingredient.slice();
  }
  addIngredients(ingredients: Ingredients){
    this.ingredient.push(ingredients)
    this.IngredientsChanged.emit(this.ingredient.slice());
  }
  addIngredient(ingre:Ingredients[]){
this.ingredient.push(...ingre);
this.IngredientsChanged.emit(this.ingredient.slice())
  }
}