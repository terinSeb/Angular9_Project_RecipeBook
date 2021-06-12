import { Component, OnInit,Input } from '@angular/core';
import { recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
@Input() recipe : recipe

constructor(private recipeSer:RecipeService) { }

  ngOnInit(): void {
  }
  onAddToShoppingList() {
    this.recipeSer.addIngredientsToShoppingList(this.recipe.ingredients)
  }

}
