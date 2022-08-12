import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService:RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );
  }

  addToSl(){
    this.recipeService.addIngredientsToSl(this.recipe.ingredients);
    this.router.navigate(['/shoppinglist']);
  }

  editRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});  
    // this.router.navigate(['/recipes',this.id,'edit']);
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
