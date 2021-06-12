import { EventEmitter, Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import {recipe} from './recipe.model'
@Injectable()
export class RecipeService{

  recipeSelected = new EventEmitter<recipe>();

  private recipes : recipe[] =[
    new recipe(
      'A Test Recipe',
      'This is Simple a Test',
      'https://res.cloudinary.com/grohealth/image/upload/$wpsize_!_cld_full!,w_2119,h_1415,c_scale/v1588092494/iStock-10131071761-1.jpg',
      [
        new Ingredients('Meat',1),
        new Ingredients('Bread',2)
      ]),
    new recipe('A Test Recipe2',
    'This is Simple a Test2',
    'https://res.cloudinary.com/grohealth/image/upload/$wpsize_!_cld_full!,w_2119,h_1415,c_scale/v1588092494/iStock-10131071761-1.jpg',
    [
      new Ingredients('Jam',1),
      new Ingredients('Milk',2)
    ])    
  ];
  constructor(private slService:ShoppingService){}
getRecipes(){
  return this.recipes.slice();
}
getRecipe(index: number){
return this.recipes[index];
}
addIngredientsToShoppingList(ingredients: Ingredients[]){
this.slService.addIngredient(ingredients);
}
}