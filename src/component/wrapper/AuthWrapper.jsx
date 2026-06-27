import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children, title, subtitle, showBackButton = true, onBackClick }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b13] px-4 py-20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] pointer-events-none z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-blue-500/5 rounded-full blur-[70px] pointer-events-none"></div>

      {/* Card Container */}
      <div className="w-full max-w-md rounded-2xl p-8 bg-slate-950/60 border border-yellow-500/25 shadow-2xl backdrop-blur-md relative z-10">
        
        {/* Logo at top */}
        <div className="flex justify-center mb-6 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/Images/logo1.png" alt="NFT RealEstate Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Header Section */}
        <div className="mb-6">
          {showBackButton && (
            <button
              onClick={() => onBackClick ? onBackClick() : navigate('/')}
              className="flex items-center text-xs font-semibold text-yellow-400 hover:text-yellow-500 transition-colors mb-4"
            >
              <ArrowLeft size={14} className="mr-1" />
              Back to Home
            </button>
          )}
          
          <div className="text-center">
            {title && (
              <h2 className="text-2xl font-bold mb-2 text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Children Content */}
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;