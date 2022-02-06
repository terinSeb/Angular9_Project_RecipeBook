import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private recipeServie: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
    });
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onSubmit() {
    if (this.editMode) {
      this.recipeServie.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeServie.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngrd(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeImageDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeServie.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeImageDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredients of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredients.name, Validators.required),
              amount: new FormControl(ingredients.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeImageDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
