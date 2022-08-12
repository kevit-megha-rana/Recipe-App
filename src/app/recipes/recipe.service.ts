import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService:ShoppingListService){}

    private recipes:Recipe [] = [
        new Recipe(
            'Strawberry Cupcake',
            'Moist,tendering and totally addicting',
            'https://www.halfbakedharvest.com/wp-content/uploads/2022/03/Double-Strawberry-Cupcakes-1.jpg',
            [new Ingredient('Strawberry',4),
             new Ingredient('Milk',23)]),
        new Recipe(
            'Chocolate Cupcake',
            'Ultimate party food',
            'https://sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg',
            [new Ingredient('Chocolate',4)]),
        new Recipe(
            'Mint Oreo Cupcake',
            'Oreos are one of the total guilty pleasures',
            'https://www.justsotasty.com/wp-content/uploads/2016/02/Mint-Chocolate-Cupcakes.jpg',
            [new Ingredient('Mint leaves',4)]),
        new Recipe(
            'Cranberry Cupcake',
            'Filled with orange zest',
            'https://i0.wp.com/bakingwithblondie.com/wp-content/uploads/2018/12/IMG_5322.jpg?resize=1728%2C2592&ssl=1',
            [new Ingredient('Craneberry',4)])];

    getRecipe(){
        return this.recipes.slice();
    }

    getRecipeById(index:number){
        return this.recipes[index];
    }

    addIngredientsToSl(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,recipe:Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}