import { useState, useMemo, useCallback, useEffect } from "react";

// ─── Embedded Meal Data ───
const RAW_RECIPES = [
  {n:"Homemade Pizza",c:73,cat:"Pizza"},
  {n:"Turkey Sandwich",c:54,cat:"Sandwich"},
  {n:"Nachos",c:44,cat:"Mexican"},
  {n:"Tacos",c:20,cat:"Mexican"},
  {n:"Hummus Platter",c:18,cat:"Other"},
  {n:"Fried Rice",c:17,cat:"Asian"},
  {n:"Enchiladas",c:12,cat:"Mexican"},
  {n:"Burgers & Fries",c:23,cat:"Beef"},
  {n:"Beef Tacos",c:11,cat:"Beef"},
  {n:"Pancakes",c:10,cat:"Breakfast"},
  {n:"Breakfast Burritos",c:10,cat:"Mexican"},
  {n:"Chicken Salad Wraps",c:8,cat:"Chicken"},
  {n:"Ground Beef Tacos",c:8,cat:"Beef"},
  {n:"Quesadillas",c:8,cat:"Mexican"},
  {n:"Pizza Out",c:8,cat:"Pizza"},
  {n:"Chili",c:7,cat:"Soup & Chili"},
  {n:"Green Chicken Chili",c:7,cat:"Chicken"},
  {n:"Fried Chicken",c:7,cat:"Chicken"},
  {n:"Chicken Salad",c:7,cat:"Chicken"},
  {n:"Cauliflower Pasta",c:7,cat:"Pasta"},
  {n:"Chicken Tinga Tacos",c:6,cat:"Chicken"},
  {n:"Chicken Tacos",c:6,cat:"Chicken"},
  {n:"Roast Beef Sandwich",c:6,cat:"Beef"},
  {n:"Roasted Red Pepper Soup",c:5,cat:"Soup & Chili"},
  {n:"Sushi",c:5,cat:"Seafood"},
  {n:"Egg Casserole",c:5,cat:"Breakfast"},
  {n:"Broccoli Pesto Pasta",c:5,cat:"Pasta"},
  {n:"Chili & Cornbread",c:5,cat:"Soup & Chili"},
  {n:"Tuna Salad Sandwich",c:5,cat:"Seafood"},
  {n:"Caesar Salad",c:5,cat:"Salad"},
  {n:"Chicken with Rice",c:4,cat:"Chicken"},
  {n:"Carbonara",c:4,cat:"Pasta"},
  {n:"Ramen",c:4,cat:"Pasta"},
  {n:"Carbonara with Bacon",c:4,cat:"Pork"},
  {n:"Chicken Shawarma",c:4,cat:"Chicken"},
  {n:"Curry with Rice",c:4,cat:"Asian"},
  {n:"Chicken & Rice",c:4,cat:"Chicken"},
  {n:"Chicken Breast",c:3,cat:"Chicken"},
  {n:"Pasta Salad",c:3,cat:"Pasta"},
  {n:"Burrito Bowl",c:3,cat:"Mexican"},
  {n:"Chicken with Broccoli",c:3,cat:"Chicken"},
  {n:"Spicy Chicken Yum Bowls",c:3,cat:"Chicken"},
  {n:"Chicken Caesar Salad",c:3,cat:"Chicken"},
  {n:"Hummus Crunch Salad",c:3,cat:"Salad",u:"https://thefirstmess.com/2023/05/24/hummus-crunch-salad/"},
  {n:"Pesto Pasta",c:3,cat:"Pasta"},
  {n:"French Onion Pasta",c:3,cat:"Pasta"},
  {n:"Protein Pancakes",c:3,cat:"Breakfast"},
  {n:"Black Pepper Chicken",c:3,cat:"Chicken"},
  {n:"Cinnamon Rolls",c:3,cat:"Breakfast"},
  {n:"Baked Oats",c:3,cat:"Breakfast"},
  {n:"Crunch Salad",c:3,cat:"Salad"},
  {n:"Pasta Carbonara",c:3,cat:"Pasta"},
  {n:"Mediterranean Salad",c:2,cat:"Salad"},
  {n:"Pulled Pork Tacos",c:2,cat:"Pork"},
  {n:"Baked Teriyaki Meatballs",c:2,cat:"Beef"},
  {n:"Steak Salad with Farro",c:2,cat:"Beef"},
  {n:"Taco Salad",c:2,cat:"Mexican"},
  {n:"Gong Bao Chicken",c:2,cat:"Chicken",u:"https://food52.com/recipes/9331-gong-bao-ji-ding-gong-bao-chicken"},
  {n:"Kale Caesar Salad",c:2,cat:"Salad"},
  {n:"Chicken & Dumplings",c:2,cat:"Chicken"},
  {n:"Chicken Kathi & Paratha",c:2,cat:"Chicken"},
  {n:"Bean & Cheese Quesadillas",c:2,cat:"Mexican"},
  {n:"Chicken Ramen",c:2,cat:"Chicken"},
  {n:"Chicken Enchilada Skillet",c:2,cat:"Chicken"},
  {n:"Pork Chops",c:2,cat:"Pork"},
  {n:"Fried Chicken Wraps",c:2,cat:"Chicken"},
  {n:"Paneer Chana Masala",c:2,cat:"Asian"},
  {n:"Grain Salad",c:2,cat:"Salad"},
  {n:"Steak Sandwiches",c:2,cat:"Beef"},
  {n:"Burgers with Tater Tots",c:2,cat:"Beef"},
  {n:"Shepherd's Pie",c:2,cat:"Other"},
  {n:"Carne Asada Tacos",c:2,cat:"Mexican"},
  {n:"Avocado Bacon Pitas",c:2,cat:"Pork"},
  {n:"Bell Pepper Pasta",c:2,cat:"Pasta"},
  {n:"Pulled Pork",c:2,cat:"Pork"},
  {n:"Yum Rice Bowls",c:2,cat:"Asian"},
  {n:"Sheet Pan Moroccan Chicken",c:1,cat:"Chicken",u:"https://www.ambitiouskitchen.com/sheetpan-moroccan-chicken/"},
  {n:"Korean BBQ Burrito",c:1,cat:"Asian",u:"https://pinchofyum.com/korean-bbq-burrito"},
  {n:"Spiced Lamb & Yogurt Pasta",c:1,cat:"Pasta"},
  {n:"Crunchy Veg Bowl with Peanut Sauce",c:1,cat:"Other",u:"https://www.bonappetit.com/recipe/crunchy-veg-bowl-with-warm-peanut-sauce"},
  {n:"Glazed BBQ Chicken",c:1,cat:"Chicken",u:"https://www.bonappetit.com/recipe/healthyish-barbecued-chicken"},
  {n:"Sesame-Scallion Chicken Salad",c:1,cat:"Chicken"},
  {n:"Spicy Steak Lettuce Wraps",c:1,cat:"Beef"},
  {n:"Skirt Steak with Shallot Pan Sauce",c:1,cat:"Beef"},
  {n:"Brats, Peppers & Onions",c:1,cat:"Pork"},
  {n:"Saucy French Chicken",c:1,cat:"Chicken"},
  {n:"Smitty Burger & Fries",c:1,cat:"Beef"},
  {n:"Dry-Rubbed Flank Steak with Corn Salsa",c:1,cat:"Beef"},
  {n:"Chicken Teriyaki Rice & Edamame",c:1,cat:"Chicken"},
  {n:"Pork Bolognese",c:1,cat:"Pork"},
  {n:"Roasted Garlic & Kale Caesar",c:1,cat:"Salad"},
  {n:"Lemon Herb Chicken Orzo Salad",c:1,cat:"Chicken",u:"https://www.halfbakedharvest.com/lemon-herb-chicken-avocado-orzo-salad/"},
  {n:"Mac & Cheese",c:2,cat:"Pasta",u:"https://food52.com/recipes/14671-martha-stewart-s-macaroni-cheese"},
  {n:"Lemon Chicken Soup",c:1,cat:"Soup & Chili",u:"https://food52.com/recipes/20618-lemon-chicken-pepe-soup"},
  {n:"Garlicky Whole Wheat Pasta with Hazelnuts",c:1,cat:"Pasta",u:"https://food52.com/recipes/80547-garlicky-whole-wheat-pasta-with-fried-hazelnuts"},
  {n:"Chicken Pot Pie",c:2,cat:"Chicken"},
  {n:"Mediterranean Meatballs with Couscous",c:1,cat:"Beef"},
  {n:"Chicken Fajita Bowl",c:2,cat:"Chicken"},
  {n:"Cottage Cheese Mac & Cheese",c:1,cat:"Pasta"},
  {n:"Cherry Tomato Pasta",c:2,cat:"Pasta"},
  {n:"Chicken Thai Peanut Ramen",c:1,cat:"Asian"},
  {n:"Asian Pulled Pork with Rice",c:1,cat:"Pork"},
  {n:"Japanese Curry with Chicken Cutlets",c:1,cat:"Asian"},
  {n:"Beef Enchiladas with Guac",c:1,cat:"Mexican"},
  {n:"Steak Wraps",c:1,cat:"Beef"},
  {n:"Cold Ramen Noodles with Spicy Pork",c:1,cat:"Pork"},
  {n:"Salmon",c:3,cat:"Seafood"},
  {n:"Fish Tacos",c:2,cat:"Seafood"},
  {n:"Shrimp Stir Fry",c:2,cat:"Seafood"},
  {n:"Chicken Tikka Masala",c:2,cat:"Chicken"},
  {n:"Beef Stew",c:2,cat:"Beef"},
  {n:"Tomato Soup & Grilled Cheese",c:2,cat:"Soup & Chili"},
];

