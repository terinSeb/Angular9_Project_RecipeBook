import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeResolverService } from '../recipes/recipe-resolver.service';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    resolve: [RecipeResolverService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutesModule {}
