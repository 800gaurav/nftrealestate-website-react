import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children, title, subtitle, showBackButton = true, onBackClick }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 mt-10">
      {/* Card Container */}
      <div className="w-full max-w-md rounded-lg p-6 bg-white shadow-sm border border-gray-200">
        {/* Header Section */}
        <div className="mb-6">
          {showBackButton && (
            <button
              onClick={() => onBackClick ? onBackClick() : navigate('/')}
              className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </button>
          )}
          
          <div className="text-center mb-6">
            {title && (
              <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-center text-gray-600 text-sm">
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