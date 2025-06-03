import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TemplateCard from '@/components/TemplateCard';
import { getActiveTemplates } from '@/lib/api';
import { auth } from '@/lib/firebase';
import { createLanding } from '@/lib/api';

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  category: string;
  features: string[];
}

const TemplateSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [pageName, setPageName] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const templatesData = await getActiveTemplates();
        setTemplates(templatesData.map((t: any) => ({
          ...t,
          features: t.features || []
        })));
      } catch (error) {
        console.error('Failed to load templates:', error);
        toast({
          title: "Error",
          description: "Failed to load templates",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
    
    // Set page name from state if coming from dashboard
    if (location.state?.pageName) {
      setPageName(location.state.pageName);
    }
  }, [toast, location]);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || template.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
  };

  const handleContinue = async () => {
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

    try {
	 const userId = localStorage.getItem('userId');
    if (userId) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (!template) throw new Error("Template not found");
      
      // Получаем полные данные шаблона
      const response = await fetch(`http://localhost:5000/api/gettemplate/${selectedTemplate}`);
      const fullTemplate = await response.json();
      
      const landingId = await createLanding(
        userId,
        selectedTemplate,
        pageName,
        fullTemplate.html_content // Используем HTML из шаблона
      );
        
        toast({
          title: "Template selected",
          description: "You'll now be redirected to the editor.",
        });
        
        navigate(`/editor/${landingId}`);
      }
    } catch (error) {
      console.error('Failed to create landing:', error);
      toast({
        title: "Error",
        description: "Failed to create landing page",
        variant: "destructive",
      });
    }
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
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading templates...</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  name={template.name}
                  description={template.description}
                  image={template.thumbnail_url}
                  features={template.features}
                  isSelected={selectedTemplate === template.id}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">
                    Template selected: {selectedTemplate ? templates.find(t => t.id === selectedTemplate)?.name || 'None' : 'None'}
                  </h3>
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
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateSelection;