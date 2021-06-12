import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { FormsModule } from '@angular/forms';
import { dropDownDirective } from './shared/dropdown.directive';
import { ShoppingService } from './shopping-list/shopping.service';
import { AppRoutingModule } from './app.routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,    
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    dropDownDirective,
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
