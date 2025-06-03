import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Download } from 'lucide-react';
import { getLandingById, updateLanding } from '@/lib/api';
import JSZip from 'jszip';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = () => {
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
            setHtmlContent(landing.html_content || ''); // Устанавливаем HTML-контент
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

  const handleSave = async () => {
    if (isSaving || !id) return;
    
    setIsSaving(true);
    try {
      await updateLanding(id, htmlContent); // Сохраняем HTML-контент
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
    try {
      const zip = new JSZip();
      zip.file("index.html", htmlContent); // Сохраняем HTML-контент в ZIP
      
      const cssContent = `body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }`;
      zip.file("styles.css", cssContent);
      
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
      console.error('Failed to download:', error);
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
          <Button 
            variant="outline" 
            onClick={() => setIsDownloadDialogOpen(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Editing: {pageName}</h1>
        <div className="border rounded-lg overflow-hidden mb-6">
          <Editor
            apiKey='l923grg0fimq6rrtahvgwdph0xscqg0d15nl2osbrl4zzb0y' // Вставьте ваш API ключ здесь
            initialValue={htmlContent} // Устанавливаем начальное значение
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
              ],
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            }}
            onEditorChange={(content, editor) => setHtmlContent(content)} // Обновляем htmlContent при изменении
          />
        </div>
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
