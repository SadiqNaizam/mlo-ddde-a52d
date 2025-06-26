import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  slug: string;
  title: string;
  imageUrl: string;
  prepTime: number; // in minutes
}

const RecipeCard: React.FC<RecipeCardProps> = ({ slug, title, imageUrl, prepTime }) => {
  console.log('RecipeCard loaded for:', title);

  return (
    <Link to={`/recipe-management/${slug}`} className="group block">
      <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-2">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Artisan+Bread'}
              alt={`Image of ${title}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold tracking-tight line-clamp-2">
            {title}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{prepTime} min prep time</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;