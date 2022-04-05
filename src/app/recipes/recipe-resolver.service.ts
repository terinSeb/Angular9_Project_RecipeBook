import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<recipe[]> {
  constructor(
    private dataStorage: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, State: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorage.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
