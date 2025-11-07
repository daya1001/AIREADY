import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award, Users, Building2, GraduationCap, ChevronRight, CheckCircle,
  Shield, Target, TrendingUp, Briefcase, Globe, Zap, FileCheck,
  Quote, Linkedin, ChevronDown
} from 'lucide-react';

// Home2 Page Component - New Design
export function Home2Page() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePathTab, setActivePathTab] = useState<number>(0);
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState<number>(0);

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFaqCategory = (category: number) => {
    setFaqCategory(category);
    setOpenFaq(null); // Close any open FAQ when switching categories
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://economictimes.indiatimes.com/photo/119331595.cms"
                alt="ET AI Ready"
                className="h-12 object-contain"
                style={{filter: 'brightness(0) invert(1)'}}
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#why-ai" className="text-slate-300 hover:text-white text-sm">Why AI Readiness</a>
              <a href="#benefits" className="text-slate-300 hover:text-white text-sm">Benefits</a>
              <a href="#process" className="text-slate-300 hover:text-white text-sm">Process</a>
              <a href="#curriculum" className="text-slate-300 hover:text-white text-sm">Curriculum</a>
            </div>
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - New Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Decorative circular rings - bottom right */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
          <div className="absolute bottom-0 right-0 w-64 h-64 border-4 border-purple-400 rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-48 h-48 border-4 border-pink-400 rounded-full"></div>
          <div className="absolute bottom-16 right-16 w-32 h-32 border-4 border-blue-400 rounded-full"></div>
        </div>

        {/* Purple glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:max-w-[85%]">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <GraduationCap className="w-4 h-4 text-purple-300" />
                <span className="text-sm font-medium text-purple-200">Certified For The Future</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block whitespace-nowrap">
                  Become <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">ET AI Ready.</span>
                </span>
                <span className="block mt-2 whitespace-nowrap">
                  Stay <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Future Ready!</span>
                </span>
              </h1>

              {/* Description with inline ET logo */}
              <p className="text-xl text-slate-200 leading-relaxed flex items-center flex-wrap">
                Get recognized by{' '}
                <img
                  src="https://economictimes.indiatimes.com/photo/119331595.cms"
                  alt="ET"
                  className="h-6 inline-block mx-1"
                  style={{filter: 'brightness(0) invert(1)'}}
                />
                {' '}for your readiness to lead in the AI era.
              </p>

              {/* CTA Button - White with blue text */}
              <div className="pt-4">
                <button
                  onClick={() => navigate('/register')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <span>Start Your Journey</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-200">No AI Experience Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-200">ET Certified Badge</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg h-[500px]">
                {/* Glow effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-pink-500/40 to-blue-500/40 rounded-full blur-3xl"></div>

                {/* Hero image */}
                <div className="relative z-10 flex items-center justify-center h-full animate-float">
                  <img
                    src="/hero-ai-hand.png"
                    alt="AI Certification"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to gradient illustration if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="relative w-full h-full flex items-center justify-center">
                            <div class="relative">
                              <div class="absolute inset-0 w-64 h-64 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-60"></div>
                              <div class="relative">
                                <div class="relative w-96 h-80 flex items-end justify-center">
                                  <div class="absolute bottom-0 w-80 h-48 bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 rounded-t-full opacity-90"></div>
                                  <div class="absolute top-8 left-1/2 transform -translate-x-1/2">
                                    <div class="relative">
                                      <div class="absolute -left-20 top-1/2 w-32 h-0.5 bg-purple-500"></div>
                                      <div class="absolute -left-24 top-1/2 -translate-y-2 w-32 h-0.5 bg-purple-500"></div>
                                      <div class="absolute -left-24 top-1/2 translate-y-2 w-32 h-0.5 bg-purple-500"></div>
                                      <div class="relative w-32 h-32 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 rounded-2xl shadow-2xl transform rotate-3">
                                        <div class="absolute inset-2 flex flex-col items-center justify-center text-center">
                                          <div class="text-4xl font-black text-orange-800 tracking-tight">AI</div>
                                          <div class="text-[10px] font-bold text-red-700 uppercase tracking-wide mt-1">Certification</div>
                                        </div>
                                        <div class="absolute top-0 right-0 w-8 h-8 bg-white rounded-full opacity-40 blur-md"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the ET AI Ready Certification Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About the <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">ET AI Ready</span> Certification
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent rounded-full"></div>
            </div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A globally recognized credential backed by The Economic Times, designed to validate your AI expertise and prepare you for leadership in the AI-driven future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Certification Highlights */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <h4 className="font-bold text-slate-900 mb-5 text-lg flex items-center">
                <Award className="w-6 h-6 mr-2 text-purple-600" />
                Certification Highlights
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-50 rounded-lg p-2 mr-3">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Program Type</h5>
                    <p className="text-slate-600 text-sm">Professional AI certification program with comprehensive curriculum</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-50 rounded-lg p-2 mr-3">
                    <FileCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Learning Approach</h5>
                    <p className="text-slate-600 text-sm">Self-paced online learning with flexible study schedule</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-50 rounded-lg p-2 mr-3">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Certificate Validity</h5>
                    <p className="text-slate-600 text-sm">3 years from certification date with renewal options</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-50 rounded-lg p-2 mr-3">
                    <Users className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Prerequisites</h5>
                    <p className="text-slate-600 text-sm">High school diploma (10+2) - No prior AI experience required</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-50 rounded-lg p-2 mr-3">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 text-sm">Backed By</h5>
                    <p className="text-slate-600 text-sm">The Economic Times - India's leading business publication</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h4 className="font-bold text-slate-900 mb-5 text-lg flex items-center">
                <Target className="w-6 h-6 mr-2 text-purple-600" />
                What You'll Master
              </h4>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>AI fundamentals, machine learning & generative AI</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>AI ethics, governance & responsible implementation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>Practical AI tools & business applications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                  <span>Strategic AI implementation in organizations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Get AI Certified - Dark Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-950 via-purple-900 to-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Who Can Get <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Certified?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              AI Ready certification is designed for everyone—from beginners to experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Individuals</h3>
              <p className="text-slate-300 text-sm">Professionals looking to validate their AI skills and advance their careers</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Universities</h3>
              <p className="text-slate-300 text-sm">Higher education institutions establishing AI-ready curricula and standards</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Organizations</h3>
              <p className="text-slate-300 text-sm">Companies validating team capabilities and driving AI transformation</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Service Providers</h3>
              <p className="text-slate-300 text-sm">Organizations delivering AI solutions seeking formal recognition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Path to ET AI Ready Certification Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              Path to <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">ET AI Ready</span> Certification
            </h2>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-200 mb-6">
            <div className="flex overflow-x-auto">
              {['Eligibility', 'Registration', 'Payment', 'Study', 'Exam'].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActivePathTab(index)}
                  className={`flex-1 min-w-0 px-4 py-3 border-b-4 transition-colors ${
                    activePathTab === index
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-transparent hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                      activePathTab === index ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`font-semibold text-sm text-center break-words ${activePathTab === index ? 'text-purple-600' : 'text-slate-600'}`}>
                      {tab}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {/* Tab 1 - Eligibility */}
            {activePathTab === 0 && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Eligibility Requirements</h4>

                <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                    <p className="text-slate-900 font-bold">Minimum Qualification</p>
                  </div>
                  <p className="text-slate-700">High school or secondary school diploma (10+2 or equivalent)</p>
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  The ET AI Ready certification is designed for everyone - from beginners to experienced professionals.
                  No prior AI knowledge or technical background required.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center mb-3">
                      <Award className="w-5 h-5 mr-2 text-blue-600" />
                      <h5 className="font-bold text-slate-900 text-sm">Professionals</h5>
                    </div>
                    <ul className="space-y-2 text-slate-600 text-xs">
                      <li>• Working professionals</li>
                      <li>• Career switchers</li>
                      <li>• Business leaders</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center mb-3">
                      <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                      <h5 className="font-bold text-slate-900 text-sm">Students</h5>
                    </div>
                    <ul className="space-y-2 text-slate-600 text-xs">
                      <li>• College students</li>
                      <li>• Fresh graduates</li>
                      <li>• Job seekers</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
                    <div className="flex items-center mb-3">
                      <Target className="w-5 h-5 mr-2 text-pink-600" />
                      <h5 className="font-bold text-slate-900 text-sm">Organizations</h5>
                    </div>
                    <ul className="space-y-2 text-slate-600 text-xs">
                      <li>• Educational institutions</li>
                      <li>• Corporate teams</li>
                      <li>• Training centers</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2 - Registration */}
            {activePathTab === 1 && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Simple Registration Process</h4>

                <p className="text-slate-600 mb-6">
                  Quick and easy registration! Just provide basic information to get started. You can update additional details like profile picture and government-issued ID later through your dashboard.
                </p>

                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-200">
                    <h5 className="font-bold text-slate-900 mb-3">Basic Information</h5>
                    <p className="text-slate-600 text-sm mb-3">
                      Just the essentials to create your account
                    </p>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-purple-600 flex-shrink-0" />
                        <span>Full name</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-purple-600 flex-shrink-0" />
                        <span>Email address</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-purple-600 flex-shrink-0" />
                        <span>Phone number</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-purple-600 flex-shrink-0" />
                        <span>Create password</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border-2 border-pink-200">
                    <h5 className="font-bold text-slate-900 mb-3">Complete Payment</h5>
                    <p className="text-slate-600 text-sm mb-3">
                      Secure payment to finalize registration
                    </p>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-pink-600 flex-shrink-0" />
                        <span>One-time fee: ₹15,000</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-pink-600 flex-shrink-0" />
                        <span>Multiple payment options</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-pink-600 flex-shrink-0" />
                        <span>Instant confirmation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-pink-600 flex-shrink-0" />
                        <span>Immediate access to dashboard</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-5 mb-6">
                  <h5 className="font-bold text-slate-900 mb-3">Update Profile Later</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    After registration and payment, you'll get access to your personal dashboard where you can update additional details like your profile picture, government-issued ID, professional experience, and educational background at your convenience.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-5">
                  <h5 className="font-bold text-slate-900 mb-4">Quick Registration Steps</h5>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mb-3">1</div>
                      <p className="font-semibold text-slate-900 mb-1">Create Account</p>
                      <p className="text-xs">Enter basic details and create password</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mb-3">2</div>
                      <p className="font-semibold text-slate-900 mb-1">Make Payment</p>
                      <p className="text-xs">Complete secure payment of ₹15,000</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mb-3">3</div>
                      <p className="font-semibold text-slate-900 mb-1">Access Dashboard</p>
                      <p className="text-xs">Start learning and update profile</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 text-center italic">
                    ⏱️ Registration takes less than 5 minutes!
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3 - Payment */}
            {activePathTab === 2 && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Payment & Exam Scheduling</h4>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-5 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-green-900 mb-2">Application Accepted - What's Next?</h5>
                      <p className="text-green-800 text-sm leading-relaxed">
                        Congratulations on being accepted! You're one step closer to becoming ET AI Ready certified.
                        Complete your payment to unlock study materials and schedule your exam at your convenience.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
                    <h5 className="font-bold text-slate-900 mb-4">Certification Fee</h5>
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-purple-600 mb-1">₹15,000</div>
                      <p className="text-slate-600 text-sm">One-time payment</p>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        <span>Exam access</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        <span>Official certificate</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        <span>Digital badge (Credly)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        <span>Study materials</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        <span>Three exam attempts</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                    <h5 className="font-bold text-slate-900 mb-4">Flexible Scheduling</h5>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900">Online Exam</p>
                          <p className="text-xs">Take from home via AI proctoring</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900">24/7 Availability</p>
                          <p className="text-xs">Schedule any day, any time</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900">Instant Confirmation</p>
                          <p className="text-xs">Get exam slot confirmation immediately</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900">Reschedule Option</p>
                          <p className="text-xs">Change date up to 24 hours before</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-900 rounded-lg p-5 text-white mb-6">
                  <h5 className="font-bold mb-4">Accepted Payment Methods</h5>
                  <div className="grid md:grid-cols-4 gap-3 text-sm">
                    <div className="bg-white/10 rounded p-2 text-center">Credit Card</div>
                    <div className="bg-white/10 rounded p-2 text-center">Debit Card</div>
                    <div className="bg-white/10 rounded p-2 text-center">Net Banking</div>
                    <div className="bg-white/10 rounded p-2 text-center">UPI</div>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
                  <div className="flex items-start">
                    <div className="text-sm text-slate-700">
                      <p className="font-semibold mb-1">Additional Attempt Fee</p>
                      <p>Your fee includes 3 exam attempts. If you need more than 3 attempts, additional attempts are available for purchase at ₹5,000 each. Most candidates pass within the first three attempts with proper preparation.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4 - Study */}
            {activePathTab === 3 && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Prepare for Success</h4>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  Comprehensive study resources designed to help you master AI fundamentals and pass your certification
                  exam with confidence. Start your preparation journey today!
                </p>

                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 border-2 border-green-200">
                    <div className="flex items-center mb-4">
                      <GraduationCap className="w-6 h-6 mr-2 text-green-600" />
                      <h5 className="font-bold text-slate-900">Study Resources</h5>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">PDF Study Guides</p>
                          <p className="text-xs">Comprehensive coverage of all 9 modules</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Practice Tests</p>
                          <p className="text-xs">Mock exams with detailed explanations</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Case Studies</p>
                          <p className="text-xs">Real-world AI implementation scenarios</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Quick Reference</p>
                          <p className="text-xs">Cheat sheets for last-minute revision</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Progress Tracking</p>
                          <p className="text-xs">Monitor your learning journey with analytics</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                    <div className="flex items-center mb-4">
                      <Target className="w-6 h-6 mr-2 text-blue-600" />
                      <h5 className="font-bold text-slate-900">Preparation Tips</h5>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Start Early</p>
                          <p className="text-xs">Allow 4-6 weeks for thorough preparation</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Follow Schedule</p>
                          <p className="text-xs">Create and stick to a study plan</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Practice Regularly</p>
                          <p className="text-xs">Take mock tests to assess progress</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Understand Concepts</p>
                          <p className="text-xs">Focus on comprehension over memorization</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Join Community</p>
                          <p className="text-xs">Connect with fellow learners</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border-2 border-slate-200 hover:border-green-400 transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                      <FileCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <h6 className="font-bold text-slate-900 mb-2">Self-Paced Learning</h6>
                    <p className="text-slate-600 text-sm mb-2">Study at your own speed with comprehensive materials</p>
                    <span className="text-green-600 font-semibold text-xs">Recommended approach</span>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-slate-200 hover:border-purple-400 transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <h6 className="font-bold text-slate-900 mb-2">Practice Mode</h6>
                    <p className="text-slate-600 text-sm mb-2">Test your knowledge with mock exams</p>
                    <span className="text-purple-600 font-semibold text-xs">Essential prep</span>
                  </div>

                  <div className="bg-white rounded-lg p-4 border-2 border-slate-200 hover:border-blue-400 transition-all hover:shadow-md">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <FileCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <h6 className="font-bold text-slate-900 mb-2">Case Studies</h6>
                    <p className="text-slate-600 text-sm mb-2">Learn from real-world AI scenarios</p>
                    <span className="text-blue-600 font-semibold text-xs">Practical insights</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border-l-4 border-orange-500 mb-6">
                  <p className="text-slate-700 text-sm mb-2">
                    <span className="font-bold text-slate-900">Looking for additional learning resources?</span>
                  </p>
                  <p className="text-slate-600 text-xs mb-3">
                    While the certification program includes all necessary study materials, you can explore our optional masterclass for deeper AI knowledge:
                  </p>
                  <a
                    href="https://economictimes.indiatimes.com/masterclass/ai-for-business-professionals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 underline"
                  >
                    Economic Times Masterclass: AI for Business Professionals
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    Note: This is an external course and is NOT included in the ET AI Ready certification program or fee.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0 md:mr-6">
                      <h5 className="font-bold text-xl mb-2 flex items-center">
                        <FileCheck className="w-6 h-6 mr-2" />
                        Download Full Curriculum
                      </h5>
                      <p className="text-green-50 text-sm">
                        Get instant access to comprehensive study materials covering all 9 modules with detailed objectives
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/register')}
                      className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors whitespace-nowrap shadow-lg hover:shadow-xl"
                    >
                      Download Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5 - Exam */}
            {activePathTab === 4 && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Exam Day Information</h4>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  You're ready for the final step! Our secure, AI-proctored online exam ensures integrity while providing
                  a convenient testing experience from anywhere.
                </p>

                <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
                  <h5 className="text-slate-900 font-semibold mb-4 text-base">Exam At a Glance</h5>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-1">60</div>
                      <div className="text-slate-600 text-sm">Minutes</div>
                      <div className="text-slate-500 text-xs mt-1">(1 hour)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-1">100</div>
                      <div className="text-slate-600 text-sm">Questions</div>
                      <div className="text-slate-500 text-xs mt-1">(all scored)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-1">70%</div>
                      <div className="text-slate-600 text-sm">Passing Score</div>
                      <div className="text-slate-500 text-xs mt-1">(minimum)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-1">EN</div>
                      <div className="text-slate-600 text-sm">Language</div>
                      <div className="text-slate-500 text-xs mt-1">(English only)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-600 p-5 mb-6">
                  <div className="flex items-start">
                    <div>
                      <h5 className="font-bold text-slate-900 mb-3">Before You Begin</h5>
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-600">
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Stable internet (minimum 2 Mbps)</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Working webcam & microphone</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Government-issued photo ID</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Quiet, well-lit room</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Close unnecessary applications</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Test system 30 mins before</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border-2 border-green-200">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      <h6 className="font-bold text-green-900">Allowed</h6>
                    </div>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                        <span>Blank paper for notes</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                        <span>Water in clear container</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                        <span>Prescription eyewear</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                        <span>Basic calculator (if needed)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-5 border-2 border-red-200">
                    <div className="flex items-center mb-3">
                      <h6 className="font-bold text-red-900">Not Allowed</h6>
                    </div>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                        <span>Mobile phones</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                        <span>Reference materials</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                        <span>Other people in room</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                        <span>Headphones/earbuds</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border-2 border-blue-200">
                    <div className="flex items-center mb-3">
                      <Shield className="w-6 h-6 text-blue-600 mr-2" />
                      <h6 className="font-bold text-blue-900">Security</h6>
                    </div>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        <span>AI-powered proctoring</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        <span>Face visible at all times</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        <span>Room scan required</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        <span>ID verification</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-600 p-5 mb-6">
                  <div className="flex items-start">
                    <div>
                      <h5 className="font-bold text-slate-900 mb-3">Important Exam Policies</h5>
                      <div className="space-y-3 text-sm text-slate-700">
                        <div className="flex items-start">
                          <span className="font-semibold mr-2">⏱️ No Scheduled Breaks:</span>
                          <span>The exam runs continuously for 60 minutes without scheduled breaks. Plan accordingly before starting the exam.</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-semibold mr-2">🌐 Internet Disconnection:</span>
                          <span>If your internet disconnects during the exam, you can continue from where you left off. However, you will need to complete the full verification process again (ID check, room scan, face verification) to prevent cheating and maintain exam integrity.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-6">
                  <h5 className="font-bold text-xl mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2" />
                    After the Exam
                  </h5>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <h6 className="font-semibold mb-2">Results in 2-3 Working Days</h6>
                      <p className="text-purple-50 text-sm">
                        Our experts verify fair conduct and evaluate your exam. Results published after thorough review to ensure integrity.
                      </p>
                    </div>
                    <div>
                      <h6 className="font-semibold mb-2">Certificate Delivery</h6>
                      <p className="text-purple-50 text-sm">
                        Official certificate and Credly digital badge sent to your email within 3-5 business days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5">
                  <div className="flex items-start">
                    <div>
                      <h5 className="font-bold text-slate-900 mb-2">24/7 Technical Support</h5>
                      <p className="text-slate-700 text-sm">
                        Experiencing technical issues during your exam? Our support team is available round-the-clock via
                        live chat and phone to ensure your exam experience is smooth and successful.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Earn Your ET AI Ready Certificate Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Earn Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">ET AI Ready Certificate</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stand out with an official certification from The Economic Times
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 flex-shrink-0">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Official ET Certification</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Receive an official certificate from The Economic Times, India's leading business publication, validating your AI readiness and expertise.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 flex-shrink-0">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Secure & Proctored Assessment</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Take your certification exam through Talview's secure, AI-powered proctoring platform ensuring integrity and credibility.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 flex-shrink-0">
                  <FileCheck className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Digital Badges via Credly</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Share your verified digital badge on LinkedIn, email signatures, and professional profiles with Credly's trusted credentialing platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Sample Certificate */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 shadow-2xl">
                <img
                  src="/et-ai-certificate.png"
                  alt="ET AI Ready Certificate"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -left-3 bg-white rounded-full p-2 shadow-lg border-2 border-purple-600">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Certification Process - Dark Gradient */}
      <section id="process" className="py-20 bg-gradient-to-br from-purple-900 via-slate-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Simple <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Certification</span> Process
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get certified in 3 easy steps—from registration to receiving your digital badge
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                1
              </div>
              <div className="mb-4 mt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Registration</h3>
              <p className="text-slate-300 text-sm">Create your account and complete the registration process in minutes</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                2
              </div>
              <div className="mb-4 mt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                  <span className="text-4xl">✍️</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Take Exam and Pass</h3>
              <p className="text-slate-300 text-sm">Complete the AI-proctored online exam from anywhere at your convenience</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                3
              </div>
              <div className="mb-4 mt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-xl flex items-center justify-center">
                  <span className="text-4xl">🎓</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Certified</h3>
              <p className="text-slate-300 text-sm">Receive your ET AI Ready certificate and digital badge to share</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 shadow-xl text-lg font-semibold"
            >
              Start Your Journey Today
            </button>
          </div>
        </div>
      </section>

      {/* Why AI Readiness Matters - Redesigned */}
      <section id="why-ai" className="py-20 bg-white relative overflow-hidden">
        {/* Gradient background at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 opacity-60"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Why <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Readiness</span> Matters?
            </h2>
            <p className="text-lg text-slate-700 max-w-4xl mx-auto">
              In Today's Rapidly Evolving Technological Landscape, AI Competency Is No Longer Optional - It's A Necessity!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Three sections */}
            <div className="space-y-12">
              {/* Section 1 - Unprecedented Market Growth */}
              <div>
                <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">IT'S NEVER TOO LATE</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Unprecedented Market Growth</h3>
                <p className="text-slate-600 leading-relaxed">
                  The global AI market is projected to reach $1.8 trillion by 2030. Organisations need verified AI ready professionals to capitalise on this growth.
                </p>
              </div>

              {/* Section 2 - Global Recognition */}
              <div>
                <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">LEADING BRANDS PARTNER WITH US</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Global Recognition</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our Certification is recognised worldwide, opening doors to international opportunities and collaboration.
                </p>
              </div>

              {/* Section 3 - Competitive Advantage */}
              <div>
                <div className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3">STATE OF THE ART</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Competitive Advantage</h3>
                <p className="text-slate-600 leading-relaxed">
                  Stand out in the job market and demonstrate your institution's commitment to cutting edge education and innovation.
                </p>
              </div>
            </div>

            {/* Right side - Statistics and Gap Banner */}
            <div className="space-y-8">
              {/* Stat 1 - 87% */}
              <div>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-4 mb-3">
                  <div className="text-white text-4xl font-bold text-right">87%</div>
                </div>
                <p className="text-slate-900 font-bold text-lg text-center">Organisations Seeking Modern AI Skills</p>
              </div>

              {/* Stat 2 - 23% */}
              <div>
                <div className="grid grid-cols-3 gap-0 mb-3">
                  <div className="bg-orange-500 rounded-l-lg p-4 flex items-center justify-center">
                    <div className="text-white text-4xl font-bold">23%</div>
                  </div>
                  <div className="bg-gray-300 col-span-2 rounded-r-lg p-4 relative overflow-hidden">
                    {/* Diagonal stripe pattern */}
                    <div className="absolute inset-0 opacity-40" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                    }}></div>
                  </div>
                </div>
                <p className="text-slate-900 font-bold text-lg text-center">Professionals With Verified AI Skills</p>
              </div>

              {/* THE AI SKILLS GAP Banner */}
              <div className="mt-20 text-center">
                <h3 className="text-4xl font-bold text-red-600 mb-4 tracking-wider">THE AI SKILLS GAP!</h3>
                <p className="text-slate-900 text-base leading-relaxed font-medium">
                  Bridge The Gap With AI Ready Certification And Position Yourself<br />Or Your Organisation At The Forefront Of AI Revolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Certification Benefits */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI Certification</span> Benefits
            </h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Unlock A World Of Opportunities With Ai Ready Certification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Career Advancement */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <GraduationCap className="w-16 h-16" style={{
                  stroke: 'url(#gradient1)',
                  strokeWidth: 1.5
                }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Career Advancement</h3>
              <p className="text-slate-600 text-sm">
                Demonstrate Your AI Expertise To Employers And Unlock Higher Paying...
              </p>
            </div>

            {/* Credibility And Trust */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-16 h-16" style={{
                  stroke: 'url(#gradient2)',
                  strokeWidth: 1.5
                }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Credibility And Trust</h3>
              <p className="text-slate-600 text-sm">
                Demonstrate Your AI Expertise To Employers And Unlock Higher Paying...
              </p>
            </div>

            {/* Global Network */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Globe className="w-16 h-16" style={{
                  stroke: 'url(#gradient3)',
                  strokeWidth: 1.5
                }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Network</h3>
              <p className="text-slate-600 text-sm">
                Demonstrate Your AI Expertise To Employers And Unlock Higher Paying...
              </p>
            </div>

            {/* Digital Badges */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FileCheck className="w-16 h-16" style={{
                  stroke: 'url(#gradient4)',
                  strokeWidth: 1.5
                }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Badges</h3>
              <p className="text-slate-600 text-sm">
                Demonstrate Your AI Expertise To Employers And Unlock Higher Paying...
              </p>
            </div>

            {/* Skill Validation */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-16 h-16" style={{
                  stroke: 'url(#gradient5)',
                  strokeWidth: 1.5
                }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Skill Validation</h3>
              <p className="text-slate-600 text-sm">
                Demonstrate Your AI Expertise To Employers And Unlock Higher Paying...
              </p>
            </div>

            {/* Future Proof Career */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="w-16 h-16" style={{
                  stroke: 'url(#gradient6)',
                  strokeWidth: 1.5
                }} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Future Proof Career</h3>
              <p className="text-slate-600 text-sm">
                Demonstrate Your AI Expertise To Employers And Unlock Higher Paying...
              </p>
            </div>
          </div>

          {/* SVG Gradients for icons */}
          <svg width="0" height="0" style={{position: 'absolute'}}>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium shadow-md border border-purple-200/50 mb-6">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">9 Comprehensive Modules</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Certification <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">Curriculum</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A professionally designed curriculum that takes you from AI fundamentals to advanced implementation
            </p>
          </div>

          <div className="space-y-4">
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
              <div
                key={index}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl transition-all duration-300 ${
                  openModule === index
                    ? 'shadow-2xl ring-2 ring-purple-400/50'
                    : 'shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(index)}
                  className="w-full p-6 flex items-center gap-5 text-left"
                >
                  {/* Number Badge with Glow Effect */}
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    <div className="relative w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 text-white shadow-lg">
                      {module.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {module.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {module.desc}
                    </p>
                  </div>

                  {/* Expand Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 transition-all duration-300 ${
                      openModule === index ? 'rotate-180 bg-gradient-to-br from-purple-600 to-pink-600' : ''
                    }`}>
                      <ChevronDown
                        className={`w-6 h-6 transition-colors ${
                          openModule === index ? 'text-white' : 'text-purple-600'
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Expandable Content */}
                {openModule === index && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-xl p-6 border border-purple-200/30">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                        Topics Covered
                      </h4>
                      <div className="space-y-4">
                        {/* Professional Topics */}
                        <div>
                          <h5 className="text-sm font-medium text-purple-700 mb-2">Professional Concepts</h5>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {module.professional}
                          </p>
                        </div>

                        {/* Advanced Topics */}
                        <div>
                          <h5 className="text-sm font-medium text-pink-700 mb-2">Advanced Integration</h5>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {module.advanced}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Download CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 shadow-lg text-base font-semibold group"
            >
              <FileCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Download Full Curriculum</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Logos Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-600 font-semibold mb-8">
            Empowering Professionals At Top Organizations Worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" alt="Coca-Cola" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8 object-contain" />
          </div>
        </div>
      </section>

      {/* Certification Details Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900 via-slate-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-purple-400 bg-clip-text text-transparent">Certification Details</span>
            </h2>
            <p className="text-base text-white max-w-3xl mx-auto">
              Everything You Need To Know About The AI Ready Certification
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Certification Fee */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">₹15000</p>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Certification Fee</h3>
              <p className="text-slate-600 text-sm">
                One Time Payment Includes Certificate, Exam And A Digital Badge
              </p>
            </div>

            {/* Certification Validity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">3 Years</p>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Certification Validity</h3>
              <p className="text-slate-600 text-sm">
                One Time Payment Includes Certificate, Exam And A Digital Badge
              </p>
            </div>

            {/* Exam Duration */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">2 Hours</p>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Exam Duration</h3>
              <p className="text-slate-600 text-sm">
                One Time Payment Includes Certificate, Exam And A Digital Badge
              </p>
            </div>

            {/* Online Access */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">24/7</p>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Online Access</h3>
              <p className="text-slate-600 text-sm">
                One Time Payment Includes Certificate, Exam And A Digital Badge
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">
              <span className="text-slate-900">ET AI Ready Certification </span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">FAQs</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden sticky top-8">
                <button
                  onClick={() => handleFaqCategory(0)}
                  className={`w-full text-left px-6 py-4 border-l-4 transition-colors ${
                    faqCategory === 0
                      ? 'border-purple-600 bg-purple-50 text-purple-600 font-semibold'
                      : 'border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Certification Overview
                </button>
                <button
                  onClick={() => handleFaqCategory(1)}
                  className={`w-full text-left px-6 py-4 border-l-4 transition-colors ${
                    faqCategory === 1
                      ? 'border-purple-600 bg-purple-50 text-purple-600 font-semibold'
                      : 'border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Eligibility & Requirements
                </button>
                <button
                  onClick={() => handleFaqCategory(2)}
                  className={`w-full text-left px-6 py-4 border-l-4 transition-colors ${
                    faqCategory === 2
                      ? 'border-purple-600 bg-purple-50 text-purple-600 font-semibold'
                      : 'border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Exam & Assessment
                </button>
                <button
                  onClick={() => handleFaqCategory(3)}
                  className={`w-full text-left px-6 py-4 border-l-4 transition-colors ${
                    faqCategory === 3
                      ? 'border-purple-600 bg-purple-50 text-purple-600 font-semibold'
                      : 'border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Pricing & Support
                </button>
              </div>
            </div>

            {/* Right Content - FAQ Items */}
            <div className="lg:col-span-8 space-y-3">
              {/* Certification Overview FAQs */}
              {faqCategory === 0 && (
                <>
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(0)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">What is The ET AI Ready Certification?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 0 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 0 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 0 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        The ET AI Ready Certification is a globally recognized credential backed by The Economic Times, designed to validate your AI expertise and prepare you for leadership in the AI-driven future.
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(1)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">Who is this Certification For?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 1 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 1 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 1 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        This certification is perfect for professionals, students, business leaders, and organizations seeking to demonstrate AI competency. No prior AI experience is required—just a high school diploma (10+2).
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(2)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">What makes this certification globally recognized?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 2 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 2 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 2 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        The certification is backed by The Economic Times, one of India's most trusted business publications with global credibility. It follows internationally recognized AI competency frameworks and is accepted by leading organizations worldwide.
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Eligibility & Requirements FAQs */}
              {faqCategory === 1 && (
                <>
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(0)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">What are the eligibility requirements?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 0 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 0 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 0 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        The only requirement is a high school diploma (10+2 or equivalent). No prior AI experience or technical background is necessary. The program is designed to accommodate learners from all backgrounds.
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(1)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">Do I need programming knowledge?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 1 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 1 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 1 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        No programming knowledge is required. The certification focuses on AI concepts, applications, ethics, and strategic implementation rather than coding skills.
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Exam & Assessment FAQs */}
              {faqCategory === 2 && (
                <>
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(0)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">How is The Exam Conducted?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 0 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 0 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 0 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        The exam is conducted online with AI-powered proctoring. It consists of 100 questions to be completed in 60 minutes, with a passing score of 70%. You can take the exam from anywhere with a stable internet connection.
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(1)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">What Happens If I Fail The Exam?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 1 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 1 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 1 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        You get three attempts to pass the exam. If you don't pass on your first attempt, you can retake the exam after a waiting period. Additional study resources will be provided to help you succeed.
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Pricing & Support FAQs */}
              {faqCategory === 3 && (
                <>
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(0)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">What is the certification fee?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 0 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 0 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 0 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        The certification fee is ₹15,000, which includes the exam, certificate, and digital badge. This is a one-time payment with no recurring fees.
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(1)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-base font-semibold text-slate-900 pr-4">How long is the certification valid?</span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                          openFaq === 1 ? 'transform rotate-180' : ''
                        }`}
                        style={{color: openFaq === 1 ? '#9333ea' : '#64748b'}}
                      />
                    </button>
                    {openFaq === 1 && (
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                        The certification is valid for 3 years from the date of issue. After this period, you can renew your certification to stay current with evolving AI technologies.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Certified Professionals</span> Say
            </h2>
            <p className="text-lg text-slate-600">
              Hear From AI Leaders Who Transformed Their Careers With The ET AI Ready Program
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {[
              {
                name: 'Indian Name',
                role: 'Position',
                company: 'Company name',
                text: '"I am incredibly impressed with the outstanding service and user-friendly customer support provided by Remap"',
                image: '👨‍💼'
              },
              {
                name: 'Indian Name',
                role: 'Position',
                company: 'Company name',
                text: '"I am incredibly impressed with the outstanding service and user-friendly customer support provided by Remap"',
                image: '👩‍💼'
              },
              {
                name: 'Indian Name',
                role: 'Position',
                company: 'Company name',
                text: '"I am incredibly impressed with the outstanding service and user-friendly customer support provided by Remap"',
                image: '👨‍💻'
              },
              {
                name: 'Indian Name',
                role: 'Position',
                company: 'Company name',
                text: '"I am incredibly impressed with the outstanding service and user-friendly customer support provided by Remap"',
                image: '👩‍💻'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-slate-800 leading-relaxed mb-8 text-base">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <Linkedin className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-8">
            <button className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
              <ChevronDown className="w-5 h-5 text-red-500 rotate-90" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
              <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            </div>
            <button className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
              <ChevronDown className="w-5 h-5 text-red-500 -rotate-90" />
            </button>
          </div>
        </div>
      </section>

      {/* Let's Get Certified CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-200 relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-slate-900">Let's </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Get Certified</span>
          </h2>

          {/* Avatar Stack */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-lg">👨‍💼</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center text-lg">👩‍💼</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 border-2 border-white flex items-center justify-center text-lg">👨‍💻</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 border-2 border-white flex items-center justify-center text-lg">👩‍💻</div>
            </div>
            <p className="text-base font-medium text-slate-900">2000+ Already Registered</p>
          </div>

          <p className="text-lg text-slate-700 mb-8">
            Join Thousands Of Professionals And Organisations Who Are <span className="font-semibold">AI Ready</span>
          </p>

          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-base font-semibold border border-blue-100"
          >
            <span>Start Your Journey</span>
            <ChevronDown className="w-5 h-5 -rotate-90" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">ET AI Ready</h3>
              <p className="text-slate-400 text-sm">
                Empowering professionals with AI certification backed by The Economic Times
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#why-ai" className="block text-slate-400 hover:text-white text-sm">Why AI Readiness</a>
                <a href="#benefits" className="block text-slate-400 hover:text-white text-sm">Benefits</a>
                <a href="#process" className="block text-slate-400 hover:text-white text-sm">Process</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="block text-slate-400 hover:text-white text-sm">Terms of Service</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-slate-400 text-sm">
                support@etaiready.com
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            © 2025 ET AI Ready. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
