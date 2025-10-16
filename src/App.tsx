import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CheckCircle, Award, Building2, GraduationCap, Users, ChevronRight, Shield, FileCheck, Zap, TrendingUp, Target, Globe, Briefcase, Star, Quote, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ChevronDown, HelpCircle } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import InstitutionDashboard from './components/InstitutionDashboard';
import MockTestPage from './pages/MockTestPage';
import ErrorBoundary from './components/ErrorBoundary';
import { User } from './services/authService';

// Protected Route Component
function ProtectedRoute({ children, user, requiredRole }: { children: React.ReactNode, user: User | null, requiredRole?: string }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Landing Page Component
function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<number>(0); // Module 1 open by default

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="https://economictimes.indiatimes.com/photo/119331595.cms"
                alt="AI Ready Logo"
                className="h-12 object-contain"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#why-ai" className="text-slate-700 hover:text-primary-500 transition-colors font-medium">Why AI?</a>
              <a href="#benefits" className="text-slate-700 hover:text-primary-500 transition-colors font-medium">Benefits</a>
              <a href="#testimonials" className="text-slate-700 hover:text-primary-500 transition-colors font-medium">Testimonials</a>
              <button
                onClick={() => navigate('/login')}
                className="text-slate-700 hover:text-primary-500 transition-colors font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-md font-semibold"
                style={{backgroundColor: '#ee0007'}}
              >
                Get Certified
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pb-16 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm border" style={{backgroundColor: 'rgba(238,0,7,0.1)', color: '#ee0007', borderColor: 'rgba(238,0,7,0.3)'}}>
                <Zap className="w-4 h-4" />
                <span>Certified for the Future</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                  <span className="text-slate-900">Become </span><span style={{color: '#ee0007'}}>ET AI Ready.</span>
                </h1>
                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                  <span className="text-slate-900">Stay </span><span style={{color: '#0056ff'}}>Future Ready.</span>
                </h1>
              </div>

              {/* Subheadline */}
              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed font-medium">
                Get recognized by <span className="font-bold" style={{color: '#ee0007'}}>The Economic Times</span> for your readiness to lead in the AI era.
              </p>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                <p className="text-slate-600 text-sm mb-3">Designed for</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-bold text-slate-900 text-xs">Professionals</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-bold text-slate-900 text-xs">Institutions</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-bold text-slate-900 text-xs">Organizations</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => navigate('/register')}
                  className="group text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-base font-semibold"
                  style={{backgroundColor: '#ee0007'}}
                >
                  <span>Start Your Journey</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#process"
                  className="bg-white text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all border-2 border-slate-200 flex items-center justify-center space-x-2 text-base font-semibold"
                >
                  <span>Learn More</span>
                </a>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-slate-700 font-semibold text-sm">Globally Recognized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" style={{color: '#0056ff'}} />
                  <span className="text-slate-700 font-semibold text-sm">Backed by Industry Experts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" style={{color: '#ee0007'}} />
                  <span className="text-slate-700 font-semibold text-sm">ET Verified Credential</span>
                </div>
              </div>
            </div>

            {/* Right Side - Certificate Preview */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse" style={{background: 'radial-gradient(circle, #ee0007, transparent)'}}></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse" style={{background: 'radial-gradient(circle, #0056ff, transparent)', animationDelay: '1s'}}></div>

              <div className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2" style={{borderColor: '#ee0007'}}>
                <div className="bg-white rounded-2xl p-6">
                  <div className="text-center space-y-4">
                    {/* ET Logo placeholder - you can replace with actual logo */}
                    <div className="flex justify-center">
                      <img
                        src="https://economictimes.indiatimes.com/photo/119331595.cms"
                        alt="ET Logo"
                        className="h-12 object-contain"
                      />
                    </div>

                    <Award className="w-20 h-20 mx-auto" style={{color: '#ee0007'}} />

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-1">ET AI Ready</h3>
                      <p className="text-base text-slate-600 mb-0.5">Official Certification</p>
                      <p className="text-xs text-slate-500">Powered by The Economic Times</p>
                    </div>

                    <div className="rounded-lg p-3 border" style={{backgroundColor: 'rgba(238,0,7,0.05)', borderColor: 'rgba(238,0,7,0.2)'}}>
                      <p className="text-xs text-slate-700 font-medium">
                        <span className="font-bold" style={{color: '#ee0007'}}>Your pathway to AI excellence</span> starts here. Get certified and unlock new career opportunities.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                        <Award className="w-3.5 h-3.5" />
                        <span>Valid for 3 Years | Globally Recognized</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-wider mb-8">Trusted By Leading Institutions</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center transition-all opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg"
                alt="MIT"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center transition-all opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Leland_Stanford_Junior_University.svg"
                alt="Stanford"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center transition-all opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg"
                alt="Oxford"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center transition-all opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg"
                alt="Berkeley"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center transition-all opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg"
                alt="Cambridge"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center transition-all opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/70/Harvard_University_logo.svg"
                alt="Harvard"
                className="h-14 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Readiness Section */}
      <section id="why-ai" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why AI Readiness Matters</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              In today's rapidly evolving technological landscape, AI competency is no longer optional—it's essential
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Unprecedented Market Growth</h3>
                    <p className="text-slate-600">
                      The global AI market is projected to reach $1.8 trillion by 2030. Organizations need verified AI-ready professionals to capitalize on this growth.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Competitive Advantage</h3>
                    <p className="text-slate-600">
                      Stand out in the job market or demonstrate your institution's commitment to cutting-edge education and innovation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 rounded-lg p-3 flex-shrink-0">
                    <Globe className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Global Recognition</h3>
                    <p className="text-slate-600">
                      Our certification is recognized worldwide, opening doors to international opportunities and collaborations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">The AI Skills Gap</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Organizations seeking AI talent</span>
                    <span className="text-2xl font-bold">87%</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{width: '87%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Professionals with verified AI skills</span>
                    <span className="text-2xl font-bold">23%</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{width: '23%'}}></div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 mt-6">
                  <p className="text-sm">
                    Bridge the gap with AI Ready certification and position yourself or your organization at the forefront of the AI revolution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Who Can Get Certified?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              AI Ready certification is available for individuals and organizations across various sectors
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-gradient-to-br from-primary-50 to-red-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border border-primary-100">
              <div className="bg-primary-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Individuals</h3>
              <p className="text-slate-600 leading-relaxed">
                Professionals looking to validate their AI skills and advance their careers in the tech industry.
              </p>
            </div>
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border border-green-100">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Universities</h3>
              <p className="text-slate-600 leading-relaxed">
                Higher education institutions establishing AI-ready curricula and teaching standards.
              </p>
            </div>
            <div className="group bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border border-orange-100">
              <div className="bg-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Schools & Colleges</h3>
              <p className="text-slate-600 leading-relaxed">
                Educational campuses integrating AI literacy into their academic programs.
              </p>
            </div>
            <div className="group bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 border border-violet-100">
              <div className="bg-violet-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Service Providers</h3>
              <p className="text-slate-600 leading-relaxed">
                Organizations delivering AI solutions and services seeking formal recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Certification Benefits</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Unlock a world of opportunities with AI Ready certification
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 border-red-600">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-red-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Career Advancement</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Demonstrate your AI expertise to employers and unlock higher-paying positions. Certified professionals see an average 30% salary increase.
                  </p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-600">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-red-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Credibility & Trust</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Build trust with clients and stakeholders through third-party validated credentials. Stand out in competitive markets.
                  </p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 border-red-600">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-red-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Global Network</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Join an exclusive community of AI-ready professionals and organizations. Access networking events and collaboration opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-600">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-red-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Digital Badges</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Share your achievement on LinkedIn, resumes, and websites with verifiable digital credentials from Credly.
                  </p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 border-red-600">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-red-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Skill Validation</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Prove your competency in AI fundamentals, machine learning, ethics, and practical applications through rigorous assessment.
                  </p>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-600">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-red-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Future-Proof Career</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Stay relevant in an AI-driven economy. Continuous learning resources keep you updated with the latest developments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple Certification Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get certified in three straightforward steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Register</h3>
              <p className="text-slate-600 text-center leading-relaxed mb-4">
                Complete the registration form with your details and select your certification category.
              </p>
              <div className="flex justify-center">
                <FileCheck className="w-12 h-12 text-primary-500 opacity-20" />
              </div>
            </div>
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Take the Exam</h3>
              <p className="text-slate-600 text-center leading-relaxed mb-4">
                Complete your AI competency assessment securely through Talview's proctored platform.
              </p>
              <div className="flex justify-center">
                <Shield className="w-12 h-12 text-red-600 opacity-20" />
              </div>
            </div>
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Get Certified</h3>
              <p className="text-slate-600 text-center leading-relaxed mb-4">
                Receive your official AI Ready certificate via Credly's digital credentialing platform.
              </p>
              <div className="flex justify-center">
                <Award className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full text-sm font-bold shadow-sm border mb-4" style={{color: '#ee0007', borderColor: 'rgba(238,0,7,0.3)'}}>
              <GraduationCap className="w-4 h-4" />
              <span>Comprehensive Learning Path</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Certification Curriculum</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A professionally designed 9-module program covering AI foundations to advanced implementation
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                num: '01',
                title: 'Foundations of Intelligence & AI Evolution',
                desc: 'Build a solid conceptual base in what intelligence is — and how AI simulates it.',
                professional: 'Understanding natural vs artificial intelligence, AI history from symbolic systems to generative AI, core functional differences between AI/ML/DL, the four pillars of AI systems, and real-world applications.',
                advanced: 'Cognitive science foundations, AI as cognitive amplifier, representation concepts in LLMs, neuro-symbolic AI and hybrid cognition models.'
              },
              {
                num: '02',
                title: 'Data, Information & Intelligence',
                desc: 'Understand data as the fuel and structural foundation of AI systems.',
                professional: 'Data types and sources, lifecycle management from collection to learning, quality control and bias prevention, cloud infrastructure, and privacy frameworks including India\'s DPDP Act.',
                advanced: 'Information theory and Shannon entropy, embeddings and vector space logic, bias detection methodologies, and global data governance frameworks like GDPR and EU AI Act.'
              },
              {
                num: '03',
                title: 'Machine Learning & Intelligent Learning Theory',
                desc: 'Explore how machines learn, adapt, and make predictions.',
                professional: 'Three learning paradigms (supervised, unsupervised, reinforcement), training and prediction processes, accuracy and generalization concepts, evaluation metrics, and real-world ML applications.',
                advanced: 'Gradient descent and loss minimization, transfer learning and fine-tuning strategies, RLHF (Reinforcement Learning with Human Feedback), and self-supervised learning mechanisms.'
              },
              {
                num: '04',
                title: 'Deep Learning & Neural Networks',
                desc: 'Simplify how neural systems power modern AI and dig deeper into their structure.',
                professional: 'Neural network architectures, layer types and functions, CNNs for vision, RNNs for sequences, Transformers for language, attention mechanisms, and deep learning challenges.',
                advanced: 'Activation functions and gradient flow, attention heads and positional encoding, explainable AI techniques (LIME, SHAP, Grad-CAM), and optimization methods.'
              },
              {
                num: '05',
                title: 'Generative AI – Theory, Architectures & Creativity',
                desc: 'Decode the generative mechanisms that let AI create new content.',
                professional: 'Generative AI fundamentals, core architectures (GANs, VAEs, Diffusion, LLMs), tokenization and context windows, creativity control parameters, and real-world generative tools.',
                advanced: 'Probability sampling and latent space exploration, model fine-tuning ethics, prompt compression techniques, and understanding creativity boundaries in AI systems.'
              },
              {
                num: '06',
                title: 'Multimodal AI Systems & Tool Integration',
                desc: 'Learn how GenAI combines text, visuals, audio, and video.',
                professional: 'Cross-modal generation (text-to-image, text-to-audio, text-to-video), integration tools and platforms, API workflows, and end-to-end content creation pipelines.',
                advanced: 'Multimodal model architectures, RAG (Retrieval-Augmented Generation) systems, performance optimization and latency management, API security and fairness considerations.'
              },
              {
                num: '07',
                title: 'AI Strategy, Business Innovation & Transformation',
                desc: 'Learn how organizations deploy, measure, and scale AI responsibly.',
                professional: 'AI applications across industries, ROI measurement and KPIs, human-AI collaboration workflows, building AI-ready teams, and managing organizational change.',
                advanced: 'AI maturity frameworks, governance boards and ethical decision processes, economic impact analysis, and AI in Industry 5.0 human-centered automation.'
              },
              {
                num: '08',
                title: 'Ethics, Risks, and Global Governance',
                desc: 'Develop deep ethical awareness and governance thinking.',
                professional: 'Core AI ethics (bias, fairness, transparency, privacy), deepfakes and disinformation challenges, intellectual property considerations, and responsible AI principles.',
                advanced: 'Global regulatory frameworks (EU AI Act, DPDP, US AI Bill of Rights), algorithmic accountability and AI audits, environmental impact, and the alignment problem.'
              },
              {
                num: '09',
                title: 'Human–AI Collaboration and Future Leadership',
                desc: 'Prepare for the coming era of augmented intelligence.',
                professional: 'Human-in-the-loop systems, AI for creativity and decision-making, AI literacy for different roles, and reskilling frameworks for the AI economy.',
                advanced: 'Affective computing and emotional AI, synthetic labor and digital twins, philosophy of human-AI coexistence, and leadership ethics in algorithmic governance.'
              },
            ].map((module, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4" style={{borderLeftColor: index % 2 === 0 ? '#ee0007' : '#0056ff'}}>
                {/* Module Header - Always Visible */}
                <button
                  onClick={() => toggleModule(index)}
                  className="w-full p-6 flex items-start space-x-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-base font-medium border-2" style={{color: index % 2 === 0 ? '#ee0007' : '#0056ff', borderColor: index % 2 === 0 ? 'rgba(238,0,7,0.2)' : 'rgba(0,86,255,0.2)', backgroundColor: index % 2 === 0 ? 'rgba(238,0,7,0.05)' : 'rgba(0,86,255,0.05)'}}>
                      {module.num}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{module.title}</h3>
                    <p className="text-slate-600 font-medium">{module.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <ChevronDown
                      className={`w-6 h-6 text-slate-600 transition-transform duration-300 ${
                        openModule === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Module Content - Expandable */}
                {openModule === index && (
                  <div className="px-6 pb-6">
                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#ee0007'}}></div>
                          <h4 className="font-bold text-slate-800">60% Professional Concepts</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{module.professional}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#0056ff'}}></div>
                          <h4 className="font-bold text-slate-800">40% Advanced Integration</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{module.advanced}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Curriculum Highlights */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(238,0,7,0.1)'}}>
                <FileCheck className="w-8 h-8" style={{color: '#ee0007'}} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">9 Comprehensive Modules</h4>
              <p className="text-sm text-slate-600">Structured learning from foundations to advanced applications</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(0,86,255,0.1)'}}>
                <Target className="w-8 h-8" style={{color: '#0056ff'}} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Hands-on Projects</h4>
              <p className="text-sm text-slate-600">Applied exercises and real-world case studies</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(16,185,129,0.1)'}}>
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Industry-Ready Skills</h4>
              <p className="text-sm text-slate-600">60% professional concepts + 40% advanced integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Details Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Certification Details</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to know about AI Ready certification
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 mb-2">₹15,000</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Certification Fee</h3>
              <p className="text-slate-600 text-sm">One-time payment includes exam, certificate, and digital badge</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 mb-2">3 Years</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Certificate Validity</h3>
              <p className="text-slate-600 text-sm">Valid for three years from the date of certification</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 mb-2">2 Hours</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Exam Duration</h3>
              <p className="text-slate-600 text-sm">Comprehensive assessment with proctoring via Talview</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 mb-2">24/7</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Online Access</h3>
              <p className="text-slate-600 text-sm">Take the exam anytime, anywhere at your convenience</p>
            </div>
          </div>
          <div className="mt-12 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-3">What's Included</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive AI competency exam</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Official digital certificate</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Credly verified digital badge</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Exam Format</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Multiple choice questions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Scenario-based assessments</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>AI-powered proctoring</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>24/7 technical support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Study materials provided</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>One free retake if needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Certified Professionals Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Hear from individuals and organizations who transformed their careers with AI Ready certification
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-red-50 rounded-2xl p-8 border border-primary-100 hover:shadow-xl transition-all">
              <div className="flex items-center space-x-1 mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <Quote className="w-10 h-10 text-primary-300 mb-4" />
              <p className="text-slate-700 leading-relaxed mb-6">
                "The AI Ready certification transformed my career. Within three months of certification, I landed a senior ML engineer role with a 40% salary increase. The credibility it provided was invaluable."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Sarah Mitchell"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Sarah Mitchell</p>
                    <p className="text-sm text-slate-600">Senior ML Engineer, TechCorp</p>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/sarahmitchell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-xl transition-all">
              <div className="flex items-center space-x-1 mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <Quote className="w-10 h-10 text-green-300 mb-4" />
              <p className="text-slate-700 leading-relaxed mb-6">
                "As a university, getting AI Ready certified elevated our computer science program. We saw a 65% increase in enrollment and attracted top-tier faculty. It's a game-changer for academic institutions."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Dr. James Kumar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Dr. James Kumar</p>
                    <p className="text-sm text-slate-600">Dean, State University</p>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/jameskumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 hover:shadow-xl transition-all">
              <div className="flex items-center space-x-1 mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <Quote className="w-10 h-10 text-orange-300 mb-4" />
              <p className="text-slate-700 leading-relaxed mb-6">
                "Our AI service company gained instant credibility with enterprise clients after certification. It validated our expertise and opened doors to Fortune 500 partnerships we couldn't access before."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Elena Chen"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">Elena Chen</p>
                    <p className="text-sm text-slate-600">CEO, AI Solutions Inc.</p>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/elenachen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Certified Professionals</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Certified Institutions</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-full mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">
              Find answers to common questions about AI Ready certification
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleFaq(0)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">What is AI Ready certification?</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === 0 ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 0 && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  AI Ready certification is an industry-recognized credential that validates your competency in artificial intelligence fundamentals, applications, and best practices. It's designed for individuals and organizations looking to demonstrate their AI readiness in today's technology-driven landscape.
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">Who can take the AI Ready certification exam?</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === 1 ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  The certification is open to everyone! Whether you're an individual professional, a student, an educational institution, or an AI service provider, you can register for the exam. No specific prerequisites are required, though basic understanding of technology concepts is helpful.
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">How long does the certification remain valid?</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === 2 ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 2 && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  Your AI Ready certification is valid for 3 years from the date of issuance. After this period, you can renew your certification by taking the updated exam, ensuring your knowledge stays current with the latest AI developments and best practices.
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleFaq(3)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">What is the exam format and duration?</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === 3 ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 3 && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  The exam is 2 hours long and consists of multiple-choice questions and scenario-based assessments. It's conducted online through Talview's secure, AI-powered proctoring platform, allowing you to take the exam from anywhere at your convenience with 24/7 availability.
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleFaq(4)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">What happens if I don't pass the exam?</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === 4 ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 4 && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  Don't worry! Your certification fee includes one free retake. If you need additional attempts, you can register for a retake at a discounted rate. We also provide detailed feedback on your performance to help you identify areas for improvement.
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleFaq(5)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">How do I receive my certificate after passing?</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === 5 ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 5 && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  Upon passing the exam, you'll receive your digital certificate and Credly badge within 3-5 business days via email. The digital badge can be shared on LinkedIn, your resume, email signature, and websites. You'll also have access to a downloadable PDF certificate.
                </div>
              )}
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleFaq(6)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">Are study materials provided?</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === 6 ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 6 && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  Yes! After registration, you'll receive comprehensive study materials including video tutorials, practice questions, case studies, and reading resources. Our learning portal provides everything you need to prepare effectively for the certification exam.
                </div>
              )}
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleFaq(7)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-lg font-bold text-slate-900 pr-8">Is the certification recognized internationally?</span>
                <ChevronDown
                  className={`w-6 h-6 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === 7 ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === 7 && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  Absolutely! AI Ready certification is globally recognized and accepted by leading organizations, universities, and employers worldwide. Our partnership with Credly ensures your credentials are verified and portable across borders, opening international career opportunities.
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <a
              href="#"
              className="inline-flex items-center space-x-2 text-red-600 hover:text-purple-600 font-semibold transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Contact our support team</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Certified?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of professionals and organizations already certified in AI readiness
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-red-600 px-8 py-4 rounded-xl hover:bg-slate-50 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold inline-flex items-center space-x-2"
          >
            <span>Start Registration</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo and About */}
            <div className="lg:col-span-1">
              <img
                src="https://economictimes.indiatimes.com/photo/119331595.cms"
                alt="AI Ready Logo"
                className="h-10 object-contain mb-4 brightness-0 invert"
              />
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Official AI competency certification for individuals and organizations. Building the future of AI-ready professionals worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="#why-ai" className="block text-slate-400 hover:text-white transition-colors text-sm">Why AI Readiness</a>
                <a href="#categories" className="block text-slate-400 hover:text-white transition-colors text-sm">Who Can Get Certified</a>
                <a href="#benefits" className="block text-slate-400 hover:text-white transition-colors text-sm">Benefits</a>
                <a href="#testimonials" className="block text-slate-400 hover:text-white transition-colors text-sm">Testimonials</a>
                <a href="#process" className="block text-slate-400 hover:text-white transition-colors text-sm">Certification Process</a>
                <a href="#about" className="block text-slate-400 hover:text-white transition-colors text-sm">About Us</a>
              </div>
            </div>

            {/* Partners */}
            <div>
              <h3 className="text-lg font-bold mb-4">Our Partners</h3>
              <div className="space-y-3">
                <a href="https://talview.com" target="_blank" rel="noopener noreferrer" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Talview
                </a>
                <a href="https://credly.com" target="_blank" rel="noopener noreferrer" className="block text-slate-400 hover:text-white transition-colors text-sm">
                  Credly
                </a>
              </div>
              <h3 className="text-lg font-bold mb-4 mt-6">Resources</h3>
              <div className="space-y-3">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">Study Materials</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">FAQs</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-sm">support@aiready.com</p>
                    <p className="text-slate-400 text-sm">info@aiready.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
                    <p className="text-slate-400 text-sm">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-400 text-sm">
                    123 AI Street<br />
                    Tech City, TC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-400 text-sm">&copy; 2025 AI Ready Certification. All rights reserved.</p>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Login Page Component
function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = React.useContext(AuthContext);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Navigate based on role
    if (user.role === 'admin') {
      navigate('/admin');
    } else if (user.role === 'institution') {
      navigate('/institution');
    } else {
      navigate('/dashboard');
    }
  };

  return <Login onLogin={handleLogin} onClose={() => navigate('/')} />;
}

// Register Page Component
function RegisterPage() {
  const navigate = useNavigate();
  return <RegistrationForm onClose={() => navigate('/')} />;
}

// Shared Auth Context
const AuthContext = React.createContext<{
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}>({ currentUser: null, setCurrentUser: () => {} });

// Dashboard Page Wrapper
function DashboardPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ErrorBoundary>
      <Dashboard user={currentUser} onLogout={handleLogout} />
    </ErrorBoundary>
  );
}

// Admin Dashboard Page Wrapper
function AdminPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = React.useContext(AuthContext);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <ErrorBoundary>
      <AdminDashboard user={currentUser} onLogout={handleLogout} />
    </ErrorBoundary>
  );
}

// Institution Dashboard Page Wrapper
function InstitutionPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser} = React.useContext(AuthContext);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== 'institution') {
    return <Navigate to="/dashboard" replace />;
  }

  // Transform user object to institution user format
  const institutionUser = {
    id: currentUser.id,
    institutionName: currentUser.profile?.organization || 'Institution',
    institutionEmail: currentUser.email,
    institutionType: currentUser.profile?.designation || 'university'
  };

  return (
    <ErrorBoundary>
      <InstitutionDashboard user={institutionUser} onLogout={handleLogout} />
    </ErrorBoundary>
  );
}

// Main App Component with Routes
function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const user = JSON.parse(stored);
        // Validate that the user object has required fields
        if (user && user.id && user.email && user.role) {
          return user;
        }
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('currentUser');
    }
    return null;
  });

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/institution" element={<InstitutionPage />} />
          <Route path="/mock-test" element={<MockTestPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
