import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';

export class ShoppingService {
  IngredientsChanged = new Subject<Ingredients[]>();
  StartedEditing = new Subject<Number>();
  private ingredient: Ingredients[] = [
    new Ingredients('Apple', 5),
    new Ingredients('Mango', 10),
  ];

  getIngredients() {
    return this.ingredient.slice();
  }
  getIngredient(index: number) {
    return this.ingredient[index];
  }
  addIngredients(ingredients: Ingredients) {
    this.ingredient.push(ingredients);
    this.IngredientsChanged.next(this.ingredient.slice());
  }
  addIngredient(ingre: Ingredients[]) {
    this.ingredient.push(...ingre);
    this.IngredientsChanged.next(this.ingredient.slice());
  }
  updateIngredients(index: number, newIngredient: Ingredients) {
    this.ingredient[index] = newIngredient;
    this.IngredientsChanged.next(this.ingredient.slice());
  }
  deleteItem(index: number) {
    this.ingredient.splice(index, 1);
    this.IngredientsChanged.next(this.ingredient.slice());
  }
}
