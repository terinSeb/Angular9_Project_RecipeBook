import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, retry, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { pipe } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authServ: AuthService
  ) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(
        'https://ng-course-recipe-book-d76a1-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipes() {
    return this.http
      .get<recipe[]>(
        'https://ng-course-recipe-book-d76a1-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipe) => {
          this.recipeService.setRecepies(recipe);
        })
      );

    // .subscribe((response) => {
    //   this.recipeService.setRecepies(response);
    // });
  }
}
