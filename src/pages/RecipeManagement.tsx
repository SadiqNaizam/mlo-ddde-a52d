import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';
import RecipeCard from '@/components/RecipeCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

// Icons
import { PlusCircle, Search } from 'lucide-react';

// Placeholder data for recipes
const initialRecipes = [
  {
    slug: 'classic-sourdough-loaf',
    title: 'Classic Sourdough Loaf',
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=800',
    prepTime: 240,
  },
  {
    slug: 'flaky-croissants',
    title: 'Flaky Butter Croissants',
    imageUrl: 'https://images.unsplash.com/photo-1555949258-a2aa4d4e9219?q=80&w=800',
    prepTime: 180,
  },
  {
    slug: 'whole-wheat-boule',
    title: 'Artisan Whole Wheat Boule',
    imageUrl: 'https://images.unsplash.com/photo-1533089860892-27fb63e26082?q=80&w=800',
    prepTime: 150,
  },
  {
    slug: 'cinnamon-raisin-bagels',
    title: 'Cinnamon Raisin Bagels',
    imageUrl: 'https://images.unsplash.com/photo-1597697241253-154b7e887f89?q=80&w=800',
    prepTime: 90,
  },
  {
    slug: 'chocolate-chip-cookies',
    title: 'Gooey Chocolate Chip Cookies',
    imageUrl: 'https://images.unsplash.com/photo-1598188198942-***REMOVED***-033169877b08?q=80&w=800',
    prepTime: 30,
  },
  {
    slug: 'blueberry-muffins',
    title: 'Bakery-Style Blueberry Muffins',
    imageUrl: 'https://images.unsplash.com/photo-1579584393943-4c9f186ac94a?q=80&w=800',
    prepTime: 45,
  },
];

// Form Schema for Zod validation
const recipeFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  prepTime: z.coerce.number().int().positive({ message: 'Prep time must be a positive number.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
});

const RecipeManagement = () => {
  console.log('RecipeManagement page loaded');
  const [recipes, setRecipes] = useState(initialRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recipeFormSchema>>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: '',
      prepTime: 0,
      imageUrl: '',
    },
  });

  const handleAddRecipe = (values: z.infer<typeof recipeFormSchema>) => {
    const newRecipe = {
      slug: values.title.toLowerCase().replace(/\s+/g, '-'),
      ...values,
    };
    setRecipes([newRecipe, ...recipes]);
    toast({
      title: 'Recipe Added!',
      description: `"${values.title}" has been added to your collection.`,
    });
    form.reset();
    setIsDialogOpen(false);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-20"> {/* Adjusted padding for collapsed sidebar */}
        <AppHeader />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:p-8 md:pt-20">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Recipe Management</h1>
              <p className="text-muted-foreground">Browse, search, and add new recipes to your collection.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search recipes..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Recipe
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add a New Recipe</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a new recipe to your collection.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddRecipe)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipe Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Classic Sourdough" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="prepTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prep Time (minutes)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g., 240" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Save Recipe</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Recipe Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} {...recipe} />
            ))}
          </div>
          {filteredRecipes.length === 0 && (
             <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground">No recipes found matching your search.</p>
             </div>
          )}
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default RecipeManagement;