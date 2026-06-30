import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children, title, subtitle, showBackButton = true, onBackClick }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b13] px-4 py-12 relative overflow-hidden">

      {/* Card Container */}
      <div className="w-full max-w-md rounded-2xl p-8 bg-slate-950/80 border border-slate-800 shadow-2xl relative z-10">

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
