
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TemplateCard from '@/components/TemplateCard';

// Mock template data
const templates = [
  {
    id: 1,
    name: "Business",
    description: "Perfect for company websites and professional services",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094",
    category: "business",
    features: [
      "Professional layout",
      "About section",
      "Services showcase",
      "Contact form",
      "Responsive design"
    ]
  },
  {
    id: 2,
    name: "Portfolio",
    description: "Showcase your work and highlight your skills",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    category: "portfolio",
    features: [
      "Project gallery",
      "Bio section",
      "Skills display",
      "Work history",
      "Contact information"
    ]
  },
  {
    id: 3,
    name: "Store",
    description: "Display your products with a clean, modern design",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    category: "ecommerce",
    features: [
      "Product showcase",
      "Feature highlights",
      "Pricing section",
      "Call-to-action buttons",
      "Testimonials"
    ]
  },
  {
    id: 4,
    name: "Startup",
    description: "Launch your startup with an impactful landing page",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
    category: "business",
    features: [
      "Hero section",
      "Feature highlights",
      "Pricing tiers",
      "Team showcase",
      "Newsletter signup"
    ]
  },
  {
    id: 5,
    name: "Personal",
    description: "A simple personal website for individuals",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    category: "personal",
    features: [
      "Clean bio",
      "Social links",
      "Blog section",
      "Contact form",
      "Minimalist design"
    ]
  }
];

const TemplateSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [pageName, setPageName] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || template.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (id: number) => {
    setSelectedTemplate(id);
  };

  const handleContinue = () => {
    if (!selectedTemplate) {
      toast({
        title: "No template selected",
        description: "Please select a template to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!pageName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your landing page.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would create the page in the backend here
    toast({
      title: "Template selected",
      description: "You'll now be redirected to the editor.",
    });
    
    // For MVP, simulate creating a page and redirect to editor
    navigate(`/editor/${selectedTemplate}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-24">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Choose a Template</h1>
            <p className="text-muted-foreground">
              Select a template to start building your landing page
            </p>
          </div>
        </div>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs value={category} onValueChange={setCategory} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="ecommerce">Store</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                image={template.image}
                features={template.features}
                isSelected={selectedTemplate === template.id}
                onSelect={handleSelectTemplate}
              />
            ))}
          </div>
        )}
        
        <div className="bg-secondary/50 rounded-lg p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Template selected: {selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.name || 'None' : 'None'}</h3>
              <div className="flex items-center space-x-4">
                <div>
                  <Label htmlFor="page-name" className="text-sm">Landing page name</Label>
                  <Input
                    id="page-name"
                    placeholder="My Landing Page"
                    className="max-w-xs mt-1"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <Button 
              size="lg"
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className="gap-2 group btn-hover"
            >
              Continue to Editor
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
