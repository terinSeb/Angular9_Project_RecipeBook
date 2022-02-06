import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: recipe;
  id: number;
  constructor(
    private recipeSer: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeSer.getRecipe(this.id);
    });
  }
  onAddToShoppingList() {
    this.recipeSer.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe() {
    //Method 1
    this.router.navigate(['edit'], { relativeTo: this.route });
    //Method 2
    //this.router.navigate(['../',this.id,'edit'], {relativeTo:this.currRoute});
  }
  onDelete() {
    this.recipeSer.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
