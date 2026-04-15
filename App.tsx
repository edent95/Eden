/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Mail, 
  ExternalLink,
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Compass,
  Camera,
  Brain,
  MapPin
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-900 selection:text-white">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-tight">Eden Tan</div>
          <div className="flex gap-4">
            <a href="https://drive.google.com/uc?export=download&id=1bidz8DdSkgYu2KrsKUXnfR04J8EUo3IZ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-full hover:bg-stone-800 transition-colors">
              <Download size={16} />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <motion.section 
          className="mb-24"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200 text-stone-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6">
            <MapPin size={14} /> Malaysia Based
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="font-display text-5xl md:text-7xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
            Systems Architect.<br />
            Digital Strategist.<br />
            <span className="text-stone-400">Tech Explorer.</span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl text-stone-600 max-w-2xl mb-10 leading-relaxed">
            I am a Digital Marketing Expert with over 7 years of experience mastering the art of the funnel, building comprehensive ecosystems, and exploring the intersection of ancient data systems and modern tech.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 mb-12">
            <a href="https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-200 rounded-full text-stone-700 hover:bg-stone-900 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://www.youtube.com/@DanielTan95" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-200 rounded-full text-stone-700 hover:bg-stone-900 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
            <a href="https://www.instagram.com/eden___j/" target="_blank" rel="noopener noreferrer" className="p-3 bg-stone-200 rounded-full text-stone-700 hover:bg-stone-900 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
          </motion.div>

          <motion.blockquote variants={fadeIn} className="border-l-4 border-stone-300 pl-6 py-2">
            <p className="font-display text-xl text-stone-500 italic">
              "The people who are crazy enough to think they can change the world are the ones who do."
            </p>
          </motion.blockquote>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Left Column */}
          <div className="md:col-span-2 space-y-24">
            
            {/* Active Build */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-stone-200 rounded-lg text-stone-700"><Briefcase size={24} /></div>
                <h2 className="font-display text-3xl font-bold text-stone-900">Active Build & Experience</h2>
              </motion.div>

              <motion.div variants={fadeIn} className="mb-12 group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    Jiju.pet 
                    <a href="https://jiju.pet" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <span className="text-sm font-mono text-stone-500 bg-stone-200 px-2 py-1 rounded">Present</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  A comprehensive pet-friendly ecosystem designed to help owners discover and log adventures across Penang, Selangor, and Singapore.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-stone-900">Marketing Executive</h3>
                  <span className="text-sm font-mono text-stone-500 bg-stone-200 px-2 py-1 rounded">7+ Years</span>
                </div>
                <p className="text-stone-500 font-medium mb-3">iGaming Industry</p>
                <p className="text-stone-600 leading-relaxed">
                  Mastering the art of the funnel. Developed strategic foundations and executed comprehensive digital marketing campaigns to drive user acquisition and retention in a highly competitive sector.
                </p>
              </motion.div>
            </motion.section>

            {/* Education & Certifications */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-stone-200 rounded-lg text-stone-700"><GraduationCap size={24} /></div>
                <h2 className="font-display text-3xl font-bold text-stone-900">Milestones</h2>
              </motion.div>

              <div className="space-y-8 border-l-2 border-stone-200 pl-6 ml-3 relative">
                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="text-lg font-bold text-stone-900">Mensa Membership</h3>
                  <p className="text-stone-500 text-sm mb-1">August 2025</p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="text-lg font-bold text-stone-900">Advanced Open Water Certification</h3>
                  <p className="text-stone-500 text-sm mb-1">PADI · April 2024</p>
                  <p className="text-stone-600 text-sm">Certified by Ong Wei Lun | Burger Dive Team Sdn Bhd</p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="text-lg font-bold text-stone-900">Entrepreneurship in Emerging Economies</h3>
                  <p className="text-stone-500 text-sm mb-1">HarvardX · May 2020</p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="text-lg font-bold text-stone-900">The Fundamental of Digital Marketing</h3>
                  <p className="text-stone-500 text-sm mb-1">Google · December 2019</p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-stone-300 border-4 border-stone-50"></div>
                  <h3 className="text-lg font-bold text-stone-900">Executive Diploma in Marketing</h3>
                  <p className="text-stone-500 text-sm mb-1">London Examination Board · 2016 – 2018</p>
                </motion.div>
              </div>
            </motion.section>

          </div>

          {/* Right Column */}
          <div className="space-y-12">
            
            {/* Interests */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm"
            >
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">Interests</h2>
              
              <div className="space-y-6">
                <motion.div variants={fadeIn}>
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2">
                    <Brain size={18} className="text-stone-500" /> Metaphysics
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Applied study of Bazi, Zi Wei Dou Shu, and I Ching as ancient data systems.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2">
                    <Camera size={18} className="text-stone-500" /> Analog Tech
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Collector of Rolleiflex cameras and mechanical gramophones.
                  </p>
                </motion.div>

                <motion.div variants={fadeIn}>
                  <div className="flex items-center gap-2 text-stone-900 font-bold mb-2">
                    <Compass size={18} className="text-stone-500" /> Life
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Certified Scuba Diver, Homebrewer (Rice Wine), and Terrarium enthusiast.
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Quick Links */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="bg-stone-900 text-stone-50 p-8 rounded-2xl shadow-sm"
            >
              <h2 className="font-display text-xl font-bold mb-6">Connect</h2>
              <div className="space-y-4">
                <a href="https://www.linkedin.com/in/daniel-yi-tern-tan-461567199/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href="https://www.youtube.com/@DanielTan95" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors">
                  <Youtube size={18} /> YouTube
                </a>
                <a href="https://www.instagram.com/eden___j/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors">
                  <Instagram size={18} /> Instagram
                </a>
                <a href="https://matias.me/nsfw/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors">
                  <span className="text-lg">👽</span> Weirdo
                </a>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200 py-8 text-center text-stone-500 text-sm">
        <p>© {new Date().getFullYear()} Eden Tan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
