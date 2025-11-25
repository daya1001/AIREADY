import { useState } from 'react';
import { X, User, Building2, Mail, Phone, MapPin, CheckCircle, CreditCard, DollarSign } from 'lucide-react';
import { paymentService, COURSES, CoursePrice } from '../services/paymentService';
import { leadService, LeadType } from '../services/leadService';

interface RegistrationFormProps {
  onClose: () => void;
}

type RegistrationType = 'individual' | 'university' | 'school' | 'organization';

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [step, setStep] = useState<'type' | 'form' | 'course' | 'success'>('type');
  const [registrationType, setRegistrationType] = useState<RegistrationType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    address: '',
    additionalInfo: '',
  });

  const handleTypeSelect = (type: RegistrationType) => {
    setRegistrationType(type);
    setStep('form');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (registrationType === 'individual') {
        // For Individual Professional, move to course selection
        setStep('course');
      } else {
        // For University, School, Organization - create lead
        const leadType: LeadType = registrationType as LeadType;

        await leadService.createLead({
          type: leadType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          address: formData.address,
          additionalInfo: formData.additionalInfo,
          status: 'new',
          assignedTo: null, // Default value
          estimatedValue: null, // Default value
          followUpDate: null, // Default value
        });

        setStep('success');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCourseSelection = async () => {
    if (!selectedCourse) {
      alert('Please select a course');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create Razorpay order
      const paymentDetails = await paymentService.createOrder(selectedCourse, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });

      // Process payment
      const paymentResult = await paymentService.processPayment(paymentDetails);

      if (paymentResult.success) {
        // Verify payment
        const verified = await paymentService.verifyPayment(
          paymentResult.paymentId!,
          paymentDetails.orderId
        );

        if (verified) {
          setPaymentCompleted(true);
          setStep('success');
          // TODO: Create user account and grant access to dashboard
          console.log('Payment successful! Payment ID:', paymentResult.paymentId);
        } else {
          alert('Payment verification failed. Please contact support.');
        }
      } else {
        alert(paymentResult.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeLabel = () => {
    switch (registrationType) {
      case 'individual':
        return 'Individual Professional';
      case 'university':
        return 'University';
      case 'school':
        return 'School/College';
      case 'organization':
        return 'AI Service Provider';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">
            {step === 'type' && 'Select Certification Type'}
            {step === 'form' && 'Registration Details'}
            {step === 'course' && 'Select Your Course'}
            {step === 'success' && (registrationType === 'individual' && paymentCompleted ? 'Payment Successful!' : 'Registration Received!')}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {step === 'type' && (
            <div className="space-y-4">
              <p className="text-slate-600 mb-6">
                Choose the certification category that best describes you or your organization.
              </p>
              <button
                onClick={() => handleTypeSelect('individual')}
                className="w-full bg-gradient-to-br from-primary-50 to-red-50 border-2 border-primary-200 rounded-xl p-6 hover:border-primary-400 transition-all text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-500 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Individual Professional</h3>
                    <p className="text-slate-600 text-sm">
                      For professionals seeking personal AI competency certification
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleTypeSelect('university')}
                className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-all text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">University</h3>
                    <p className="text-slate-600 text-sm">
                      For higher education institutions implementing AI-ready programs
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleTypeSelect('school')}
                className="w-full bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 hover:border-orange-400 transition-all text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">School or College</h3>
                    <p className="text-slate-600 text-sm">
                      For educational campuses integrating AI literacy programs
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleTypeSelect('organization')}
                className="w-full bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-6 hover:border-violet-400 transition-all text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-violet-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">AI Service Provider</h3>
                    <p className="text-slate-600 text-sm">
                      For organizations providing AI solutions and services
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600">
                  Selected: <span className="font-semibold text-slate-900">{getTypeLabel()}</span>
                  <button
                    type="button"
                    onClick={() => setStep('type')}
                    className="ml-2 text-primary-500 hover:text-primary-600 text-sm font-medium"
                  >
                    Change
                  </button>
                </p>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <User className="w-4 h-4" />
                  <span>Full Name {registrationType !== 'individual' && '/ Contact Person'}</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {registrationType !== 'individual' && (
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>Organization Name</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required={registrationType === 'university' || registrationType === 'school' || registrationType === 'organization'}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter organization name"
                  />
                </div>
              )}

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="City, State, Country"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
                  <span>Additional Information (Optional)</span>
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('type')}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </form>
          )}

          {step === 'course' && (
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600">
                  Registering as: <span className="font-semibold text-slate-900">{formData.name}</span>
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="ml-2 text-primary-500 hover:text-primary-600 text-sm font-medium"
                  >
                    Edit Details
                  </button>
                </p>
              </div>

              <p className="text-slate-600 mb-6">
                Select the certification track that best fits your career goals and complete payment to get started.
              </p>

              <div className="space-y-4">
                {COURSES.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => setSelectedCourse(course.id)}
                    className={`w-full border-2 rounded-xl p-6 text-left transition-all hover:shadow-md ${
                      selectedCourse === course.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 bg-white hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{course.name}</h3>
                        <p className="text-sm text-slate-600">{course.description}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="flex items-center space-x-1 text-2xl font-bold text-primary-600">
                          <span className="text-base">₹</span>
                          <span>{course.price.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-500">{course.currency}</p>
                      </div>
                    </div>
                    {selectedCourse === course.id && (
                      <div className="flex items-center space-x-2 mt-3 text-sm text-primary-600 font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        <span>Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCourseSelection}
                  disabled={!selectedCourse || isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-lg hover:opacity-90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              {registrationType === 'individual' && paymentCompleted ? (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Payment Successful!</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Your payment has been processed successfully. Welcome to AI Ready certification program!
                  </p>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                    <h4 className="font-bold text-slate-900 mb-2">Next Steps:</h4>
                    <ol className="text-left text-slate-600 space-y-2 text-sm">
                      <li>1. Check your email for account activation link</li>
                      <li>2. Login to your dashboard and start learning</li>
                      <li>3. Complete course modules and practice tests</li>
                      <li>4. Schedule your certification exam on Talview</li>
                      <li>5. Receive your certificate via Credly upon passing</li>
                    </ol>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-purple-600 to-red-600 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all font-semibold"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Registration Received!</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Thank you for your interest in AI Ready certification for your {getTypeLabel().toLowerCase()}. Our team will contact you shortly to discuss the program details and pricing.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="font-bold text-slate-900 mb-2">What happens next?</h4>
                    <ol className="text-left text-slate-600 space-y-2 text-sm">
                      <li>1. Our sales team will reach out within 24-48 hours</li>
                      <li>2. We'll schedule a consultation to understand your needs</li>
                      <li>3. You'll receive a customized proposal with pricing</li>
                      <li>4. Once approved, we'll onboard your institution</li>
                    </ol>
                  </div>
                  <p className="text-sm text-slate-500 mb-6">
                    You can also reach us at <a href="mailto:sales@etaiready.com" className="text-primary-600 font-semibold hover:underline">sales@etaiready.com</a>
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
