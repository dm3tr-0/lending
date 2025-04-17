
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, DownloadCloud, Image, Palette, PanelLeft, PanelRight, Type, Layout, Layers, Eye } from 'lucide-react';

interface EditorSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onPreview: () => void;
  onDownload: () => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onPreview,
  onDownload
}) => {
  return (
    <div 
      className={`bg-card border-r border-border h-screen fixed top-0 left-0 flex flex-col z-30 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && <span className="font-bold">Editor</span>}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onToggleCollapse}
          className={isCollapsed ? 'mx-auto' : ''}
        >
          {isCollapsed ? <PanelRight size={20} /> : <PanelLeft size={20} />}
        </Button>
      </div>
      
      {isCollapsed ? (
        <div className="flex flex-col items-center py-4 space-y-6">
          <Button variant="ghost" size="icon" title="Text">
            <Type size={20} />
          </Button>
          <Button variant="ghost" size="icon" title="Media">
            <Image size={20} />
          </Button>
          <Button variant="ghost" size="icon" title="Layout">
            <Layout size={20} />
          </Button>
          <Button variant="ghost" size="icon" title="Styles">
            <Palette size={20} />
          </Button>
          <Button variant="ghost" size="icon" title="Layers">
            <Layers size={20} />
          </Button>
          
          <Separator className="my-4" />
          
          <Button 
            variant="outline" 
            size="icon" 
            title="Preview"
            onClick={onPreview}
          >
            <Eye size={20} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            title="Download"
            onClick={onDownload}
          >
            <DownloadCloud size={20} />
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="text">
            <TabsList className="w-full grid grid-cols-5 mb-4">
              <TabsTrigger value="text">
                <Type size={18} />
              </TabsTrigger>
              <TabsTrigger value="media">
                <Image size={18} />
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout size={18} />
              </TabsTrigger>
              <TabsTrigger value="styles">
                <Palette size={18} />
              </TabsTrigger>
              <TabsTrigger value="layers">
                <Layers size={18} />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="px-4 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="heading">Heading</Label>
                <Textarea 
                  id="heading" 
                  placeholder="Enter your heading"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subheading">Subheading</Label>
                <Textarea 
                  id="subheading" 
                  placeholder="Enter your subheading"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body-text">Body Text</Label>
                <Textarea 
                  id="body-text" 
                  placeholder="Enter your main content"
                  rows={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="button-text">Button Text</Label>
                <Input 
                  id="button-text" 
                  placeholder="Enter button text"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="media" className="px-4 space-y-6">
              <div className="space-y-4">
                <Label>Logo</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Image className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or SVG, max 2MB
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Hero Image</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Image className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 1600x900px
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="styles" className="px-4 space-y-6">
              <div className="space-y-4">
                <Label>Background Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  {['#FFFFFF', '#F3F4F6', '#111827', '#3B82F6', '#10B981', '#F59E0B'].map((color) => (
                    <div 
                      key={color}
                      className="w-full aspect-square rounded-md cursor-pointer ring-offset-2 hover:ring-2 hover:ring-primary transition-all"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size</Label>
                  <span className="text-xs text-muted-foreground">16px</span>
                </div>
                <Slider defaultValue={[16]} max={32} min={12} step={1} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="playfair">Playfair Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="button-style">Button Style</Label>
                <Select defaultValue="filled">
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="filled">Filled</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="rounded-corners">Rounded Corners</Label>
                <Switch id="rounded-corners" defaultChecked />
              </div>
            </TabsContent>
            
            <TabsContent value="layout" className="px-4 space-y-6">
              <div className="space-y-2">
                <Label>Layout Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="w-full h-20 bg-muted/50 rounded mb-2 flex flex-col">
                      <div className="h-1/3 bg-muted rounded-t" />
                      <div className="flex-1 p-1 flex flex-col justify-center items-center">
                        <div className="w-3/4 h-1 bg-muted rounded mb-1" />
                        <div className="w-1/2 h-1 bg-muted rounded" />
                      </div>
                    </div>
                    <span className="text-xs">Hero Top</span>
                  </div>
                  
                  <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="w-full h-20 bg-muted/50 rounded mb-2 flex">
                      <div className="w-1/2 p-1 flex flex-col justify-center items-center">
                        <div className="w-3/4 h-1 bg-muted rounded mb-1" />
                        <div className="w-1/2 h-1 bg-muted rounded" />
                      </div>
                      <div className="w-1/2 bg-muted" />
                    </div>
                    <span className="text-xs">Hero Split</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Spacing</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Section Padding</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">S</Button>
                    <Button variant="default" size="sm">M</Button>
                    <Button variant="outline" size="sm">L</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content-width">Content Width</Label>
                  <span className="text-xs text-muted-foreground">1200px</span>
                </div>
                <Slider defaultValue={[1200]} max={1600} min={800} step={50} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="full-width">Full Width Hero</Label>
                <Switch id="full-width" defaultChecked />
              </div>
            </TabsContent>
            
            <TabsContent value="layers" className="px-4 space-y-4">
              <div className="bg-muted/30 rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Header</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-primary/10 rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium">Hero Section</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Features</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Testimonials</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">CTA</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-md p-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Footer</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full gap-2 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Add New Section</span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {!isCollapsed && (
        <div className="border-t p-4 flex justify-between gap-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onPreview}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            className="flex-1"
            onClick={onDownload}
          >
            <DownloadCloud className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditorSidebar;
