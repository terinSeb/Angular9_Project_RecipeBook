import { Action } from '@ngrx/store';
import { Ingredients } from '../../shared/ingredients.model';
import { ADD_INGREDIENT } from './shopping-list.action';

const initialState = {
  ingredient: [new Ingredients('Apple', 5), new Ingredients('Mango', 10)],
};
export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        Ingredients: [...state.ingredient, action],
      };
  }
}
