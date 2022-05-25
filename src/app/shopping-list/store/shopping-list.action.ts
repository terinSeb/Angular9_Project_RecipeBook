import { Action } from '@ngrx/store';
import { Ingredients } from '../../shared/ingredients.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class addIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredients;
}
