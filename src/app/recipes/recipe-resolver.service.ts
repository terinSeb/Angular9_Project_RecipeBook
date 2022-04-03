import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { recipe } from './recipe.model';

// @Injectable({providedIn:'root'});
// export class RecipeResolverService implements Resolve<recipe[]>{
// // constructor(private dataStorage:DataStorageService){}
// // resolve(route: ActivatedRouteSnapshot,State: RouterStateSnapshot){

// // }
// }