// ── Basic grocery estimates per meal category
const GROCERY_MAP = {
  "Homemade Pizza": ["Pizza dough","Mozzarella","Tomato sauce","Pepperoni","Bell pepper","Olive oil"],
  "Nachos": ["Tortilla chips","Ground beef","Cheese blend","Jalapeños","Sour cream","Avocado","Salsa"],
  "Tacos": ["Tortillas","Ground beef","Lettuce","Tomato","Cheese","Sour cream","Salsa","Lime"],
  "Enchiladas": ["Tortillas","Enchilada sauce","Chicken","Cheese blend","Onion","Sour cream"],
  "Burgers & Fries": ["Ground beef","Burger buns","Lettuce","Tomato","Onion","Cheese","Frozen fries","Ketchup"],
  "Chicken Salad Wraps": ["Chicken breast","Mayo","Celery","Tortillas","Lettuce","Lemon"],
  "Quesadillas": ["Tortillas","Cheese blend","Chicken","Salsa","Sour cream"],
  "Chili": ["Ground beef","Kidney beans","Black beans","Diced tomatoes","Onion","Chili powder","Garlic"],
  "Green Chicken Chili": ["Chicken thighs","Green chilis","Chicken broth","White beans","Jalapeño","Cilantro","Lime","Sour cream"],
  "Fried Chicken": ["Chicken pieces","Flour","Buttermilk","Paprika","Garlic powder","Oil"],
  "Cauliflower Pasta": ["Pasta","Cauliflower","Garlic","Parmesan","Olive oil","Red pepper flakes"],
  "Broccoli Pesto Pasta": ["Pasta","Broccoli","Pesto","Parmesan","Pine nuts","Garlic"],
  "Carbonara": ["Spaghetti","Eggs","Parmesan","Guanciale or bacon","Black pepper"],
  "Ramen": ["Ramen noodles","Chicken broth","Soy sauce","Soft-boiled eggs","Green onions","Sesame oil"],
  "Chicken Shawarma": ["Chicken thighs","Yogurt","Cumin","Paprika","Pita bread","Cucumber","Tomato"],
  "Curry with Rice": ["Curry paste","Coconut milk","Chicken","Rice","Onion","Garlic","Ginger"],
  "Fried Rice": ["Rice","Soy sauce","Eggs","Frozen peas & carrots","Sesame oil","Green onions","Garlic"],
  "Breakfast Burritos": ["Eggs","Tortillas","Cheese","Salsa","Bacon or sausage","Avocado"],
  "Pancakes": ["Flour","Eggs","Milk","Butter","Maple syrup","Baking powder"],
  "Hummus Platter": ["Hummus","Pita bread","Cucumber","Cherry tomatoes","Olives","Feta"],
  "Caesar Salad": ["Romaine lettuce","Parmesan","Croutons","Caesar dressing","Lemon"],
  "Pesto Pasta": ["Pasta","Pesto","Parmesan","Cherry tomatoes","Pine nuts"],
  "French Onion Pasta": ["Pasta","Onions","Butter","Beef broth","Gruyère","Thyme"],
  "Chicken Tinga Tacos": ["Chicken thighs","Chipotle in adobo","Tomatoes","Onion","Tortillas","Avocado","Cilantro"],
  "Burrito Bowl": ["Rice","Black beans","Chicken","Salsa","Cheese","Lettuce","Avocado","Lime"],
  "Beef Tacos": ["Ground beef","Tortillas","Lettuce","Tomato","Cheese","Sour cream","Taco seasoning"],
  "Pulled Pork Tacos": ["Pork shoulder","BBQ sauce","Tortillas","Coleslaw mix","Lime"],
  "Chicken Pot Pie": ["Chicken","Frozen mixed veggies","Chicken broth","Butter","Flour","Pie crust","Heavy cream"],
  "Shepherd's Pie": ["Ground beef","Potatoes","Butter","Frozen peas & carrots","Beef broth","Onion"],
  "Salmon": ["Salmon fillets","Lemon","Garlic","Olive oil","Asparagus or broccoli"],
  "Chicken Fajita Bowl": ["Chicken breast","Bell peppers","Onion","Rice","Salsa","Avocado","Lime","Fajita seasoning"],
  "Steak Salad with Farro": ["Steak","Farro","Mixed greens","Cherry tomatoes","Red onion","Vinaigrette"],
  "Sushi": ["Sushi rice","Nori","Cucumber","Avocado","Soy sauce","Rice vinegar"],
  "Baked Teriyaki Meatballs": ["Ground beef","Teriyaki sauce","Rice","Broccoli","Sesame seeds","Green onions"],
  "Turkey Sandwich": ["Turkey deli meat","Bread","Lettuce","Tomato","Mayo","Cheese"],
  "Tuna Salad Sandwich": ["Canned tuna","Mayo","Celery","Bread","Lettuce"],
  "Roast Beef Sandwich": ["Roast beef deli","Bread","Horseradish","Lettuce","Tomato"],
  "Chicken with Rice": ["Chicken thighs","Rice","Garlic","Chicken broth","Lemon"],
  "Chicken & Rice": ["Chicken thighs","Rice","Garlic","Chicken broth","Lemon"],
  "Egg Casserole": ["Eggs","Cheese","Bell pepper","Onion","Milk","Bread or hash browns"],
  "Chili & Cornbread": ["Ground beef","Kidney beans","Diced tomatoes","Onion","Chili powder","Cornmeal","Butter","Milk","Eggs"],
  "Pasta Salad": ["Pasta","Cherry tomatoes","Cucumber","Olives","Feta","Italian dressing"],
  "Mac & Cheese": ["Elbow pasta","Cheddar","Butter","Milk","Flour","Breadcrumbs"],
  "Cherry Tomato Pasta": ["Pasta","Cherry tomatoes","Garlic","Basil","Parmesan","Olive oil"],
  "Tomato Soup & Grilled Cheese": ["Canned tomatoes","Bread","Butter","Cheddar","Onion","Garlic","Heavy cream"],
  "Beef Stew": ["Beef chuck","Potatoes","Carrots","Onion","Beef broth","Celery","Tomato paste"],
  "Fish Tacos": ["White fish","Tortillas","Cabbage","Lime","Cilantro","Sour cream","Avocado"],
  "Chicken Tikka Masala": ["Chicken thighs","Yogurt","Tomato sauce","Garam masala","Rice","Cream","Garlic","Ginger"],
  "Shrimp Stir Fry": ["Shrimp","Broccoli","Bell pepper","Soy sauce","Rice","Garlic","Ginger","Sesame oil"],
};

