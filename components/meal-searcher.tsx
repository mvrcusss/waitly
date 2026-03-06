"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Loader2, Shuffle, Youtube, Tag, ChefHat } from "lucide-react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  // ... up to 20
  strMeasure1?: string;
  strMeasure2?: string;
  // ... up to 20
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

export function MealSearcher() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);

  const searchMeals = useCallback(async (searchQuery: string, category?: string) => {
    setLoading(true);
    try {
      let url = "";
      if (searchQuery.trim()) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`;
      } else if (category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
      } else {
        setMeals([]);
        setLoading(false);
        return;
      }
      const response = await fetch(url);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setMeals([]);
    }
    setLoading(false);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await response.json();
      setCategories(data.categories?.map((cat: any) => cat.strCategory) || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      setRandomMeal(data.meals?.[0] || null);
      if (data.meals?.[0]) {
        openModal(data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMeals(query, selectedCategory);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, selectedCategory, searchMeals]);

  const getIngredients = (meal: Meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
      const measure = meal[`strMeasure${i}` as keyof Meal] as string;
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const openModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMeal(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <header className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <ChefHat className="w-8 h-8 text-primary" />
            <h1 className="text-4xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground/60">
              Meal Searcher
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Discover delicious recipes with detailed ingredients and instructions. Search as you type with instant results.
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for meals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 animate-spin" />
            )}
          </div>
          <Button
            onClick={fetchRandomMeal}
            variant="outline"
            className="flex items-center gap-2"
            disabled={loading}
          >
            <Shuffle className="w-4 h-4" />
            Random Meal
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          <Button
            variant={selectedCategory === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("")}
          >
            All
          </Button>
          {categories.slice(0, 8).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence>
          {loading && meals.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">Searching for delicious meals...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {meals.map((meal, index) => (
              <motion.div
                key={meal.idMeal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                layout
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => openModal(meal)}
              >
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {meal.strTags && (
                      <div className="absolute top-2 left-2">
                        <div className="flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          <Tag className="w-3 h-3" />
                          {meal.strTags.split(',')[0]}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {meal.strMeal}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {meal.strCategory} • {meal.strArea}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Recipe
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {meals.length === 0 && !loading && (query || selectedCategory) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-12"
          >
            No meals found for "{query || selectedCategory}"
          </motion.p>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedMeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold">{selectedMeal.strMeal}</h2>
                  <p className="text-muted-foreground">{selectedMeal.strCategory} • {selectedMeal.strArea}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedMeal.strYoutube && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(selectedMeal.strYoutube, '_blank')}
                    >
                      <Youtube className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={closeModal}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={selectedMeal.strMealThumb}
                      alt={selectedMeal.strMeal}
                      className="w-full rounded-lg shadow-md"
                    />
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Category:</span> {selectedMeal.strCategory}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Area:</span> {selectedMeal.strArea}
                      </p>
                      {selectedMeal.strTags && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Tags:</span> {selectedMeal.strTags}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Calories:</span> Not available from this API
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <ChefHat className="w-5 h-5" />
                        Ingredients
                      </h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {getIngredients(selectedMeal).map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                          >
                            <span className="font-medium">{item.ingredient}</span>
                            <span className="text-muted-foreground bg-background px-2 py-1 rounded text-sm">
                              {item.measure}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                      <div className="text-sm text-muted-foreground whitespace-pre-line max-h-64 overflow-y-auto bg-muted/30 p-4 rounded-lg">
                        {selectedMeal.strInstructions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}