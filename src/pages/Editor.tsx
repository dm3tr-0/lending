import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Download, Undo, Redo, Monitor, Tablet, Smartphone } from 'lucide-react';
import EditorSidebar from '@/components/EditorSidebar';
import { auth } from '@/lib/firebase';
import { getLandingById, updateLanding } from '@/lib/api';
import JSZip from 'jszip';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [pageName, setPageName] = useState('My Landing Page');

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        navigate('/auth?mode=login');
        return;
      }
      await loadLanding();
    };

    checkAuth();
  }, [id, navigate]);

  const loadLanding = async () => {
    try {
      if (id) {
        const landing = await getLandingById(id);
        if (landing) {
          setHtmlContent(landing.html_content);
          setPageName(landing.name);
        } else {
          toast({
            title: "Landing not found",
            description: "The requested landing page could not be found.",
            variant: "destructive",
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Failed to load landing:', error);
      toast({
        title: "Error",
        description: "Failed to load landing page",
        variant: "destructive",
      });
      navigate('/dashboard');
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleDownload = () => {
    setIsDownloadDialogOpen(true);
  };

  const performDownload = async () => {
    setIsDownloadDialogOpen(false);
    
    try {
      // Create ZIP archive
      const zip = new JSZip();
      zip.file("index.html", htmlContent);
      
      // Add CSS file (example)
      const cssContent = `/* Add your custom CSS here */\nbody { font-family: Arial, sans-serif; }`;
      zip.file("styles.css", cssContent);
      
      // Generate ZIP file
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      
      // Create download link
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pageName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download complete",
        description: "Your landing page has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Failed to download:', error);
      toast({
        title: "Error",
        description: "Failed to download your landing page",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (isSaving || !id) return;
    
    setIsSaving(true);
    try {
      await updateLanding(id, htmlContent);
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to save landing:', error);
      toast({
        title: "Error",
        description: "Failed to save landing page",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getViewportClass = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'w-[375px]';
      case 'tablet':
        return 'w-[768px]';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Editor Sidebar */}
      <EditorSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar}
        onPreview={handlePreview}
        onDownload={handleDownload}
      />
      
      {/* Main content */}
      <div 
        className={`min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-80'
        }`}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-background border-b p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">
              Editing: {pageName}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="border rounded-md flex items-center">
              <Button 
                variant={viewportSize === 'desktop' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewportSize('desktop')}
                className="rounded-r-none h-9"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewportSize === 'tablet' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewportSize('tablet')}
                className="rounded-none border-x h-9"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewportSize === 'mobile' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewportSize('mobile')}
                className="rounded-l-none h-9"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Redo className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
        
        {/* Editor/Preview area */}
        <div className="p-6">
          <div className="flex flex-col h-[calc(100vh-8rem)]">
            {!isPreviewMode && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">HTML Content</label>
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full h-40 p-3 border rounded-md font-mono text-sm"
                  placeholder="Enter your HTML content here..."
                />
              </div>
            )}
            
            <div className={`flex-grow mx-auto transition-all duration-300 ${getViewportClass()}`}>
              <div className="bg-white overflow-y-auto rounded-md shadow h-full">
                {isPreviewMode ? (
                  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                ) : (
                  <div className="p-4 text-gray-500 italic">
                    Preview will appear here. Toggle preview mode to see changes.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Download dialog */}
      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Your Landing Page</DialogTitle>
            <DialogDescription>
              Your landing page will be downloaded as a ZIP file containing all necessary files.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              The downloaded package includes:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Complete HTML file with your content</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>CSS stylesheet for styling</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Simple deployment instructions</span>
              </li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDownloadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={performDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download ZIP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;