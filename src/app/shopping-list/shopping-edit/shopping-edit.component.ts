import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('amountInput',{static: true}) amountInputref: ElementRef
@ViewChild('nameInput', {static: true}) nameInputregf: ElementRef
  constructor(private shoppinService:ShoppingService) { }

  ngOnInit(): void {
  }
  onAddItem(){
const amount = this.amountInputref.nativeElement.value;
const name = this.nameInputregf.nativeElement.value;
const newIngredient = new Ingredients(name,amount);
this.shoppinService.addIngredients(newIngredient);
  }

}