const CATEGORIES = ["All","Chicken","Beef","Pork","Seafood","Pasta","Mexican","Asian","Salad","Soup & Chili","Pizza","Sandwich","Breakfast","Other"];
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const CAT_EMOJI = {Chicken:"🍗",Beef:"🥩",Pork:"🐖",Seafood:"🐟",Pasta:"🍝",Mexican:"🌮",Asian:"🥢",Salad:"🥗","Soup & Chili":"🍲",Pizza:"🍕",Sandwich:"🥪",Breakfast:"🍳",Other:"🍽️"};

const DEFAULT_RECIPES = RAW_RECIPES.map((r,i)=>({id:i,name:r.n,count:r.c,category:r.cat,url:r.u||""}));

export default function MealPlanner() {
  const [view, setView] = useState("browse"); // browse | plan | list
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [plan, setPlan] = useState(()=>Object.fromEntries(DAYS.map(d=>[d,{breakfast:"",lunch:"",dinner:""}])));
  const [groceryExtras, setGroceryExtras] = useState([]);
  const [newExtra, setNewExtra] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [removedItems, setRemovedItems] = useState(new Set()); // grocery items removed ("already have it")
  const [assigningSlot, setAssigningSlot] = useState(null); // {day, meal}
  const [showStats, setShowStats] = useState(false);

  // Editable recipe list with persistence
  const [recipes, setRecipes] = useState(DEFAULT_RECIPES);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({name:"",category:"Other",url:"",ingredients:""});
  const [confirmDelete, setConfirmDelete] = useState(null); // recipe id
  const [editingIngredients, setEditingIngredients] = useState(null); // recipe id
  const [editIngredientsText, setEditIngredientsText] = useState("");
  const [fetchingIngredients, setFetchingIngredients] = useState(false); // "form" | recipe id | false

  // Fetch ingredients from a recipe URL using Claude API + web search
  const autoFetchIngredients = useCallback(async (url, target) => {
    // target: "form" to fill the add-recipe form, or a recipe id to fill edit text
    if (!url || !url.startsWith("http")) return;
    setFetchingIngredients(target);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `Go to this recipe URL and extract ONLY the ingredient names (not quantities/measurements). Return them as a simple comma-separated list with nothing else — no intro text, no markdown, no numbering. Just ingredient names separated by commas. Example output: Chicken thighs, Soy sauce, Rice, Garlic, Ginger\n\nURL: ${url}`
          }]
        })
      });
      const data = await response.json();
      // Extract text from response
      const text = (data.content || [])
        .filter(b => b.type === "text")
        .map(b => b.text)
        .join("")
        .trim();
      if (text) {
        // Clean up — remove any markdown or extra whitespace
        const cleaned = text.replace(/```[^`]*```/g, "").replace(/\n/g, ", ").replace(/,\s*,/g, ",").trim();
        if (target === "form") {
          setNewRecipe(r => ({ ...r, ingredients: cleaned }));
        } else {
          setEditIngredientsText(cleaned);
        }
      }
    } catch (e) {
      console.error("Failed to fetch ingredients:", e);
    }
    setFetchingIngredients(false);
  }, []);

  // Load saved recipes from storage on mount
  useEffect(()=>{
    try {
      const saved = localStorage.getItem("meal-planner-recipes");
      if(saved) {
        const parsed = JSON.parse(saved);
        if(Array.isArray(parsed) && parsed.length > 0) {
          setRecipes(parsed);
        }
      }
    } catch(e) { /* no saved data yet, use defaults */ }
    setStorageLoaded(true);
  },[]);

  // Save recipes to storage whenever they change (after initial load)
  useEffect(()=>{
    if(!storageLoaded) return;
    try { localStorage.setItem("meal-planner-recipes", JSON.stringify(recipes)); } catch(e) {}
  },[recipes, storageLoaded]);

  const removeRecipe = useCallback((id)=>{
    setRecipes(prev=>prev.filter(r=>r.id!==id));
    setConfirmDelete(null);
  },[]);

  const addRecipe = useCallback(()=>{
    if(!newRecipe.name.trim()) return;
    const ingredients = newRecipe.ingredients.split(",").map(s=>s.trim()).filter(Boolean);
    setRecipes(prev=>{
      const maxId = prev.reduce((max,r)=>Math.max(max,r.id),0);
      return [...prev, {id:maxId+1, name:newRecipe.name.trim(), count:0, category:newRecipe.category, url:newRecipe.url.trim(), ingredients}];
    });
    setNewRecipe({name:"",category:"Other",url:"",ingredients:""});
    setShowAddForm(false);
  },[newRecipe]);

  const saveIngredients = useCallback((id)=>{
    const ingredients = editIngredientsText.split(",").map(s=>s.trim()).filter(Boolean);
    setRecipes(prev=>prev.map(r=>r.id===id?{...r,ingredients}:r));
    setEditingIngredients(null);
    setEditIngredientsText("");
  },[editIngredientsText]);

  const resetRecipes = useCallback(()=>{
    setRecipes(DEFAULT_RECIPES);
  },[]);

  const filtered = useMemo(()=>{
    let list = recipes;
    if(catFilter!=="All") list = list.filter(r=>r.category===catFilter);
    if(search) {
      const s = search.toLowerCase();
      list = list.filter(r=>r.name.toLowerCase().includes(s));
    }
    return list;
  },[search,catFilter,recipes]);

  const assignMeal = useCallback((recipe)=>{
    if(!assigningSlot) return;
    setPlan(p=>({...p,[assigningSlot.day]:{...p[assigningSlot.day],[assigningSlot.meal]:recipe.name}}));
    setAssigningSlot(null);
    setView("plan");
  },[assigningSlot]);

  const randomizePlan = useCallback(()=>{
    const dinners = recipes.filter(r=>!["Breakfast","Sandwich"].includes(r.category));
    const breakfasts = ["Yogurt & Granola","Pancakes","Egg Casserole","Baked Oats","Protein Pancakes","Breakfast Burritos","Cinnamon Rolls"];
    const lunches = recipes.filter(r=>["Sandwich","Salad"].includes(r.category)||r.name.includes("Wrap"));
    const newPlan = {};
    const usedDinners = new Set();
    DAYS.forEach(day=>{
      let dinner;
      let attempts = 0;
      do { dinner = dinners[Math.floor(Math.random()*dinners.length)]; attempts++; }
      while(usedDinners.has(dinner.id) && attempts < 50);
      usedDinners.add(dinner.id);
      const lunch = lunches.length ? lunches[Math.floor(Math.random()*lunches.length)] : {name:"Turkey Sandwich"};
      newPlan[day] = {
        breakfast: breakfasts[Math.floor(Math.random()*breakfasts.length)],
        lunch: lunch.name,
        dinner: dinner.name
      };
    });
    setPlan(newPlan);
    setCheckedItems({});
  },[recipes]);

  const groceryList = useMemo(()=>{
    const items = {};
    Object.values(plan).forEach(dayPlan=>{
      [dayPlan.breakfast, dayPlan.lunch, dayPlan.dinner].forEach(meal=>{
        if(!meal) return;
        // Check hardcoded map first
        const groceries = GROCERY_MAP[meal];
        if(groceries) {
          groceries.forEach(item=>{ items[item] = (items[item]||0) + 1; });
        }
        // Also check custom ingredients on recipe objects
        const recipeObj = recipes.find(r=>r.name===meal);
        if(recipeObj && recipeObj.ingredients && recipeObj.ingredients.length) {
          recipeObj.ingredients.forEach(item=>{ items[item] = (items[item]||0) + 1; });
        }
      });
    });
    groceryExtras.forEach(item=>{ items[item] = (items[item]||0) + 1; });
    // Remove items the user said they already have
    removedItems.forEach(item=>{ delete items[item]; });
    // Group by aisle
    const aisles = {
      "Produce": ["Lettuce","Tomato","Cherry tomatoes","Onion","Bell pepper","Bell peppers","Garlic","Jalapeño","Jalapeños","Avocado","Cucumber","Celery","Cilantro","Lime","Lemon","Basil","Thyme","Asparagus or broccoli","Broccoli","Cauliflower","Potatoes","Red onion","Romaine lettuce","Mixed greens","Cabbage","Green onions","Ginger","Coleslaw mix","Carrots","Roma Tomatoes","Olives","Pineapple"],
      "Meat & Seafood": ["Ground beef","Chicken breast","Chicken thighs","Chicken pieces","Chicken","Steak","Pork shoulder","Guanciale or bacon","Bacon or sausage","Pepperoni","Turkey deli meat","Roast beef deli","Canned tuna","Salmon fillets","White fish","Shrimp","Pork Chops","Beef chuck"],
      "Dairy & Eggs": ["Eggs","Cheese","Cheese blend","Mozzarella","Parmesan","Cheddar","Feta","Gruyère","Sour cream","Buttermilk","Heavy cream","Cream","Butter","Milk","Half and half","Yogurt","Cottage cheese","Burrata","Soft-boiled eggs","Mayo"],
      "Bread & Bakery": ["Burger buns","Pita bread","Bread","Tortillas","Pizza dough","Croutons","Pie crust","Nori","Cornmeal"],
      "Pantry": ["Tomato sauce","Enchilada sauce","Salsa","Soy sauce","Sesame oil","Olive oil","Rice vinegar","Chipotle in adobo","BBQ sauce","Teriyaki sauce","Pesto","Italian dressing","Vinaigrette","Caesar dressing","Horseradish","Ketchup","Tomato paste","Diced tomatoes","Canned tomatoes","Chicken broth","Beef broth","Coconut milk","Maple syrup","Oil","Hummus","Rice","Farro","Sushi rice","Flour","Baking powder","Breadcrumbs"],
      "Pasta & Grains": ["Pasta","Spaghetti","Elbow pasta","Ramen noodles","Tortilla chips","Couscous"],
      "Frozen": ["Frozen fries","Frozen peas & carrots","Frozen mixed veggies"],
      "Spices": ["Chili powder","Paprika","Garlic powder","Cumin","Garam masala","Taco seasoning","Fajita seasoning","Red pepper flakes","Black pepper","Curry paste"],
      "Nuts & Seeds": ["Pine nuts","Sesame seeds"],
      "Beans": ["Kidney beans","Black beans","White beans"],
    };
    const grouped = {};
    const usedItems = new Set();
    Object.entries(aisles).forEach(([aisle, aisleItems])=>{
      const matches = Object.entries(items).filter(([item])=>aisleItems.some(a=>item.toLowerCase()===a.toLowerCase()));
      if(matches.length) {
        grouped[aisle] = matches.map(([item,count])=>({item,count}));
        matches.forEach(([item])=>usedItems.add(item));
      }
    });
    const uncategorized = Object.entries(items).filter(([item])=>!usedItems.has(item));
    if(uncategorized.length) grouped["Other"] = uncategorized.map(([item,count])=>({item,count}));
    return grouped;
  },[plan, groceryExtras, recipes, removedItems]);

  const totalGroceryItems = Object.values(groceryList).reduce((sum,items)=>sum+items.length,0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const planFilledCount = Object.values(plan).reduce((sum,d)=>sum+(d.dinner?1:0),0);

  return (
    <div style={{fontFamily:"'Instrument Sans', 'DM Sans', system-ui, sans-serif",minHeight:"100vh",background:"#FAF7F2",color:"#2D2A26"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #D4C9B8; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        .fade-up { animation: fadeUp 0.35s ease-out forwards; }
        .slide-in { animation: slideIn 0.25s ease-out forwards; }
        .meal-card { transition: all 0.2s ease; cursor: pointer; }
        .meal-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .tab-btn { transition: all 0.2s ease; }
        .tab-btn:hover { background: #EDEBE6; }
        .slot-btn { transition: all 0.15s ease; }
        .slot-btn:hover { background: #F0EDE7 !important; border-color: #BF6A3A !important; }
        .cat-pill { transition: all 0.15s ease; }
        .cat-pill:hover { transform: scale(1.03); }
        .check-row { transition: all 0.15s ease; }
        .check-row:hover { background: #F5F2EC; }
        input:focus { outline: none; border-color: #BF6A3A; box-shadow: 0 0 0 3px rgba(191,106,58,0.12); }
      `}</style>

      {/* Header */}
      <header style={{background:"linear-gradient(135deg, #3B3129 0%, #5C4A3A 100%)",padding:"28px 24px 24px",color:"#FAF7F2"}}>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div>
              <h1 style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:28,fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.1}}>
                Meal Planner
              </h1>
              <p style={{fontSize:13,opacity:0.65,marginTop:4,fontWeight:400}}>
                {recipes.length} recipes · {216} weeks of history
              </p>
            </div>
            <button onClick={()=>setShowStats(s=>!s)} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,padding:"8px 12px",color:"#FAF7F2",fontSize:12,cursor:"pointer",fontWeight:500}}>
              {showStats ? "✕ Close" : "📊 Stats"}
            </button>
          </div>

          {showStats && (
            <div className="fade-up" style={{background:"rgba(255,255,255,0.08)",borderRadius:12,padding:16,marginBottom:12,display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:12}}>
              {CATEGORIES.filter(c=>c!=="All").map(cat=>{
                const count = recipes.filter(r=>r.category===cat).length;
                if(!count) return null;
                return (
                  <div key={cat} style={{textAlign:"center"}}>
                    <div style={{fontSize:20}}>{CAT_EMOJI[cat]||"🍽️"}</div>
                    <div style={{fontSize:11,opacity:0.7,marginTop:2}}>{cat}</div>
                    <div style={{fontSize:16,fontWeight:600}}>{count}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab Nav */}
          <div style={{display:"flex",gap:4,background:"rgba(0,0,0,0.2)",borderRadius:10,padding:3}}>
            {[["browse","🍳 Browse"],["plan","📅 Plan"],["list","🛒 Grocery List"]].map(([key,label])=>(
              <button key={key} className="tab-btn"
                onClick={()=>{ setView(key); setAssigningSlot(null); }}
                style={{flex:1,padding:"10px 8px",borderRadius:8,border:"none",fontSize:13,fontWeight:600,cursor:"pointer",
                  background:view===key?"#FAF7F2":"transparent",
                  color:view===key?"#3B3129":"rgba(250,247,242,0.7)",
                }}>
                {label}
                {key==="list" && totalGroceryItems > 0 && (
                  <span style={{background:"#BF6A3A",color:"#fff",borderRadius:10,padding:"1px 6px",fontSize:10,marginLeft:5}}>{totalGroceryItems}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{maxWidth:720,margin:"0 auto",padding:"20px 16px 100px"}}>

        {/* ─── BROWSE VIEW ─── */}
        {view === "browse" && (
          <div className="fade-up">
            {assigningSlot && (
              <div className="slide-in" style={{background:"#FFF3E0",border:"1px solid #F0C78A",borderRadius:10,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontSize:13,fontWeight:500,color:"#8B5E3C"}}>
                  Picking <strong>{assigningSlot.meal}</strong> for <strong>{assigningSlot.day}</strong>
                </span>
                <button onClick={()=>{setAssigningSlot(null);setView("plan");}} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#8B5E3C"}}>✕</button>
              </div>
            )}

            {/* Search */}
            <div style={{position:"relative",marginBottom:14}}>
              <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:16,opacity:0.4}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search your meals..."
                style={{width:"100%",padding:"12px 14px 12px 42px",borderRadius:10,border:"1px solid #E0DACE",background:"#fff",fontSize:14,color:"#2D2A26",fontFamily:"inherit"}}
              />
            </div>

            {/* Category filters */}
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {CATEGORIES.map(cat=>(
                <button key={cat} className="cat-pill"
                  onClick={()=>setCatFilter(cat)}
                  style={{padding:"6px 12px",borderRadius:20,border:catFilter===cat?"1.5px solid #BF6A3A":"1px solid #E0DACE",
                    background:catFilter===cat?"#FFF3E0":"#fff",
                    color:catFilter===cat?"#BF6A3A":"#6B6560",fontSize:12,fontWeight:500,cursor:"pointer"}}>
                  {CAT_EMOJI[cat]||""} {cat}
                  {cat!=="All" && <span style={{opacity:0.5,marginLeft:3}}>({recipes.filter(r=>cat==="All"||r.category===cat).length})</span>}
                </button>
              ))}
            </div>

            {/* Add Recipe + Reset buttons */}
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <button onClick={()=>setShowAddForm(f=>!f)}
                style={{padding:"9px 16px",borderRadius:8,background:showAddForm?"#3B3129":"#BF6A3A",color:"#fff",border:"none",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                {showAddForm ? "✕ Cancel" : "＋ Add Recipe"}
              </button>
              <button onClick={resetRecipes}
                style={{padding:"9px 14px",borderRadius:8,background:"#fff",color:"#9B958D",border:"1px solid #E0DACE",fontSize:11,fontWeight:500,cursor:"pointer"}}
                title="Reset to original imported recipes">
                ↻ Reset All
              </button>
            </div>

            {/* Add Recipe Form */}
            {showAddForm && (
              <div className="slide-in" style={{background:"#fff",border:"1px solid #E0DACE",borderRadius:12,padding:16,marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:"#3B3129",marginBottom:12}}>New Recipe</div>
                <div style={{display:"grid",gap:10}}>
                  <input value={newRecipe.name} onChange={e=>setNewRecipe(r=>({...r,name:e.target.value}))}
                    placeholder="Recipe name *"
                    onKeyDown={e=>{if(e.key==="Enter") addRecipe();}}
                    style={{padding:"10px 14px",borderRadius:8,border:"1px solid #E0DACE",fontSize:13,fontFamily:"inherit"}} />
                  <div style={{display:"flex",gap:8}}>
                    <select value={newRecipe.category} onChange={e=>setNewRecipe(r=>({...r,category:e.target.value}))}
                      style={{flex:1,padding:"10px 14px",borderRadius:8,border:"1px solid #E0DACE",fontSize:13,fontFamily:"inherit",background:"#fff",color:"#2D2A26"}}>
                      {CATEGORIES.filter(c=>c!=="All").map(c=>(
                        <option key={c} value={c}>{CAT_EMOJI[c]||""} {c}</option>
                      ))}
                    </select>
                    <input value={newRecipe.url} onChange={e=>setNewRecipe(r=>({...r,url:e.target.value}))}
                      placeholder="Recipe URL (optional)"
                      style={{flex:2,padding:"10px 14px",borderRadius:8,border:"1px solid #E0DACE",fontSize:13,fontFamily:"inherit"}} />
                  </div>
                  <div>
                    <div style={{display:"flex",gap:8,alignItems:"start"}}>
                      <textarea value={newRecipe.ingredients} onChange={e=>setNewRecipe(r=>({...r,ingredients:e.target.value}))}
                        placeholder="Ingredients (comma-separated) e.g. Chicken thighs, Rice, Soy sauce, Garlic, Ginger"
                        rows={2}
                        style={{flex:1,padding:"10px 14px",borderRadius:8,border:"1px solid #E0DACE",fontSize:13,fontFamily:"inherit",resize:"vertical"}} />
                      {newRecipe.url.trim().startsWith("http") && (
                        <button onClick={()=>autoFetchIngredients(newRecipe.url.trim(), "form")}
                          disabled={fetchingIngredients === "form"}
                          style={{padding:"10px 12px",borderRadius:8,border:"1px solid #E0DACE",background:fetchingIngredients==="form"?"#F8F5EF":"#fff",color:"#BF6A3A",fontSize:12,fontWeight:600,cursor:fetchingIngredients==="form"?"wait":"pointer",whiteSpace:"nowrap",flexShrink:0}}>
                          {fetchingIngredients === "form" ? "⏳ Reading…" : "✨ Auto-fill"}
                        </button>
                      )}
                    </div>
                    <div style={{fontSize:11,color:"#9B958D",marginTop:3}}>
                      {newRecipe.url.trim().startsWith("http")
                        ? "Type ingredients or tap Auto-fill to read them from the recipe URL"
                        : "These will auto-populate in your grocery list when this meal is planned"}
                    </div>
                  </div>
                  <button onClick={addRecipe} disabled={!newRecipe.name.trim()}
                    style={{padding:"10px 16px",borderRadius:8,background:newRecipe.name.trim()?"#BF6A3A":"#E0DACE",color:"#fff",border:"none",fontSize:13,fontWeight:600,cursor:newRecipe.name.trim()?"pointer":"default"}}>
                    Add to My Recipes
                  </button>
                </div>
              </div>
            )}

            {/* Results */}
            <div style={{display:"grid",gap:8}}>
              {filtered.map((r,i)=>(
                <div key={r.id} className="meal-card fade-up"
                  style={{background:"#fff",borderRadius:10,padding:"14px 16px",border:"1px solid #EBE7DF",display:"flex",alignItems:"center",gap:12,animationDelay:`${i*0.02}s`}}
                  onClick={()=>assigningSlot && assignMeal(r)}>
                  <div style={{width:38,height:38,borderRadius:8,background:"#F8F5EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                    {CAT_EMOJI[r.category]||"🍽️"}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:14,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.name}</div>
                    <div style={{fontSize:11,color:"#9B958D",marginTop:1}}>
                      {r.category} · made {r.count}×
                      {r.url && " · has recipe link"}
                      {r.ingredients && r.ingredients.length > 0
                        ? ` · ${r.ingredients.length} ingredients`
                        : GROCERY_MAP[r.name]
                          ? ` · ${GROCERY_MAP[r.name].length} ingredients`
                          : ""}
                    </div>
                    {/* Inline ingredient editor */}
                    {editingIngredients === r.id && (
                      <div className="slide-in" style={{marginTop:8}} onClick={e=>e.stopPropagation()}>
                        <textarea value={editIngredientsText} onChange={e=>setEditIngredientsText(e.target.value)}
                          placeholder="Comma-separated, e.g. Chicken, Rice, Soy sauce"
                          rows={2}
                          style={{width:"100%",padding:"8px 10px",borderRadius:6,border:"1px solid #E0DACE",fontSize:12,fontFamily:"inherit",resize:"vertical"}} />
                        <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>
                          <button onClick={()=>saveIngredients(r.id)}
                            style={{padding:"5px 12px",borderRadius:6,background:"#BF6A3A",color:"#fff",border:"none",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                            Save
                          </button>
                          {r.url && (
                            <button onClick={()=>autoFetchIngredients(r.url, r.id)}
                              disabled={fetchingIngredients === r.id}
                              style={{padding:"5px 12px",borderRadius:6,background:fetchingIngredients===r.id?"#F8F5EF":"#fff",border:"1px solid #E0DACE",color:"#BF6A3A",fontSize:11,fontWeight:600,cursor:fetchingIngredients===r.id?"wait":"pointer"}}>
                              {fetchingIngredients === r.id ? "⏳ Reading page…" : "✨ Auto-fill from URL"}
                            </button>
                          )}
                          <button onClick={()=>setEditingIngredients(null)}
                            style={{padding:"5px 12px",borderRadius:6,background:"#E0DACE",color:"#6B6560",border:"none",fontSize:11,fontWeight:500,cursor:"pointer"}}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{display:"flex",gap:6,flexShrink:0,alignItems:"center"}}>
                    {!assigningSlot && editingIngredients !== r.id && (
                      <button onClick={(e)=>{
                        e.stopPropagation();
                        const existing = r.ingredients && r.ingredients.length ? r.ingredients : (GROCERY_MAP[r.name] || []);
                        setEditIngredientsText(existing.join(", "));
                        setEditingIngredients(r.id);
                      }}
                        style={{width:32,height:32,borderRadius:8,border:"1px solid #E0DACE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,cursor:"pointer",background:"#fff",color:"#9B958D"}}
                        title="Edit ingredients">
                        🧾
                      </button>
                    )}
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noreferrer"
                        onClick={e=>e.stopPropagation()}
                        style={{width:32,height:32,borderRadius:8,border:"1px solid #E0DACE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,textDecoration:"none"}}>
                        🔗
                      </a>
                    )}
                    {assigningSlot ? (
                      <button onClick={(e)=>{e.stopPropagation();assignMeal(r);}}
                        style={{padding:"6px 12px",borderRadius:8,background:"#BF6A3A",color:"#fff",border:"none",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                        + Add
                      </button>
                    ) : (
                      <>
                        <button onClick={(e)=>{
                          e.stopPropagation();
                          const emptyDay = DAYS.find(d=>!plan[d].dinner);
                          if(emptyDay) {
                            setPlan(p=>({...p,[emptyDay]:{...p[emptyDay],dinner:r.name}}));
                          }
                        }}
                          style={{width:32,height:32,borderRadius:8,border:"1px solid #E0DACE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,cursor:"pointer",background:"#fff"}}
                          title="Add to next empty dinner slot">
                          ＋
                        </button>
                        {confirmDelete === r.id ? (
                          <div style={{display:"flex",gap:3,alignItems:"center"}} onClick={e=>e.stopPropagation()}>
                            <button onClick={()=>removeRecipe(r.id)}
                              style={{padding:"4px 8px",borderRadius:6,background:"#DC3545",color:"#fff",border:"none",fontSize:10,fontWeight:600,cursor:"pointer"}}>
                              Yes
                            </button>
                            <button onClick={()=>setConfirmDelete(null)}
                              style={{padding:"4px 8px",borderRadius:6,background:"#E0DACE",color:"#6B6560",border:"none",fontSize:10,fontWeight:600,cursor:"pointer"}}>
                              No
                            </button>
                          </div>
                        ) : (
                          <button onClick={(e)=>{e.stopPropagation();setConfirmDelete(r.id);}}
                            style={{width:32,height:32,borderRadius:8,border:"1px solid #E0DACE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,cursor:"pointer",background:"#fff",color:"#C4BEB4"}}
                            title="Remove recipe">
                            ✕
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              {filtered.length===0 && (
                <div style={{textAlign:"center",padding:40,color:"#9B958D",fontSize:14}}>
                  No meals found. Try a different search or category.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── PLAN VIEW ─── */}
        {view === "plan" && (
          <div className="fade-up">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <h2 style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:22,fontWeight:700}}>This Week</h2>
                <p style={{fontSize:12,color:"#9B958D",marginTop:2}}>{planFilledCount}/7 dinners planned</p>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={randomizePlan}
                  style={{padding:"8px 14px",borderRadius:8,background:"#BF6A3A",color:"#fff",border:"none",fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  🎲 Random Week
                </button>
                <button onClick={()=>{ setPlan(Object.fromEntries(DAYS.map(d=>[d,{breakfast:"",lunch:"",dinner:""}]))); setCheckedItems({}); }}
                  style={{padding:"8px 14px",borderRadius:8,background:"#fff",color:"#6B6560",border:"1px solid #E0DACE",fontSize:12,fontWeight:500,cursor:"pointer"}}>
                  Clear
                </button>
              </div>
            </div>

            <div style={{display:"grid",gap:10}}>
              {DAYS.map((day,i)=>(
                <div key={day} className="fade-up" style={{background:"#fff",borderRadius:12,border:"1px solid #EBE7DF",overflow:"hidden",animationDelay:`${i*0.04}s`}}>
                  <div style={{padding:"10px 16px",background:"#F8F5EF",borderBottom:"1px solid #EBE7DF",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:13,fontWeight:700,color:"#3B3129",letterSpacing:"0.02em"}}>{day}</span>
                  </div>
                  <div style={{padding:"8px 12px",display:"grid",gap:4}}>
                    {["breakfast","lunch","dinner"].map(meal=>(
                      <div key={meal} className="slot-btn"
                        onClick={()=>{
                          if(plan[day][meal]) {
                            setPlan(p=>({...p,[day]:{...p[day],[meal]:""}}));
                          } else {
                            setAssigningSlot({day,meal});
                            setView("browse");
                          }
                        }}
                        style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:8,cursor:"pointer",border:"1px solid transparent",background:plan[day][meal]?"#FDFCFA":"#F8F5EF"}}>
                        <span style={{fontSize:10,fontWeight:600,color:"#9B958D",textTransform:"uppercase",width:54,flexShrink:0}}>{meal}</span>
                        {plan[day][meal] ? (
                          <span style={{fontSize:13,fontWeight:500,flex:1}}>{plan[day][meal]}</span>
                        ) : (
                          <span style={{fontSize:12,color:"#C4BEB4",fontStyle:"italic",flex:1}}>tap to add…</span>
                        )}
                        {plan[day][meal] && (
                          <span style={{fontSize:12,color:"#C4BEB4",flexShrink:0}}>✕</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── GROCERY LIST VIEW ─── */}
        {view === "list" && (
          <div className="fade-up">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <h2 style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:22,fontWeight:700}}>Grocery List</h2>
                <p style={{fontSize:12,color:"#9B958D",marginTop:2}}>
                  {checkedCount}/{totalGroceryItems} items checked
                  {removedItems.size > 0 && ` · ${removedItems.size} removed`}
                </p>
              </div>
              <div style={{display:"flex",gap:6}}>
                {removedItems.size > 0 && (
                  <button onClick={()=>setRemovedItems(new Set())}
                    style={{padding:"8px 14px",borderRadius:8,background:"#fff",color:"#BF6A3A",border:"1px solid #E0DACE",fontSize:12,fontWeight:500,cursor:"pointer"}}>
                    ↻ Restore {removedItems.size}
                  </button>
                )}
                <button onClick={()=>setCheckedItems({})}
                  style={{padding:"8px 14px",borderRadius:8,background:"#fff",color:"#6B6560",border:"1px solid #E0DACE",fontSize:12,fontWeight:500,cursor:"pointer"}}>
                  Uncheck All
                </button>
              </div>
            </div>

            {totalGroceryItems === 0 ? (
              <div style={{textAlign:"center",padding:48,color:"#9B958D"}}>
                <div style={{fontSize:40,marginBottom:12}}>🛒</div>
                <p style={{fontSize:14,fontWeight:500}}>No items yet</p>
                <p style={{fontSize:12,marginTop:4}}>Add meals to your plan to auto-generate a grocery list</p>
                <button onClick={()=>setView("plan")}
                  style={{marginTop:16,padding:"10px 20px",borderRadius:8,background:"#BF6A3A",color:"#fff",border:"none",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                  Go to Plan →
                </button>
              </div>
            ) : (
              <div style={{display:"grid",gap:12}}>
                {Object.entries(groceryList).map(([aisle, items])=>(
                  <div key={aisle} className="fade-up" style={{background:"#fff",borderRadius:12,border:"1px solid #EBE7DF",overflow:"hidden"}}>
                    <div style={{padding:"10px 16px",background:"#F8F5EF",borderBottom:"1px solid #EBE7DF"}}>
                      <span style={{fontSize:12,fontWeight:700,color:"#6B6560",textTransform:"uppercase",letterSpacing:"0.05em"}}>{aisle}</span>
                      <span style={{fontSize:11,color:"#9B958D",marginLeft:6}}>({items.length})</span>
                    </div>
                    <div style={{padding:"4px 8px"}}>
                      {items.map(({item,count})=>{
                        const key = `${aisle}-${item}`;
                        const checked = checkedItems[key];
                        return (
                          <div key={key} className="check-row"
                            style={{display:"flex",alignItems:"center",gap:10,padding:"8px 8px",borderRadius:6,cursor:"pointer"}}>
                            <div onClick={()=>setCheckedItems(c=>({...c,[key]:!c[key]}))}
                              style={{width:20,height:20,borderRadius:5,border:checked?"none":"1.5px solid #D4C9B8",
                              background:checked?"#BF6A3A":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
                              {checked && <span style={{color:"#fff",fontSize:13,fontWeight:700}}>✓</span>}
                            </div>
                            <span onClick={()=>setCheckedItems(c=>({...c,[key]:!c[key]}))}
                              style={{fontSize:13,fontWeight:500,flex:1,
                              textDecoration:checked?"line-through":"none",
                              color:checked?"#C4BEB4":"#2D2A26",transition:"all 0.15s"}}>
                              {item}
                            </span>
                            {count > 1 && <span style={{fontSize:11,color:"#9B958D",background:"#F5F2EC",padding:"2px 6px",borderRadius:8}}>×{count}</span>}
                            <button onClick={(e)=>{e.stopPropagation();setRemovedItems(prev=>{const next=new Set(prev);next.add(item);return next;});}}
                              style={{width:24,height:24,borderRadius:6,border:"none",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,cursor:"pointer",color:"#C4BEB4",flexShrink:0,transition:"color 0.15s"}}
                              onMouseEnter={e=>e.currentTarget.style.color="#DC3545"}
                              onMouseLeave={e=>e.currentTarget.style.color="#C4BEB4"}
                              title="Remove — already have it">
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Add extra items */}
                <div style={{background:"#fff",borderRadius:12,border:"1px solid #EBE7DF",padding:16}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#6B6560",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10}}>
                    Add Custom Items
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <input value={newExtra} onChange={e=>setNewExtra(e.target.value)}
                      onKeyDown={e=>{if(e.key==="Enter"&&newExtra.trim()){setGroceryExtras(g=>[...g,newExtra.trim()]);setNewExtra("");}}}
                      placeholder="e.g., Olive oil, Paper towels…"
                      style={{flex:1,padding:"10px 14px",borderRadius:8,border:"1px solid #E0DACE",fontSize:13,fontFamily:"inherit"}}
                    />
                    <button onClick={()=>{if(newExtra.trim()){setGroceryExtras(g=>[...g,newExtra.trim()]);setNewExtra("");}}}
                      style={{padding:"10px 16px",borderRadius:8,background:"#3B3129",color:"#FAF7F2",border:"none",fontSize:13,fontWeight:600,cursor:"pointer"}}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
