import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: recipe[];
  subscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private routes: ActivatedRoute
  ) {}
  //A comment
  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recp: recipe[]) => {
        this.recipes = recp;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.routes });
  }
}
