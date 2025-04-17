
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight } from 'lucide-react';

export interface TemplateProps {
  id: number;
  name: string;
  description: string;
  image: string;
  features: string[];
  isSelected?: boolean;
  onSelect?: (id: number) => void;
}

const TemplateCard: React.FC<TemplateProps> = ({
  id,
  name,
  description,
  image,
  features,
  isSelected,
  onSelect,
}) => {
  return (
    <Card className={`overflow-hidden transition-all duration-200 h-full flex flex-col ${
      isSelected ? 'ring-2 ring-primary/70 shadow-lg' : 'hover:shadow-md'
    }`}>
      <div className="relative h-48 overflow-hidden bg-muted">
        <img 
          src={`${image}?auto=format&fit=crop&w=800&q=80`}
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="bg-primary text-white rounded-full p-2">
              <Check className="h-6 w-6" />
            </div>
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        {onSelect ? (
          <Button
            className="w-full btn-hover"
            onClick={() => onSelect(id)}
            variant={isSelected ? "default" : "outline"}
          >
            {isSelected ? "Selected" : "Use this template"}
          </Button>
        ) : (
          <Link to={`/editor/${id}`} className="w-full">
            <Button className="w-full gap-2 group btn-hover">
              Customize
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
