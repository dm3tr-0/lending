import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getAllUsers, getAllTemplates, createTemplate, updateTemplate } from '@/lib/api';

const Admin = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    html_content: '',
    thumbnail_url: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, templatesData] = await Promise.all([
          getAllUsers(),
          getAllTemplates()
        ]);
        setUsers(usersData);
        setTemplates(templatesData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
        toast({
          title: "Error",
          description: "Failed to load admin data",
          variant: "destructive",
        });
      }
    };
    
    loadData();
  }, [toast]);

  const handleCreateTemplate = async () => {
    try {
      await createTemplate(
        newTemplate.name,
        newTemplate.description,
        newTemplate.html_content,
        newTemplate.thumbnail_url
      );
      
      const updatedTemplates = await getAllTemplates();
      setTemplates(updatedTemplates);
      setIsDialogOpen(false);
      setNewTemplate({
        name: '',
        description: '',
        html_content: '',
        thumbnail_url: ''
      });
      
      toast({
        title: "Template created",
        description: "New template has been created successfully.",
      });
    } catch (error) {
      console.error('Failed to create template:', error);
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive",
      });
    }
  };

  const handleToggleTemplate = async (templateId: string, isActive: boolean) => {
    try {
      await updateTemplate(templateId, !isActive);
      const updatedTemplates = await getAllTemplates();
      setTemplates(updatedTemplates);
      
      toast({
        title: "Template updated",
        description: `Template has been ${isActive ? 'deactivated' : 'activated'}.`,
      });
    } catch (error) {
      console.error('Failed to update template:', error);
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-24">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Users</h2>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Templates</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Template
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Template</DialogTitle>
                    <DialogDescription>
                      Add a new template to the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Template Name</Label>
                      <Input 
                        id="name" 
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input 
                        id="description" 
                        value={newTemplate.description}
                        onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="thumbnail">Thumbnail URL</Label>
                      <Input 
                        id="thumbnail" 
                        value={newTemplate.thumbnail_url}
                        onChange={(e) => setNewTemplate({...newTemplate, thumbnail_url: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">HTML Content</Label>
                      <textarea
                        id="content"
                        className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={newTemplate.html_content}
                        onChange={(e) => setNewTemplate({...newTemplate, html_content: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTemplate}>
                      Create Template
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.description}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          template.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {template.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleToggleTemplate(template.id, template.is_active)}
                          >
                            {template.is_active ? (
                              <Trash2 className="h-4 w-4 text-red-600" />
                            ) : (
                              <Edit className="h-4 w-4 text-blue-600" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;