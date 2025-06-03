// Editor.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Download } from 'lucide-react';
import { getLandingById, updateLanding } from '@/lib/api';
import JSZip from 'jszip';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage';

const EditorComponent = () => {
  const editorRef = useRef<any>(null);
  const containerRef = useRef(null);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [htmlContent, setHtmlContent] = useState('');
  const [pageName, setPageName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

  useEffect(() => {
    const loadLanding = async () => {
      try {
        if (id) {
          const landing = await getLandingById(id);
          if (landing) {
            setHtmlContent(landing.html_content || '');
            setPageName(landing.name);
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

    loadLanding();
  }, [id, navigate, toast]);

  useEffect(() => {
    if (htmlContent && !editorLoaded && containerRef.current) {
      const editor = grapesjs.init({
        container: containerRef.current,
        fromElement: false,
        height: '100vh',
        width: 'auto',
        plugins: ['gjs-preset-webpage'],
        pluginsOpts: {
          'gjs-preset-webpage': {}
        },
        storageManager: false,
      });

      editor.setComponents(htmlContent); // загрузка HTML из БД
      editorRef.current = editor;
      setEditorLoaded(true);
    }
  }, [htmlContent, editorLoaded]);

  const handleSave = async () => {
    if (isSaving || !id || !editorRef.current) return;

    setIsSaving(true);
    try {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
</body>
</html>`;

      await updateLanding(id, fullHtml);
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

  const performDownload = async () => {
    if (!editorRef.current) return;

    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();

    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
</body>
</html>`;

    try {
      const zip = new JSZip();
      zip.file("index.html", fullHtml);
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);

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
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download your landing page",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background border-b p-4 flex justify-between items-center">
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setIsDownloadDialogOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="h-[calc(100vh-70px)]">
        <div ref={containerRef} />
      </div>

      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Landing Page</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDownloadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={performDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download ZIP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorComponent;
