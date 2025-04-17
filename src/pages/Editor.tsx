
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Download, Undo, Redo, Monitor, Tablet, Smartphone } from 'lucide-react';
import EditorSidebar from '@/components/EditorSidebar';

const templateData = {
  1: {
    name: "Business",
    content: `
      <div style="font-family: 'Inter', sans-serif;">
        <header style="background-color: #ffffff; padding: 20px 0; border-bottom: 1px solid #f3f4f6;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: bold; font-size: 24px;">YourBrand</div>
            <nav>
              <ul style="display: flex; gap: 24px; list-style: none; margin: 0; padding: 0;">
                <li><a href="#" style="text-decoration: none; color: #111827;">Home</a></li>
                <li><a href="#" style="text-decoration: none; color: #111827;">Services</a></li>
                <li><a href="#" style="text-decoration: none; color: #111827;">About</a></li>
                <li><a href="#" style="text-decoration: none; color: #111827;">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <section style="background-color: #f9fafb; padding: 80px 0;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; gap: 60px;">
            <div style="flex: 1;">
              <h1 style="font-size: 48px; font-weight: 800; margin-bottom: 24px; color: #111827; line-height: 1.1;">Modern solutions for your business</h1>
              <p style="font-size: 18px; color: #4b5563; margin-bottom: 32px; line-height: 1.5;">We help companies like yours grow and succeed in today's digital landscape with cutting-edge strategies and proven results.</p>
              <div style="display: flex; gap: 16px;">
                <a href="#" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">Get Started</a>
                <a href="#" style="display: inline-block; border: 1px solid #d1d5db; color: #111827; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">Learn More</a>
              </div>
            </div>
            <div style="flex: 1;">
              <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=700&q=80" alt="Business team" style="width: 100%; border-radius: 8px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);" />
            </div>
          </div>
        </section>

        <section style="padding: 80px 0; background-color: white;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
            <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 16px; color: #111827;">Our Services</h2>
            <p style="font-size: 18px; color: #4b5563; margin-bottom: 64px; max-width: 700px; margin-left: auto; margin-right: auto;">We offer a full range of services to help businesses grow and thrive in today's competitive market.</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
              <div style="padding: 32px; border-radius: 8px; border: 1px solid #f3f4f6; transition: transform 0.2s;">
                <div style="width: 64px; height: 64px; background-color: #ebf5ff; border-radius: 12px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
                </div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #111827;">Strategy & Planning</h3>
                <p style="color: #4b5563; line-height: 1.5;">Develop effective business strategies to achieve your goals and stay ahead of competition.</p>
              </div>
              
              <div style="padding: 32px; border-radius: 8px; border: 1px solid #f3f4f6; transition: transform 0.2s;">
                <div style="width: 64px; height: 64px; background-color: #ebf5ff; border-radius: 12px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #111827;">Customer Relations</h3>
                <p style="color: #4b5563; line-height: 1.5;">Build lasting relationships with your customers through personalized communication.</p>
              </div>
              
              <div style="padding: 32px; border-radius: 8px; border: 1px solid #f3f4f6; transition: transform 0.2s;">
                <div style="width: 64px; height: 64px; background-color: #ebf5ff; border-radius: 12px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #111827;">Analytics & Insights</h3>
                <p style="color: #4b5563; line-height: 1.5;">Leverage data-driven insights to make informed decisions and optimize performance.</p>
              </div>
            </div>
          </div>
        </section>

        <section style="background-color: #f9fafb; padding: 80px 0;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
            <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 24px; color: #111827;">Ready to grow your business?</h2>
            <p style="font-size: 18px; color: #4b5563; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">Join hundreds of satisfied clients who have transformed their business with our services.</p>
            <a href="#" style="display: inline-block; background-color: #3b82f6; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 18px;">Contact Us Today</a>
          </div>
        </section>

        <footer style="background-color: #111827; color: white; padding: 64px 0 32px;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; margin-bottom: 64px;">
              <div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">YourBrand</h3>
                <p style="color: #9ca3af; line-height: 1.5;">Helping businesses grow and succeed since 2010. Our mission is to provide effective solutions for modern challenges.</p>
              </div>
              
              <div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Services</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Strategy & Planning</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Customer Relations</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Analytics & Insights</a></li>
                  <li><a href="#" style="color: #9ca3af; text-decoration: none;">Marketing</a></li>
                </ul>
              </div>
              
              <div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Company</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">About Us</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Careers</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Blog</a></li>
                  <li><a href="#" style="color: #9ca3af; text-decoration: none;">Press</a></li>
                </ul>
              </div>
              
              <div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Contact</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 12px; color: #9ca3af;">123 Business St.</li>
                  <li style="margin-bottom: 12px; color: #9ca3af;">City, State 12345</li>
                  <li style="margin-bottom: 12px; color: #9ca3af;">info@yourbrand.com</li>
                  <li style="color: #9ca3af;">(123) 456-7890</li>
                </ul>
              </div>
            </div>
            
            <div style="border-top: 1px solid #374151; padding-top: 32px; display: flex; justify-content: space-between; align-items: center;">
              <p style="color: #9ca3af; font-size: 14px;">© 2023 YourBrand. All rights reserved.</p>
              <div style="display: flex; gap: 16px;">
                <a href="#" style="color: #9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#" style="color: #9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#" style="color: #9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                <a href="#" style="color: #9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    `,
  },
  2: {
    name: "Portfolio",
    content: `
      <div style="font-family: 'Inter', sans-serif;">
        <header style="padding: 30px 0; background-color: #ffffff;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
            <a href="#" style="font-size: 24px; font-weight: 700; color: #000000; text-decoration: none;">John Doe</a>
            <nav>
              <ul style="display: flex; gap: 32px; list-style: none; margin: 0; padding: 0;">
                <li><a href="#" style="text-decoration: none; color: #000000; font-weight: 500;">Home</a></li>
                <li><a href="#" style="text-decoration: none; color: #000000; font-weight: 500;">Projects</a></li>
                <li><a href="#" style="text-decoration: none; color: #000000; font-weight: 500;">About</a></li>
                <li><a href="#" style="text-decoration: none; color: #000000; font-weight: 500;">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <section style="padding: 100px 0; background-color: #f8f9fa;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <h1 style="font-size: 56px; font-weight: 800; margin-bottom: 20px; color: #000000;">Hello, I'm John Doe</h1>
            <p style="font-size: 24px; color: #555555; margin-bottom: 40px; max-width: 700px;">A product designer specializing in UI/UX design and interactive digital experiences.</p>
            <div style="display: flex; gap: 16px;">
              <a href="#" style="background-color: #000000; color: white; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: 500;">View My Work</a>
              <a href="#" style="border: 1px solid #000000; color: #000000; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: 500;">Contact Me</a>
            </div>
          </div>
        </section>

        <section style="padding: 100px 0; background-color: #ffffff;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <h2 style="font-size: 40px; font-weight: 700; margin-bottom: 60px; text-align: center;">Selected Projects</h2>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; margin-bottom: 60px;">
              <a href="#" style="text-decoration: none; color: inherit;">
                <div style="overflow: hidden; border-radius: 8px; margin-bottom: 20px;">
                  <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80" alt="Project 1" style="width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s;" />
                </div>
                <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 10px;">Mobile App Design</h3>
                <p style="color: #555555; margin-bottom: 10px;">UX/UI Design, Interaction</p>
              </a>
              
              <a href="#" style="text-decoration: none; color: inherit;">
                <div style="overflow: hidden; border-radius: 8px; margin-bottom: 20px;">
                  <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80" alt="Project 2" style="width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s;" />
                </div>
                <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 10px;">E-commerce Website</h3>
                <p style="color: #555555; margin-bottom: 10px;">Web Design, Development</p>
              </a>
              
              <a href="#" style="text-decoration: none; color: inherit;">
                <div style="overflow: hidden; border-radius: 8px; margin-bottom: 20px;">
                  <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" alt="Project 3" style="width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s;" />
                </div>
                <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 10px;">Brand Identity</h3>
                <p style="color: #555555; margin-bottom: 10px;">Branding, Visual Design</p>
              </a>
              
              <a href="#" style="text-decoration: none; color: inherit;">
                <div style="overflow: hidden; border-radius: 8px; margin-bottom: 20px;">
                  <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80" alt="Project 4" style="width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s;" />
                </div>
                <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 10px;">Dashboard Interface</h3>
                <p style="color: #555555; margin-bottom: 10px;">UI Design, Data Visualization</p>
              </a>
            </div>
            
            <div style="text-align: center;">
              <a href="#" style="border: 1px solid #000000; color: #000000; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: 500;">View All Projects</a>
            </div>
          </div>
        </section>

        <section style="padding: 100px 0; background-color: #f8f9fa;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
              <div>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" alt="John Doe" style="width: 100%; border-radius: 8px;" />
              </div>
              <div>
                <h2 style="font-size: 40px; font-weight: 700; margin-bottom: 20px;">About Me</h2>
                <p style="font-size: 18px; color: #555555; margin-bottom: 20px; line-height: 1.6;">Hi, I'm John Doe, a product designer with over 5 years of experience creating intuitive and beautiful digital products that users love. I'm passionate about solving complex problems through design thinking and user-centered approaches.</p>
                <p style="font-size: 18px; color: #555555; margin-bottom: 30px; line-height: 1.6;">I've worked with startups and established companies across various industries including fintech, healthcare, and e-commerce. My goal is always to create meaningful experiences that align with business objectives while keeping the user at the center.</p>
                
                <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 20px;">Skills</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px;">
                  <span style="background-color: #ebeef2; padding: 8px 16px; border-radius: 4px; font-size: 14px;">UI Design</span>
                  <span style="background-color: #ebeef2; padding: 8px 16px; border-radius: 4px; font-size: 14px;">UX Research</span>
                  <span style="background-color: #ebeef2; padding: 8px 16px; border-radius: 4px; font-size: 14px;">Prototyping</span>
                  <span style="background-color: #ebeef2; padding: 8px 16px; border-radius: 4px; font-size: 14px;">Figma</span>
                  <span style="background-color: #ebeef2; padding: 8px 16px; border-radius: 4px; font-size: 14px;">Adobe XD</span>
                  <span style="background-color: #ebeef2; padding: 8px 16px; border-radius: 4px; font-size: 14px;">HTML/CSS</span>
                  <span style="background-color: #ebeef2; padding: 8px 16px; border-radius: 4px; font-size: 14px;">JavaScript</span>
                </div>
                
                <a href="#" style="background-color: #000000; color: white; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: 500; display: inline-block;">Download Resume</a>
              </div>
            </div>
          </div>
        </section>

        <section style="padding: 100px 0; background-color: #ffffff;">
          <div style="max-width: 800px; margin: 0 auto; padding: 0 20px; text-align: center;">
            <h2 style="font-size: 40px; font-weight: 700; margin-bottom: 20px;">Get In Touch</h2>
            <p style="font-size: 18px; color: #555555; margin-bottom: 40px; line-height: 1.6;">I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
            
            <form style="display: grid; gap: 20px; text-align: left;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                  <label for="name" style="display: block; margin-bottom: 8px; font-weight: 500;">Name</label>
                  <input type="text" id="name" style="width: 100%; padding: 12px; border: 1px solid #e5e7eb; border-radius: 4px; font-size: 16px;" />
                </div>
                <div>
                  <label for="email" style="display: block; margin-bottom: 8px; font-weight: 500;">Email</label>
                  <input type="email" id="email" style="width: 100%; padding: 12px; border: 1px solid #e5e7eb; border-radius: 4px; font-size: 16px;" />
                </div>
              </div>
              <div>
                <label for="subject" style="display: block; margin-bottom: 8px; font-weight: 500;">Subject</label>
                <input type="text" id="subject" style="width: 100%; padding: 12px; border: 1px solid #e5e7eb; border-radius: 4px; font-size: 16px;" />
              </div>
              <div>
                <label for="message" style="display: block; margin-bottom: 8px; font-weight: 500;">Message</label>
                <textarea id="message" rows="5" style="width: 100%; padding: 12px; border: 1px solid #e5e7eb; border-radius: 4px; font-size: 16px; resize: vertical;"></textarea>
              </div>
              <button type="submit" style="background-color: #000000; color: white; padding: 14px 32px; border-radius: 4px; border: none; font-weight: 500; font-size: 16px; cursor: pointer;">Send Message</button>
            </form>
          </div>
        </section>

        <footer style="padding: 60px 0; background-color: #f8f9fa; text-align: center;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="margin-bottom: 30px;">
              <a href="#" style="font-size: 24px; font-weight: 700; color: #000000; text-decoration: none;">John Doe</a>
            </div>
            
            <div style="margin-bottom: 30px;">
              <ul style="display: flex; justify-content: center; gap: 32px; list-style: none; margin: 0; padding: 0;">
                <li><a href="#" style="text-decoration: none; color: #000000; font-weight: 500;">Home</a></li>
                <li><a href="#" style="text-decoration: none; color: #000000; font-weight: 500;">Projects</a></li>
                <li><a href="#" style="text-decoration: none; color: #000000; font-weight: 500;">About</a></li>
                <li><a href="#" style="text-decoration: none; color: #000000; font-weight: 500;">Contact</a></li>
              </ul>
            </div>
            
            <div style="margin-bottom: 30px;">
              <div style="display: flex; justify-content: center; gap: 20px;">
                <a href="#" style="text-decoration: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#" style="text-decoration: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#" style="text-decoration: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                <a href="#" style="text-decoration: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
              </div>
            </div>
            
            <p style="color: #555555; font-size: 14px;">&copy; 2023 John Doe. All rights reserved.</p>
          </div>
        </footer>
      </div>
    `,
  },
  3: {
    name: "Store",
    content: `
      <div style="font-family: 'Inter', sans-serif;">
        <header style="background-color: #ffffff; padding: 20px 0; border-bottom: 1px solid #f3f4f6;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
            <a href="#" style="font-size: 24px; font-weight: 700; color: #111827; text-decoration: none;">SHOPNAME</a>
            
            <nav>
              <ul style="display: flex; gap: 24px; list-style: none; margin: 0; padding: 0;">
                <li><a href="#" style="text-decoration: none; color: #111827; font-weight: 500;">Home</a></li>
                <li><a href="#" style="text-decoration: none; color: #111827; font-weight: 500;">Shop</a></li>
                <li><a href="#" style="text-decoration: none; color: #111827; font-weight: 500;">Categories</a></li>
                <li><a href="#" style="text-decoration: none; color: #111827; font-weight: 500;">About</a></li>
                <li><a href="#" style="text-decoration: none; color: #111827; font-weight: 500;">Contact</a></li>
              </ul>
            </nav>
            
            <div style="display: flex; gap: 16px; align-items: center;">
              <a href="#" style="text-decoration: none; color: #111827;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </a>
              <a href="#" style="text-decoration: none; color: #111827; position: relative;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <span style="position: absolute; top: -8px; right: -8px; background-color: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 12px;">3</span>
              </a>
              <a href="#" style="text-decoration: none; color: #111827;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </a>
            </div>
          </div>
        </header>

        <section style="position: relative; background-color: #f3f4f6; min-height: 600px; display: flex; align-items: center;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 80px 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
            <div>
              <span style="display: inline-block; background-color: #e5e7eb; padding: 6px 12px; border-radius: 9999px; font-size: 14px; font-weight: 500; margin-bottom: 16px;">New Collection</span>
              <h1 style="font-size: 48px; font-weight: 800; margin-bottom: 20px; color: #111827; line-height: 1.1;">Discover Our Latest Products</h1>
              <p style="font-size: 18px; color: #4b5563; margin-bottom: 32px; line-height: 1.6;">Browse our handpicked selection of premium products with exclusive offers and discounts for a limited time.</p>
              <div style="display: flex; gap: 16px;">
                <a href="#" style="background-color: #111827; color: white; padding: 14px 30px; border-radius: 6px; text-decoration: none; font-weight: 500;">Shop Now</a>
                <a href="#" style="border: 1px solid #111827; color: #111827; padding: 14px 30px; border-radius: 6px; text-decoration: none; font-weight: 500;">Learn More</a>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80" alt="Featured product" style="width: 100%; border-radius: 8px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);" />
            </div>
          </div>
        </section>

        <section style="padding: 80px 0; background-color: #ffffff;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center; margin-bottom: 60px;">
              <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 16px; color: #111827;">Featured Products</h2>
              <p style="font-size: 18px; color: #4b5563; max-width: 600px; margin: 0 auto;">Discover our most popular items loved by customers worldwide.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
              <div>
                <div style="overflow: hidden; border-radius: 8px; margin-bottom: 16px; position: relative;">
                  <span style="position: absolute; top: 12px; left: 12px; background-color: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500;">Sale</span>
                  <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80" alt="Product 1" style="width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s;" />
                </div>
                <div>
                  <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Premium Watch</h3>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <span style="color: #111827; font-weight: 600;">$149.99</span>
                      <span style="color: #9ca3af; text-decoration: line-through; margin-left: 8px;">$199.99</span>
                    </div>
                    <button style="background-color: #111827; color: white; border: none; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <div style="overflow: hidden; border-radius: 8px; margin-bottom: 16px;">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" alt="Product 2" style="width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s;" />
                </div>
                <div>
                  <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Smart Watch</h3>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #111827; font-weight: 600;">$129.99</span>
                    <button style="background-color: #111827; color: white; border: none; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <div style="overflow: hidden; border-radius: 8px; margin-bottom: 16px;">
                  <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80" alt="Product 3" style="width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s;" />
                </div>
                <div>
                  <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Designer Bag</h3>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #111827; font-weight: 600;">$89.99</span>
                    <button style="background-color: #111827; color: white; border: none; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <div style="overflow: hidden; border-radius: 8px; margin-bottom: 16px; position: relative;">
                  <span style="position: absolute; top: 12px; left: 12px; background-color: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500;">New</span>
                  <img src="https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80" alt="Product 4" style="width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s;" />
                </div>
                <div>
                  <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Wireless Headphones</h3>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #111827; font-weight: 600;">$199.99</span>
                    <button style="background-color: #111827; color: white; border: none; width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 60px;">
              <a href="#" style="background-color: #111827; color: white; padding: 14px 30px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block;">View All Products</a>
            </div>
          </div>
        </section>

        <section style="padding: 80px 0; background-color: #f3f4f6;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="text-align: center; margin-bottom: 60px;">
              <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 16px; color: #111827;">Categories</h2>
              <p style="font-size: 18px; color: #4b5563; max-width: 600px; margin: 0 auto;">Browse our collection by category to find exactly what you're looking for.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
              <a href="#" style="text-decoration: none; color: inherit;">
                <div style="position: relative; overflow: hidden; border-radius: 8px; height: 250px;">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" alt="Electronics" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" />
                  <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px;">
                    <h3 style="color: white; font-size: 24px; font-weight: 600; margin-bottom: 8px;">Electronics</h3>
                    <p style="color: rgba(255,255,255,0.9); font-size: 16px;">30 products</p>
                  </div>
                </div>
              </a>
              
              <a href="#" style="text-decoration: none; color: inherit;">
                <div style="position: relative; overflow: hidden; border-radius: 8px; height: 250px;">
                  <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" alt="Accessories" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" />
                  <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px;">
                    <h3 style="color: white; font-size: 24px; font-weight: 600; margin-bottom: 8px;">Accessories</h3>
                    <p style="color: rgba(255,255,255,0.9); font-size: 16px;">45 products</p>
                  </div>
                </div>
              </a>
              
              <a href="#" style="text-decoration: none; color: inherit;">
                <div style="position: relative; overflow: hidden; border-radius: 8px; height: 250px;">
                  <img src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80" alt="Wearables" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" />
                  <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px;">
                    <h3 style="color: white; font-size: 24px; font-weight: 600; margin-bottom: 8px;">Wearables</h3>
                    <p style="color: rgba(255,255,255,0.9); font-size: 16px;">28 products</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section style="padding: 80px 0; background-color: #ffffff;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
              <div>
                <span style="display: inline-block; background-color: #e5e7eb; padding: 6px 12px; border-radius: 9999px; font-size: 14px; font-weight: 500; margin-bottom: 16px;">Limited Offer</span>
                <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 20px; color: #111827; line-height: 1.2;">Special Discount</h2>
                <p style="font-size: 18px; color: #4b5563; margin-bottom: 20px; line-height: 1.6;">Get up to 50% off on selected items. Limited time offer. Don't miss out!</p>
                <div style="margin-bottom: 32px;">
                  <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; text-align: center; width: 80px;">
                      <div style="font-size: 24px; font-weight: 700; color: #111827;">00</div>
                      <div style="font-size: 14px; color: #6b7280;">Days</div>
                    </div>
                    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; text-align: center; width: 80px;">
                      <div style="font-size: 24px; font-weight: 700; color: #111827;">12</div>
                      <div style="font-size: 14px; color: #6b7280;">Hours</div>
                    </div>
                    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; text-align: center; width: 80px;">
                      <div style="font-size: 24px; font-weight: 700; color: #111827;">45</div>
                      <div style="font-size: 14px; color: #6b7280;">Minutes</div>
                    </div>
                    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; text-align: center; width: 80px;">
                      <div style="font-size: 24px; font-weight: 700; color: #111827;">32</div>
                      <div style="font-size: 14px; color: #6b7280;">Seconds</div>
                    </div>
                  </div>
                </div>
                <a href="#" style="background-color: #111827; color: white; padding: 14px 30px; border-radius: 6px; text-decoration: none; font-weight: 500; display: inline-block;">Shop Now</a>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80" alt="Special offer product" style="width: 100%; border-radius: 8px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);" />
              </div>
            </div>
          </div>
        </section>

        <section style="padding: 80px 0; background-color: #f3f4f6;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
            <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 16px; color: #111827;">Subscribe to Our Newsletter</h2>
            <p style="font-size: 18px; color: #4b5563; max-width: 600px; margin: 0 auto 32px;">Stay updated with our latest products, promotions, and exclusive offers.</p>
            
            <form style="max-width: 500px; margin: 0 auto; display: flex;">
              <input type="email" placeholder="Your email address" style="flex: 1; padding: 14px; border: 1px solid #d1d5db; border-radius: 6px 0 0 6px; font-size: 16px;" />
              <button type="submit" style="background-color: #111827; color: white; padding: 14px 28px; border: none; border-radius: 0 6px 6px 0; font-weight: 500; font-size: 16px; cursor: pointer;">Subscribe</button>
            </form>
          </div>
        </section>

        <footer style="background-color: #111827; color: white; padding: 64px 0 32px;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; margin-bottom: 64px;">
              <div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 24px;">SHOPNAME</h3>
                <p style="color: #9ca3af; line-height: 1.5; margin-bottom: 24px;">Your one-stop shop for premium products with excellent customer service and fast shipping.</p>
                <div style="display: flex; gap: 16px;">
                  <a href="#" style="color: #9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                  <a href="#" style="color: #9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                  <a href="#" style="color: #9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                  <a href="#" style="color: #9ca3af;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                </div>
              </div>
              
              <div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Shop</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">All Products</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">New Arrivals</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Featured</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Special Offers</a></li>
                </ul>
              </div>
              
              <div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Customer Service</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Contact Us</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">FAQ</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Shipping & Returns</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Track Order</a></li>
                </ul>
              </div>
              
              <div>
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Company</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">About Us</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Blog</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Careers</a></li>
                  <li style="margin-bottom: 12px;"><a href="#" style="color: #9ca3af; text-decoration: none;">Privacy Policy</a></li>
                  <li><a href="#" style="color: #9ca3af; text-decoration: none;">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
            
            <div style="border-top: 1px solid #374151; padding-top: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
              <p style="color: #9ca3af; font-size: 14px;">© 2023 SHOPNAME. All rights reserved.</p>
              <div>
                <img src="https://via.placeholder.com/300x35/111827/FFFFFF?text=Payment+Methods" alt="Payment methods" style="height: 35px;" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    `,
  }
};

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/auth?mode=login');
      return;
    }

    // Check if template exists
    if (id && !templateData[Number(id)]) {
      toast({
        title: "Template not found",
        description: "The requested template could not be found.",
        variant: "destructive",
      });
      navigate('/templates');
    }
  }, [id, navigate, toast]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleDownload = () => {
    setIsDownloadDialogOpen(true);
  };

  const performDownload = () => {
    setIsDownloadDialogOpen(false);
    
    // Simulate download process
    toast({
      title: "Downloading landing page",
      description: "Your landing page is being prepared for download.",
    });
    
    // Simulating a delay for download preparation
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: "Your landing page has been downloaded successfully.",
      });
    }, 2000);
  };

  const handleSave = () => {
    if (isSaving) return;
    
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully.",
      });
    }, 1000);
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
              {id && templateData[Number(id)] ? `Editing ${templateData[Number(id)].name} Template` : 'Editor'}
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
        <div className={`p-6 ${isPreviewMode ? 'bg-secondary/50' : 'bg-background'}`}>
          <div className={`mx-auto transition-all duration-300 ${getViewportClass()} h-[calc(100vh-8rem)] bg-white overflow-y-auto rounded-md shadow ${isPreviewMode ? '' : 'border'}`}>
            {id && templateData[Number(id)] && (
              <div 
                dangerouslySetInnerHTML={{ __html: templateData[Number(id)].content }}
                className={isPreviewMode ? '' : 'pointer-events-none'}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Download dialog */}
      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Your Landing Page</DialogTitle>
            <DialogDescription>
              Your landing page will be downloaded as a ZIP file containing all necessary HTML, CSS, and image files.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              The downloaded package includes:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Complete HTML file with all your customizations</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>CSS stylesheet for styling</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>All images used in your design</span>
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
