
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Plus, MoreVertical, Edit, Trash2, FileDown, ExternalLink, LogOut, Settings, User } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Mock data for landing pages
interface LandingPage {
  id: number;
  name: string;
  template: string;
  lastEdited: string;
  thumbnail: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [newPageName, setNewPageName] = useState('');
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    if (!auth) {
      navigate('/auth?mode=login');
      return;
    }
    setIsAuthenticated(auth);

    // Load mock landing pages
    const mockPages: LandingPage[] = [
      {
        id: 1,
        name: 'My Business Page',
        template: 'Business',
        lastEdited: '2 days ago',
        thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 2,
        name: 'Portfolio Site',
        template: 'Portfolio',
        lastEdited: 'Yesterday',
        thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    setLandingPages(mockPages);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleCreateLandingPage = () => {
    if (!newPageName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your landing page.",
        variant: "destructive",
      });
      return;
    }

    const newPage: LandingPage = {
      id: landingPages.length + 1,
      name: newPageName,
      template: 'Blank',
      lastEdited: 'Just now',
      thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80'
    };

    setLandingPages([...landingPages, newPage]);
    setNewPageName('');
    setIsDialogOpen(false);
    
    // Redirect to template selection
    navigate('/templates');
    
    toast({
      title: "Landing page created",
      description: "Your new landing page has been created successfully.",
    });
  };

  const handleDeleteLandingPage = (id: number) => {
    setIsDeleting(id);
    // Simulate API call
    setTimeout(() => {
      const updatedPages = landingPages.filter(page => page.id !== id);
      setLandingPages(updatedPages);
      setIsDeleting(null);
      toast({
        title: "Landing page deleted",
        description: "Your landing page has been deleted successfully.",
      });
    }, 600);
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Landing Pages</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your landing pages
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem className="cursor-pointer text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-1 btn-hover">
                  <Plus className="h-4 w-4" />
                  New Landing Page
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new landing page</DialogTitle>
                  <DialogDescription>
                    Name your landing page and get started with the editor.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Page name</Label>
                    <Input 
                      id="name" 
                      placeholder="My Landing Page" 
                      value={newPageName}
                      onChange={(e) => setNewPageName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateLandingPage}>
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {landingPages.length === 0 ? (
          <Card className="text-center p-12">
            <div className="mx-auto max-w-md space-y-4">
              <h3 className="text-xl font-semibold">No landing pages yet</h3>
              <p className="text-muted-foreground">
                Create your first landing page to get started with the editor.
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="mt-4 btn-hover"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Landing Page
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((page) => (
              <Card key={page.id} className="overflow-hidden group">
                <div className="h-40 overflow-hidden bg-muted">
                  <img 
                    src={page.thumbnail} 
                    alt={page.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{page.name}</CardTitle>
                      <CardDescription>
                        {page.template} • Edited {page.lastEdited}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate(`/editor/${page.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <FileDown className="mr-2 h-4 w-4" />
                          <span>Download</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </DropdownMenuItem>
                        <Separator className="my-1" />
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive"
                          onClick={() => handleDeleteLandingPage(page.id)}
                          disabled={isDeleting === page.id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>{isDeleting === page.id ? "Deleting..." : "Delete"}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                </CardContent>
                <CardFooter className="border-t bg-card/50 p-2">
                  <div className="flex justify-between w-full">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => navigate(`/templates/${page.id}`)}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Preview
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => navigate(`/editor/${page.id}`)}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {/* Add new page card */}
            <Card 
              className="flex items-center justify-center cursor-pointer h-full border-dashed transition-all hover:border-primary/50 hover:bg-primary/5"
              onClick={() => setIsDialogOpen(true)}
            >
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium">Create New Landing Page</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
