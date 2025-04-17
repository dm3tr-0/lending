
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Layout, Monitor, Download, Edit, Layers } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Index = () => {
  // Example template thumbnails
  const templatePreviews = [
    { id: 1, name: 'Business', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
    { id: 2, name: 'Portfolio', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766' },
    { id: 3, name: 'Store', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance mb-6">
              Create stunning landing pages <br className="hidden md:block" />
              <span className="text-primary">in minutes</span>, not days
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              The easiest way to build beautiful landing pages without writing a single line of code.
              Choose a template, customize it, and get your page online instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=register">
                <Button size="lg" className="gap-2 group btn-hover">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="btn-hover">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Beautiful templates to start with</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templatePreviews.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: template.id * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={`${template.image}?auto=format&fit=crop&w=600&q=80`} 
                    alt={template.name} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{template.name}</h3>
                  <Link to={`/templates/${template.id}`}>
                    <Button variant="ghost" className="gap-2 group p-0">
                      Preview template
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Create your perfect landing page in just three simple steps
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Layout className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Choose a template</h3>
              <p className="text-muted-foreground">
                Select from our professionally designed templates that fit your needs.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Edit className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Customize content</h3>
              <p className="text-muted-foreground">
                Edit text, upload images, and adjust colors to match your brand.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-6">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Download & publish</h3>
              <p className="text-muted-foreground">
                Get your landing page files ready for hosting or publish directly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to create your landing page?</h2>
          <p className="text-muted-foreground mb-10">
            Join thousands of users who create beautiful landing pages without coding.
          </p>
          <Link to="/auth?mode=register">
            <Button size="lg" className="gap-2 group btn-hover">
              Get Started For Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="font-bold text-xl">LandCraft</span>
              <p className="text-sm text-muted-foreground mt-2">
                © {new Date().getFullYear()} LandCraft. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground">
                Templates
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
