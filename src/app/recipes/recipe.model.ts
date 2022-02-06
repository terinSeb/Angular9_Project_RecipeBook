import { Ingredients } from '../shared/ingredients.model';

export class recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredients[];

  constructor(
    name: string,
    description: string,
    imagePath: string,
    ingred: Ingredients[]
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingred;
  }
}
