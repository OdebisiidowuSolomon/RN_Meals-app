import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals,
        };
      } else {
        const meal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        let condition = true;
        if (!meal.isGlutenFree && appliedFilters.glutenFree) return false;
        if (!meal.isLactoseFree && appliedFilters.lactoseFree) return false;
        if (!meal.isVegan && appliedFilters.vegan) return false;
        if (!meal.isVegetarian && appliedFilters.isVegetarian) return false;
        return true;
      });
      console.log("filteredMeals", filteredMeals);
      return {
        ...state,
        filteredMeals,
      };
    default:
      return state;
  }
};

export default mealsReducer;
