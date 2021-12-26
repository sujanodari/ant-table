export interface BiologicalHazardTableItem {
  RecipeCategoryId: number;
  RecipeSubCategoryId: number;
  BiologicalHazardId: number;
  RecipeClientDetailId: number;
  IsExists: boolean;
  Status: boolean;
  IngredientId: number;
  IngredientName: string;
  CategoryTitle: string;
  RecipeSubCategoryTitle: string;
  BiologicalHazardTitle: string;
  process: string;
  minUnit: number;
  maxUnit: number;
  duration: number;
  interval: string;
}
