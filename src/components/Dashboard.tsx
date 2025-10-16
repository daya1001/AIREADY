import { useState, useEffect } from 'react';
import { BookOpen, FileText, Award, CheckCircle, Clock, AlertCircle, LogOut, User as UserIcon, Download, ExternalLink, PlayCircle, BarChart3, TrendingUp, Crown, Users, Briefcase, Code, Book as BookIcon, Calendar, Target, Star, ShoppingCart, RefreshCw, Bell } from 'lucide-react';
import { User } from '../services/authService';
import { authService } from '../services/authService';
import { updateCourseProgress } from '../services/database';
import curriculumData from '../data/curriculum.json';
import mockTestsData from '../data/mockTests.json';
import certificationTracksData from '../data/certificationTracks.json';
import MockTestInterface from './MockTestInterface';
import UserProfile from './UserProfile';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [localUser, setLocalUser] = useState(user);

  const curriculum = curriculumData.modules;
  const availableTests = mockTestsData.tests;
  const certificationTracks = certificationTracksData.tracks;

  // Get user's enrolled certification track
  const enrolledTrack = certificationTracks.find(track => track.id === localUser.certificationTrack);

  // Get icon component based on track icon name
  const getTrackIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      crown: Crown,
      users: Users,
      briefcase: Briefcase,
      code: Code,
      book: BookIcon,
    };
    const IconComponent = icons[iconName] || Star;
    return IconComponent;
  };

  // Get color classes based on track color
  const getTrackColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
    };
    return colors[color] || colors.purple;
  };

  // Refresh user data when window regains focus (in case test was completed in another tab)
  useEffect(() => {
    const handleFocus = async () => {
      const refreshedUser = await authService.refreshUserData();
      if (refreshedUser) {
        setLocalUser(refreshedUser);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Get user's module progress
  const getUserModuleProgress = (moduleId: string) => {
    const module = localUser.courseProgress.modules.find(m => m.moduleId === moduleId);
    return module || { progress: 0, status: 'not_started' };
  };

  // Mark module as completed
  const handleMarkAsCompleted = async (moduleId: string) => {
    try {
      const moduleIndex = localUser.courseProgress.modules.findIndex(m => m.moduleId === moduleId);

      // Calculate new overall progress
      let updatedModules;
      if (moduleIndex !== -1) {
        // Update existing module
        updatedModules = [...localUser.courseProgress.modules];
        updatedModules[moduleIndex] = {
          ...updatedModules[moduleIndex],
          progress: 100,
          status: 'completed'
        };
      } else {
        // Add new module progress
        updatedModules = [...localUser.courseProgress.modules, {
          moduleId,
          progress: 100,
          status: 'completed'
        }];
      }

      const totalModules = curriculum.length;
      const completedModules = updatedModules.filter(m => m.status === 'completed').length;
      const overallProgress = Math.round((completedModules / totalModules) * 100);

      // Update in database
      await updateCourseProgress(parseInt(localUser.id), moduleId, {
        progress: 100,
        status: 'completed',
        overallProgress
      });

      // Refresh user data from database
      const refreshedUser = await authService.refreshUserData();
      if (refreshedUser) {
        setLocalUser(refreshedUser);
        alert(`Module marked as completed! Your progress is now ${overallProgress}%`);
      }
    } catch (error) {
      console.error('Error marking module as completed:', error);
      alert('Failed to update progress. Please try again.');
    }
  };

  // Handle curriculum PDF download
  const handleDownloadCurriculum = (moduleId: string) => {
    const module = curriculum.find(m => m.id === moduleId);
    if (module) {
      // In a real app, this would download the actual PDF
      alert(`Downloading curriculum for: ${module.title}\n\nIn production, this would download the PDF from: ${module.pdfUrl}`);
    }
  };

  // Handle opening mock test in new tab
  const handleOpenMockTest = (testId: string) => {
    const testUrl = `/mock-test?id=${testId}`;
    window.open(testUrl, '_blank');
  };

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  // Calculate certificate expiry status
  const getCertificateExpiryStatus = () => {
    if (!localUser.certificateExpiryDate) return null;

    const expiryDate = new Date(localUser.certificateExpiryDate);
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return { status: 'expired', daysUntilExpiry, message: 'Certificate has expired' };
    } else if (expiryDate <= threeMonthsFromNow) {
      return { status: 'expiring_soon', daysUntilExpiry, message: `Certificate expires in ${daysUntilExpiry} days` };
    }
    return { status: 'active', daysUntilExpiry, message: 'Certificate is active' };
  };

  // Handle addon attempts purchase
  const handlePurchaseAddonAttempts = () => {
    if (!enrolledTrack) return;

    const confirmed = confirm(
      `Purchase 2 addon exam attempts for ₹${enrolledTrack.addonAttemptsPrice}?\n\n` +
      `This is a 50% discount from the regular exam price.\n` +
      `You will get 2 additional attempts to pass the exam.`
    );

    if (confirmed) {
      // In production, this would integrate with payment gateway
      alert(
        `Addon Attempts Purchase\n\n` +
        `Amount: ₹${enrolledTrack.addonAttemptsPrice}\n` +
        `Attempts: 2\n\n` +
        `In production, this would redirect to payment gateway.\n` +
        `After successful payment, 2 attempts will be added to your account.`
      );
    }
  };

  // Handle certificate reissue
  const handleReissueCertificate = () => {
    if (!enrolledTrack) return;

    const confirmed = confirm(
      `Reissue Certificate & Re-exam\n\n` +
      `Amount: ₹${enrolledTrack.reExamPrice}\n` +
      `Validity: 3 years from date of passing\n` +
      `Attempts: 3 new attempts\n\n` +
      `Proceed with payment?`
    );

    if (confirmed) {
      // In production, this would integrate with payment gateway
      alert(
        `Certificate Reissue Payment\n\n` +
        `Amount: ₹${enrolledTrack.reExamPrice}\n\n` +
        `In production, this would redirect to payment gateway.\n` +
        `After successful payment and passing the exam, your certificate will be reissued with 3 years validity.`
      );
    }
  };

  const getStatusBadge = () => {
    switch (user.examStatus) {
      case 'passed':
        return (
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Passed</span>
          </div>
        );
      case 'failed':
        return (
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Failed - {user.remainingAttempts} Attempts Remaining</span>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Not Attempted</span>
          </div>
        );
    }
  };

  return (
    <>
      {selectedTestId && (
        <MockTestInterface
          testId={selectedTestId}
          onClose={() => setSelectedTestId(null)}
        />
      )}

      {showProfile && (
        <UserProfile
          user={user}
          onClose={() => setShowProfile(false)}
          onSave={(updatedUser) => {
            // In production, this would update the database
            console.log('Saving updated user:', updatedUser);
            alert('Profile updated successfully! In production, this would save to the database.');
            setShowProfile(false);
          }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <img
                  src="https://economictimes.indiatimes.com/photo/119331595.cms"
                  alt="AI Ready Logo"
                  className="h-10 object-contain"
                />
                <span className="text-xl font-bold text-slate-900">Dashboard</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowProfile(true)}
                  className="hidden md:flex items-center space-x-3 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <UserIcon className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-white/90">Continue your AI learning journey and achieve certification</p>
          </div>

          {/* Certificate Expiry Warning */}
          {(() => {
            const expiryStatus = getCertificateExpiryStatus();
            if (!expiryStatus || expiryStatus.status === 'active') return null;

            return (
              <div className={`rounded-xl p-6 mb-8 border-2 ${
                expiryStatus.status === 'expired'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Bell className={`w-6 h-6 ${
                      expiryStatus.status === 'expired' ? 'text-red-600' : 'text-yellow-600'
                    } flex-shrink-0 mt-1`} />
                    <div>
                      <h3 className={`text-lg font-bold ${
                        expiryStatus.status === 'expired' ? 'text-red-900' : 'text-yellow-900'
                      } mb-2`}>
                        {expiryStatus.status === 'expired' ? 'Certificate Expired' : 'Certificate Expiring Soon'}
                      </h3>
                      <p className={`${
                        expiryStatus.status === 'expired' ? 'text-red-700' : 'text-yellow-700'
                      } mb-3`}>
                        {expiryStatus.message}
                      </p>
                      <p className={`text-sm ${
                        expiryStatus.status === 'expired' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {expiryStatus.status === 'expired'
                          ? 'Your certificate has expired. Purchase a re-exam to get a new certificate with 3 years validity.'
                          : 'Your certificate will expire soon. Consider purchasing a re-exam to extend your certification.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReissueCertificate}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                      expiryStatus.status === 'expired'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                    }`}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reissue Certificate</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-slate-900">{curriculum.length}</span>
              </div>
              <h3 className="text-slate-600 font-semibold">Total Modules</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-slate-900">{localUser.courseProgress.overallProgress}%</span>
              </div>
              <h3 className="text-slate-600 font-semibold">Course Progress</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
                <span className="text-3xl font-bold text-slate-900">
                  {(user.remainingAttempts || 0) + (user.addonAttempts || 0)}
                </span>
              </div>
              <h3 className="text-slate-600 font-semibold">Exam Attempts Left</h3>
              {user.addonAttempts > 0 && (
                <p className="text-xs text-slate-500 mt-2">
                  ({user.remainingAttempts} regular + {user.addonAttempts} addon)
                </p>
              )}
            </div>
          </div>

          {/* Take Final Exam & Certification Section - Two Column Layout for Non-Passed Users */}
          {user.examStatus !== 'passed' ? (
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Take Final Exam Section */}
              {((user.remainingAttempts || 0) + (user.addonAttempts || 0)) > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-md p-6 border-2 border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Take Final Exam</h2>
                      <p className="text-sm text-slate-600">
                        {user.examStatus === 'not_attempted'
                          ? 'Earn your certificate'
                          : 'Try again!'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
                      <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-blue-600">2 Hrs</p>
                      <p className="text-xs text-slate-600">Duration</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
                      <Target className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-blue-600">{enrolledTrack?.passingScore || 70}%</p>
                      <p className="text-xs text-slate-600">Pass Score</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-blue-200 text-center">
                      <AlertCircle className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-blue-600">
                        {(user.remainingAttempts || 0) + (user.addonAttempts || 0)}
                      </p>
                      <p className="text-xs text-slate-600">Attempts</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-blue-200 mb-4">
                    <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Requirements:</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Stable internet & quiet environment</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Webcam enabled for proctoring</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Valid ID for verification</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Complete practice tests (70%+)</span>
                      </li>
                    </ul>
                  </div>

                  {localUser.courseProgress.overallProgress < 100 && (
                    <div className="flex items-center space-x-2 text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200 mb-4 text-xs">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="font-semibold">
                        Complete modules ({localUser.courseProgress.overallProgress}% done)
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      // In production, this would redirect to Talview exam platform
                      alert(
                        'Redirecting to Talview Exam Platform\n\n' +
                        'In production, this would:\n' +
                        '1. Verify your identity\n' +
                        '2. Initialize the proctoring system\n' +
                        '3. Start your certification exam\n\n' +
                        'The exam will be monitored for integrity and security.'
                      );
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-md font-semibold"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Start Final Exam</span>
                  </button>
                </div>
              )}

              {/* Certification Section - Not Passed */}
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-xl font-bold text-slate-900">My Certification</h2>
                </div>

                <div className="text-center mb-4">
                  <Award className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {user.examStatus === 'failed' ? 'Keep Trying!' : 'Certificate Awaits'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {user.examStatus === 'failed'
                      ? "Review modules and try again!"
                      : 'Pass the exam to get certified'}
                  </p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <h4 className="text-sm font-semibold text-slate-900">Official Certificate</h4>
                    </div>
                    <p className="text-xs text-slate-600">PDF with unique verification number</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-semibold text-slate-900">Credly Badge</h4>
                    </div>
                    <p className="text-xs text-slate-600">Shareable on LinkedIn & social media</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <h4 className="text-sm font-semibold text-slate-900">3 Years Validity</h4>
                    </div>
                    <p className="text-xs text-slate-600">Industry-recognized certification</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <p className="text-xs text-blue-900 text-center">
                    <strong>Next:</strong> {user.examStatus === 'failed'
                      ? 'Review weak areas and retake exam'
                      : localUser.courseProgress.overallProgress < 100
                        ? `Complete modules (${localUser.courseProgress.overallProgress}%)`
                        : 'Take the final exam now!'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Certification Section - Passed Users (Full Width) */
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-2 border-slate-200">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-slate-900">My Certification</h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Certificate Details */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-600 p-3 rounded-xl">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Congratulations!</h3>
                      <p className="text-sm text-slate-600">You are AI Ready Certified</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-green-200">
                      <span className="text-sm text-slate-600">Certificate Number</span>
                      <span className="font-semibold text-slate-900">{user.certificateNumber || 'AIREADY-2025-XXXX'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-green-200">
                      <span className="text-sm text-slate-600">Issued Date</span>
                      <span className="font-semibold text-slate-900">
                        {user.certificateIssuedDate
                          ? new Date(user.certificateIssuedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                          : 'January 15, 2025'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-green-200">
                      <span className="text-sm text-slate-600">Expiry Date</span>
                      <span className="font-semibold text-slate-900">
                        {user.certificateExpiryDate
                          ? new Date(user.certificateExpiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                          : 'January 15, 2028'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-slate-600">Status</span>
                      <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Active</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        alert('Downloading your AI Ready Certificate...\n\nIn production, this would download the official PDF certificate.');
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Certificate (PDF)</span>
                    </button>
                  </div>
                </div>

                {/* Credly Badge & Sharing */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span>Digital Badge (Credly)</span>
                    </h4>

                    {user.credlyBadgeUrl ? (
                      <div className="text-center">
                        <div className="bg-white p-6 rounded-lg border-2 border-blue-200 mb-4 inline-block">
                          <Award className="w-24 h-24 text-blue-600 mx-auto" />
                          <p className="text-sm font-semibold text-slate-900 mt-2">AI Ready Certified</p>
                        </div>
                        <a
                          href={user.credlyBadgeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>View on Credly</span>
                        </a>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="w-16 h-16 text-blue-300 mx-auto mb-3" />
                        <p className="text-sm text-slate-600 mb-3">Your Credly badge is being generated</p>
                        <p className="text-xs text-slate-500">You'll receive an email within 3-5 business days</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                      <Star className="w-5 h-5 text-purple-600" />
                      <span>Share Your Achievement</span>
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Let the world know about your AI Ready certification!
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          alert('Sharing on LinkedIn...\n\nIn production, this would open LinkedIn share dialog with your certification details.');
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm font-semibold"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Share on LinkedIn</span>
                      </button>
                      <button
                        onClick={() => {
                          alert('Sharing on Twitter...\n\nIn production, this would open Twitter share dialog with your certification details.');
                        }}
                        className="w-full flex items-center justify-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-all text-sm font-semibold"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Share on Twitter</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enrolled Program Section */}
          {enrolledTrack && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-2 border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-slate-900">My Enrolled Program</h2>
                </div>
                <div className={`px-4 py-2 ${getTrackColorClasses(enrolledTrack.color).bg} ${getTrackColorClasses(enrolledTrack.color).text} rounded-full font-semibold`}>
                  Active
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Program Info */}
                <div className="lg:col-span-2">
                  <div className={`flex items-start space-x-4 p-6 ${getTrackColorClasses(enrolledTrack.color).bg} rounded-xl border-2 ${getTrackColorClasses(enrolledTrack.color).border}`}>
                    {(() => {
                      const IconComponent = getTrackIcon(enrolledTrack.icon);
                      return <IconComponent className={`w-12 h-12 ${getTrackColorClasses(enrolledTrack.color).text} flex-shrink-0`} />;
                    })()}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{enrolledTrack.name}</h3>
                      <p className="text-slate-700 mb-4">{enrolledTrack.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600"><strong>Validity:</strong> {enrolledTrack.validity}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600"><strong>Passing Score:</strong> {enrolledTrack.passingScore}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600"><strong>Enrolled:</strong> {localUser.enrollment.enrolledDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600"><strong>Program Ends:</strong> {localUser.enrollment.expiryDate || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>Target Audience</span>
                        </h4>
                        <p className="text-sm text-slate-600">{enrolledTrack.targetAudience}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Competencies & Progress */}
                <div className="space-y-4">
                  {/* Progress Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span>Overall Progress</span>
                    </h4>
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-3xl font-bold text-purple-600">{localUser.courseProgress.overallProgress}%</span>
                        <span className="text-sm text-slate-600">Complete</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-full transition-all duration-300"
                          style={{ width: `${localUser.courseProgress.overallProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-3">
                      {localUser.courseProgress.modules.filter(m => m.status === 'completed').length} of {enrolledTrack.modules.length} modules completed
                    </p>
                  </div>

                  {/* Key Competencies */}
                  <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <span>Key Competencies</span>
                    </h4>
                    <ul className="space-y-2">
                      {enrolledTrack.competencies.slice(0, 5).map((comp, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Addon Attempts Purchase Section */}
          {enrolledTrack && user.examStatus === 'failed' && (user.remainingAttempts || 0) === 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 mb-8 border-2 border-purple-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <ShoppingCart className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Need More Attempts?</h3>
                    <p className="text-slate-700 mb-4">
                      You've used all your regular exam attempts. Purchase addon attempts at 50% discount to continue your certification journey.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                        <h4 className="font-semibold text-slate-900 mb-2">What you get:</h4>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>2 additional exam attempts</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>50% discount (₹{enrolledTrack.addonAttemptsPrice} only)</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Same certification validity</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-purple-200 flex flex-col justify-center items-center text-center">
                        <p className="text-slate-600 mb-2">Regular Price:</p>
                        <p className="text-slate-400 line-through text-lg">₹{enrolledTrack.price}</p>
                        <p className="text-purple-600 font-bold text-3xl mb-2">₹{enrolledTrack.addonAttemptsPrice}</p>
                        <p className="text-sm text-green-600 font-semibold">Save 50%!</p>
                      </div>
                    </div>
                    <button
                      onClick={handlePurchaseAddonAttempts}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all font-semibold shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>Purchase Addon Attempts</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Two Column Layout for Tests and Learning */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Mock Test Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-slate-900">Mock Tests</h2>
              </div>
              <p className="text-slate-600 mb-6">
                Practice your knowledge with our comprehensive mock tests before taking the final exam.
              </p>
              <div className="space-y-4">
                {availableTests.map((test) => {
                  const userTest = user.mockTests.find(t => t.testId === test.id);
                  return (
                    <div key={test.id} className="border border-slate-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 mb-1">{test.title}</h4>
                          <p className="text-sm text-slate-600 mb-2">
                            {test.totalQuestions} questions • {test.duration} minutes • Pass: {test.passingScore}%
                          </p>
                          {userTest?.completed && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-semibold text-green-600">
                                Completed: {userTest.score}%
                              </span>
                              {userTest.score && userTest.score >= test.passingScore && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleOpenMockTest(test.id)}
                          className="flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-all font-semibold"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{userTest?.completed ? 'Retake' : 'Start'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Mock Test 3</h4>
                      <p className="text-sm text-slate-600">Coming Soon</p>
                    </div>
                    <button className="bg-slate-200 text-slate-400 px-4 py-2 rounded-lg cursor-not-allowed font-semibold">
                      Locked
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Test Performance Analysis */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Performance Analysis</h2>
              </div>

              {localUser.mockTests.some(t => t.completed) ? (
                <div className="space-y-6">
                  {/* Overall Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-blue-700">Tests Done</span>
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-xl font-bold text-blue-600">
                        {localUser.mockTests.filter(t => t.completed).length}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-green-700">Avg Score</span>
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        {(() => {
                          const completedTests = localUser.mockTests.filter(t => t.completed && t.score !== null);
                          if (completedTests.length === 0) return 0;
                          return Math.round(
                            completedTests.reduce((acc, t) => acc + (t.score || 0), 0) / completedTests.length
                          );
                        })()}%
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-purple-700">Pass Rate</span>
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <p className="text-xl font-bold text-purple-600">
                        {(() => {
                          const completedTests = localUser.mockTests.filter(t => t.completed);
                          if (completedTests.length === 0) return 0;
                          const passedTests = localUser.mockTests.filter(t => t.completed && t.score && t.score >= 70).length;
                          return Math.round((passedTests / completedTests.length) * 100);
                        })()}%
                      </p>
                    </div>
                  </div>

                  {/* Individual Test Performance */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3">Test Results</h3>
                    <div className="space-y-2">
                      {availableTests.map((test) => {
                        const userTest = localUser.mockTests.find(t => t.testId === test.id);
                        if (!userTest?.completed) return null;

                        const score = userTest.score || 0;
                        const passed = score >= test.passingScore;

                        return (
                          <div key={test.id} className="border border-slate-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-slate-900 text-sm">{test.title}</h4>
                              <div className={`text-lg font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                                {score}%
                              </div>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  passed
                                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                                    : 'bg-gradient-to-r from-red-500 to-red-600'
                                }`}
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                            <div className="mt-2">
                              {score >= 90 ? (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">Excellent</span>
                              ) : score >= 70 ? (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">Good</span>
                              ) : score >= 50 ? (
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">Needs Improvement</span>
                              ) : (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">Poor</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">No mock tests completed yet</p>
                  <p className="text-sm text-slate-500">
                    Complete mock tests to see your performance analysis here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* My Learning Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-slate-900">My Learning</h2>
              </div>
            </div>
            <div className="space-y-4">
              {curriculum.map((module) => {
                const progress = getUserModuleProgress(module.id);
                return (
                  <div
                    key={module.id}
                    className="border border-slate-200 rounded-xl p-4 hover:border-red-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{module.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{module.duration} • {module.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {module.topics.slice(0, 3).map((topic, idx) => (
                            <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {topic}
                            </span>
                          ))}
                          {module.topics.length > 3 && (
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              +{module.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => handleDownloadCurriculum(module.id)}
                          className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-all whitespace-nowrap"
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-sm font-semibold">PDF</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all whitespace-nowrap">
                          <PlayCircle className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            {progress.status === 'completed' ? 'Review' : progress.status === 'in_progress' ? 'Continue' : 'Start'}
                          </span>
                        </button>
                        {progress.status !== 'completed' && (
                          <button
                            onClick={() => handleMarkAsCompleted(module.id)}
                            className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-all whitespace-nowrap"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-semibold">Complete</span>
                          </button>
                        )}
                        {progress.status === 'completed' && (
                          <div className="flex items-center space-x-2 bg-green-50 text-green-600 px-4 py-2 rounded-lg border border-green-200">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-semibold">Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-semibold text-slate-900">{progress.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-red-600 to-purple-600 h-full transition-all duration-300"
                          style={{ width: `${progress.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
