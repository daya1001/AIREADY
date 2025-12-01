import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, Phone, User, MapPin, CheckCircle } from 'lucide-react';
import { authService, User as UserType } from '../services/authService';

interface LoginProps {
  onLogin: (user: UserType) => void;
  onClose: () => void;
}

type Step = 'identify' | 'password' | 'signup' | 'success';

export default function Login({ onLogin, onClose }: LoginProps) {
  const [step, setStep] = useState<Step>('identify');
  const [identifier, setIdentifier] = useState(''); // Single field for email or phone
  const [email, setEmail] = useState(''); // Will be set based on identifier
  const [phone, setPhone] = useState(''); // Will be set based on identifier
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const handleIdentifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate that input is provided
    if (!identifier || identifier.trim() === '') {
      setError('Please enter your email address or mobile number');
      return;
    }

    // Determine if it's email or phone based on input
    const trimmedValue = identifier.trim();
    const isEmail = trimmedValue.includes('@') && trimmedValue.includes('.');
    const emailValue = isEmail ? trimmedValue : null;
    const phoneValue = !isEmail ? trimmedValue : null;

    setIsLoading(true);

    try {
      const result = await authService.checkUserExists(
        emailValue,
        phoneValue
      );

      if (result.exists) {
        // User exists, show password field
        setStep('password');
        // Set the correct value for display
        if (emailValue) {
          setEmail(emailValue);
          setPhone('');
        } else {
          setPhone(phoneValue || '');
          setEmail('');
        }
      } else {
        // User doesn't exist, show signup form
        setStep('signup');
        // Pre-fill email/phone in signup form
        setSignupData(prev => ({
          ...prev,
          email: emailValue || '',
          phone: phoneValue || '',
        }));
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await authService.login(
        email || null,
        phone || null,
        password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!signupData.name.trim()) {
      setError('Full Name is required');
      return;
    }

    if (!signupData.email && !signupData.phone) {
      setError('Either email or phone number is required');
      return;
    }

    if (!signupData.password) {
      setError('Password is required');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!signupData.address.trim()) {
      setError('Address is required');
      return;
    }

    setIsLoading(true);

    try {
      const user = await authService.signup({
        name: signupData.name,
        email: signupData.email || null,
        phone: signupData.phone || null,
        password: signupData.password,
        address: signupData.address,
      });

      if (user) {
        // Show success message first
        setStep('success');
        setError('');
        
        // Set email/phone for login step
        if (signupData.email) {
          setEmail(signupData.email);
          setPhone('');
        } else if (signupData.phone) {
          setPhone(signupData.phone);
          setEmail('');
        }
        
        // Show login (password) screen after 3 seconds
        setTimeout(() => {
          setStep('password');
          // Pre-fill password from signup (optional - user can change it)
          // setPassword(signupData.password);
        }, 3000);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToIdentify = () => {
    setStep('identify');
    setError('');
    setPassword('');
    setIdentifier('');
    setEmail('');
    setPhone('');
    setSignupData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      address: '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-purple-600 p-8 text-white">
          <button
            onClick={onClose}
            className="float-right text-white/80 hover:text-white transition-colors"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold mb-2">
            {step === 'identify' && 'Welcome Back'}
            {step === 'password' && 'Enter Password'}
            {step === 'signup' && 'Create Account'}
            {step === 'success' && 'Account Created!'}
          </h2>
          <p className="text-white/90">
            {step === 'identify' && 'Sign in to access your dashboard'}
            {step === 'password' && 'Enter your password to continue'}
            {step === 'signup' && 'Fill in your details to get started'}
            {step === 'success' && 'Your account has been created successfully'}
          </p>
        </div>

        {/* Form */}
        {step !== 'success' && (
        <form 
          onSubmit={
            step === 'identify' ? handleIdentifySubmit :
            step === 'password' ? handleLoginSubmit :
            handleSignupSubmit
          } 
          className="p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Step 1: Identify User (Email/Phone) */}
          {step === 'identify' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="Enter email or mobile number"
                    required
                    autoFocus
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Enter your email address or mobile number to continue
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !identifier.trim()}
                className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <span>Checking...</span>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Continue</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: Password (if user exists) */}
          {step === 'password' && (
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-slate-600">
                  {email && <span>Email: <strong>{email}</strong></span>}
                  {phone && <span>Phone: <strong>{phone}</strong></span>}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBackToIdentify}
                  className="flex-1 border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !password}
                  className="flex-1 bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Signup Form (if user doesn't exist) */}
          {step === 'signup' && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <User className="w-4 h-4" />
                  <span>Full Name <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address <span className="text-slate-400 text-xs">(Optional)</span></span>
                </label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number <span className="text-slate-400 text-xs">(Optional)</span></span>
                </label>
                <input
                  type="tel"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
                <p className="text-xs text-slate-500 mt-2">
                  * At least one of email or phone is required
                </p>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Address <span className="text-red-500">*</span></span>
                </label>
                <textarea
                  value={signupData.address}
                  onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors resize-none"
                  placeholder="Enter your address"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="Create a password (min 6 characters)"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBackToIdentify}
                  className="flex-1 border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      <span>Sign Up</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
        )}

        {/* Step 4: Success (after signup) */}
        {step === 'success' && (
          <div className="p-8">
            <div className="space-y-6 text-center py-8">
              <div className="flex justify-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Account Created Successfully!
                </h3>
                <p className="text-slate-600">
                  Welcome, <strong>{signupData.name}</strong>! Your account has been created.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <p className="text-sm text-green-800 font-semibold mb-2">What's next?</p>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✓ Enter your password to login</li>
                  <li>✓ Start exploring the certification courses</li>
                  <li>✓ Complete modules and take practice tests</li>
                </ul>
              </div>

              <div className="pt-4">
                <p className="text-sm text-slate-500">
                  Please enter your password to continue...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
