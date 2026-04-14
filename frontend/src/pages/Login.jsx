// SignIn.jsx
import { useState, useEffect } from 'react';
import Icon from '../components/ui/Icon';

export default function SignIn() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [workspaceDomain, setWorkspaceDomain] = useState('');
  const [isLoadingTenant, setIsLoadingTenant] = useState(false);
  const [tenantVerified, setTenantVerified] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState(['', '', '', '', '', '']);
  const [rememberMe, setRememberMe] = useState(false);

  // Apply theme to document
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleDomainBlur = async () => {
    if (workspaceDomain.length > 2) {
      setIsLoadingTenant(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoadingTenant(false);
        setTenantVerified(true);
        // Optionally show MFA after valid tenant
        // setShowMFA(true);
      }, 1500);
    } else {
      setTenantVerified(false);
    }
  };

  const handleMFAChange = (index, value) => {
    if (value.length <= 1) {
      const newMfaCode = [...mfaCode];
      newMfaCode[index] = value;
      setMfaCode(newMfaCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`mfa-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in attempt:', { workspaceDomain, email, password, mfaCode, rememberMe });
    // Implement actual sign in logic here
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const themeClasses = {
    // Background colors
    bgPrimary: isDarkTheme ? 'bg-[#0a0a0f]' : 'bg-gray-50',
    bgCard: isDarkTheme ? 'bg-[#1a1b23]' : 'bg-white',
    bgSurface: isDarkTheme ? 'bg-[#13141a]' : 'bg-gray-100',
    bgSurfaceCard: isDarkTheme ? 'bg-surface-card' : 'bg-gray-50',
    
    // Text colors
    textPrimary: isDarkTheme ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkTheme ? 'text-gray-400' : 'text-gray-600',
    textMuted: isDarkTheme ? 'text-gray-500' : 'text-gray-400',
    
    // Border colors
    borderColor: isDarkTheme ? 'border-surface-border' : 'border-gray-200',
    borderLight: isDarkTheme ? 'border-gray-800' : 'border-gray-200',
    
    // Accent colors
    accent: 'accent',
    accentHover: isDarkTheme ? 'hover:bg-[#7244eb]' : 'hover:bg-[#4a1db8]',
    accentLight: isDarkTheme ? 'text-accent' : 'text-[#602ff7]',
    accentBorder: isDarkTheme ? 'border-accent' : 'border-[#602ff7]',
    
    // Gradient
    gradientText: isDarkTheme 
      ? 'bg-gradient-to-r from-sidebar to-[#a8a4ff] bg-clip-text text-transparent'
      : 'bg-gradient-to-r from-[#602ff7] to-[#8a63f9] bg-clip-text text-transparent',
    
    // Input styles
    inputBg: isDarkTheme ? 'bg-[#13141a]' : 'bg-gray-50',
    inputBorder: isDarkTheme ? 'border-surface-border' : 'border-gray-200',
    inputFocus: isDarkTheme ? 'focus:border-accent focus:ring-accent' : 'focus:border-[#602ff7] focus:ring-[#602ff7]',
    inputText: isDarkTheme ? 'text-white' : 'text-gray-900',
    inputPlaceholder: isDarkTheme ? 'placeholder-gray-600' : 'placeholder-gray-400',
    
    // Glass panel effect
    glassPanel: isDarkTheme 
      ? 'bg-[rgba(255,255,255,0.02)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.05)]'
      : 'bg-white/80 backdrop-blur-[16px] border border-gray-200 shadow-xl',
    
    // Button styles
    buttonSecondary: isDarkTheme
      ? 'bg-[#13141a] hover:bg-surface-card border border-surface-border text-white'
      : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900',
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden font-sans ${themeClasses.bgPrimary}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-20 p-2.5 rounded-xl transition-all duration-300 shadow-lg"
        style={{
          background: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(8px)',
          border: `1px solid ${isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}
      >
        {isDarkTheme ? (
          <Icon name="sun" className="h-5 w-5 text-yellow-400" />
        ) : (
          <Icon name="moon" className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
          style={{ background: isDarkTheme ? '#602ff7' : '#8a63f9' }}
        ></div>
        <div 
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-10 blur-[100px]"
          style={{ background: isDarkTheme ? '#16C1F3' : '#602ff7' }}
        ></div>
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+")`,
          }}
        ></div>
      </div>

      {/* Main Content Wrapper */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 lg:py-0">
        {/* Left Side: Branding & Value Prop */}
        <div className="hidden lg:flex flex-col justify-center w-full lg:w-1/2 pr-12 mb-12 lg:mb-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-[#8a63f9] flex items-center justify-center shadow-[0_0_20px_rgba(96,47,247,0.4)]">
              <Icon name="boxes" className="text-white text-xl" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${themeClasses.textPrimary}`}>
              NexStock Enterprise
            </span>
          </div>

          <h1 className={`text-5xl font-bold leading-tight mb-6 tracking-tight ${themeClasses.textPrimary}`}>
            Unified Inventory <br />
            <span className={themeClasses.gradientText}>Command Center</span>
          </h1>

          <p className={`text-lg mb-10 max-w-md leading-relaxed ${themeClasses.textSecondary}`}>
            Securely manage multi-warehouse operations, global supply chains, and real-time analytics from a single, intelligent platform.
          </p>

          <div className="flex gap-4 items-center">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center overflow-hidden ${themeClasses.bgCard} ${themeClasses.borderColor}`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-400">U{i}</span>
                  </div>
                </div>
              ))}
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${themeClasses.bgSurfaceCard} ${themeClasses.borderColor}`}>
                <span className={`text-xs font-medium ${themeClasses.textMuted}`}>+2k</span>
              </div>
            </div>
            <span className={`text-sm font-medium ${themeClasses.textSecondary}`}>
              Trusted by leading enterprises globally
            </span>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md lg:w-1/2 flex justify-center lg:justify-end">
          <div className={`w-full rounded-[24px] p-8 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden ${themeClasses.glassPanel}`}>
            {/* Inner Glow effect */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

            <div className="text-center mb-8">
              <h2 className={`text-2xl font-semibold mb-2 ${themeClasses.textPrimary}`}>Welcome Back</h2>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Sign in to your workspace to continue</p>
            </div>

            {/* Workspace Domain Selector */}
            <div className="mb-6">
              <label className={`block text-xs font-medium uppercase tracking-wider mb-2 ml-1 ${themeClasses.textMuted}`}>
                Workspace Domain
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="building" className={`text-gray-500 group-focus-within:text-accent transition-colors h-4 w-4`} />
                </div>
                <input
                  type="text"
                  value={workspaceDomain}
                  onChange={(e) => setWorkspaceDomain(e.target.value)}
                  onBlur={handleDomainBlur}
                  className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-xl py-3.5 pl-11 pr-16 ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm`}
                  placeholder="company-name"
                />
                <div className={`absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-sm ${themeClasses.textMuted}`}>
                  .nexstock.io
                </div>
              </div>

              {/* Tenant Lookup Skeleton */}
              {(isLoadingTenant || tenantVerified) && (
                <div className={`mt-3 p-3 rounded-lg border ${themeClasses.bgSurfaceCard} ${themeClasses.borderColor} flex items-center gap-3 transition-all duration-300`}>
                  <div className={`w-8 h-8 rounded-md ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'} skeleton-pulse`}></div>
                  <div className="flex-1">
                    <div className={`h-3 w-24 rounded skeleton-pulse mb-1.5 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                    <div className={`h-2 w-16 rounded skeleton-pulse ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
                  </div>
                  <Icon name="checkCircle" className={`h-5 w-5 text-green-500 transition-all duration-300 ${tenantVerified ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              )}
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block text-xs font-medium uppercase tracking-wider mb-2 ml-1 ${themeClasses.textMuted}`}>
                  Work Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="mail" className={`text-gray-500 group-focus-within:text-accent transition-colors h-4 w-4`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-xl py-3.5 pl-11 pr-4 ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm`}
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className={`block text-xs font-medium uppercase tracking-wider ${themeClasses.textMuted}`}>
                    Password
                  </label>
                  <a href="#" className={`text-xs ${themeClasses.accentLight} hover:text-sidebar transition-colors`}>
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon name="lock" className={`text-gray-500 group-focus-within:text-accent transition-colors h-4 w-4`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-xl py-3.5 pl-11 pr-10 ${themeClasses.inputText} ${themeClasses.inputPlaceholder} focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <Icon name={showPassword ? 'eyeSlash' : 'eye'} className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* MFA Prompt */}
              {showMFA && (
                <div className="animate-fadeIn">
                  <label className={`block text-xs font-medium uppercase tracking-wider mb-2 ml-1 ${themeClasses.textMuted}`}>
                    Authenticator Code
                  </label>
                  <div className="flex gap-2 justify-between">
                    {mfaCode.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`mfa-${idx}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleMFAChange(idx, e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`w-12 h-14 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-xl text-center text-xl ${themeClasses.inputText} focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center mt-2">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-[#13141a] text-accent focus:ring-accent focus:ring-offset-[#1a1b23]"
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm cursor-pointer ${themeClasses.textSecondary}`}>
                  Remember this device for 30 days
                </label>
              </div>

              <button
                type="submit"
                className={`w-full bg-accent ${themeClasses.accentHover} text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(96,47,247,0.3)] hover:shadow-[0_0_25px_rgba(96,47,247,0.5)] mt-6 text-sm`}
              >
                Sign In to Workspace
              </button>
            </form>

            {/* SSO and Support */}
            <div className="mt-8">
              <div className="relative flex items-center py-4">
                <div className={`flex-grow border-t ${themeClasses.borderColor}`}></div>
                <span className={`flex-shrink-0 mx-4 text-xs uppercase tracking-wider ${themeClasses.textMuted}`}>
                  Or continue with
                </span>
                <div className={`flex-grow border-t ${themeClasses.borderColor}`}></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className={`flex items-center justify-center gap-2 w-full font-medium py-2.5 rounded-xl transition-all text-sm group ${themeClasses.buttonSecondary}`}>
                  <i className="fa-brands fa-microsoft text-[#00a4ef] group-hover:scale-110 transition-transform"></i>
                  SAML / Azure
                </button>
                <button className={`flex items-center justify-center gap-2 w-full font-medium py-2.5 rounded-xl transition-all text-sm group ${themeClasses.buttonSecondary}`}>
                  <i className="fa-brands fa-google text-[#ea4335] group-hover:scale-110 transition-transform"></i>
                  Google SSO
                </button>
              </div>

              <div className="mt-8 text-center flex flex-col gap-2">
                <p className={`text-xs ${themeClasses.textMuted}`}>
                  Don't have an account?{' '}
                  <a href="#" className={`${themeClasses.accentLight} hover:text-sidebar transition-colors font-medium`}>
                    Request Access
                  </a>
                </p>
                <p className={`text-xs ${isDarkTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                  Having trouble?{' '}
                  <a href="#" className={`${themeClasses.textSecondary} hover:${themeClasses.textPrimary} transition-colors border-b ${themeClasses.borderLight} hover:border-white pb-0.5`}>
                    Contact IT Support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .skeleton-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Light theme specific styles */
        .light .glass-panel {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
        }
        
        /* Dark theme specific styles */
        .dark .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(16px);
        }
      `}</style>
    </div>
  );
}