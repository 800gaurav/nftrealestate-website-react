import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, XCircle, Info, Bell, X } from 'lucide-react';
import './toastStyle.css'




// Toast functions
export const showSuccessToast = (message) => {
  toast.success(message, {
    icon: false,
    className: 'success-toast',
    bodyClassName: 'toast-body',
    progressClassName: 'success-progress'
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    icon: false,
    className: 'error-toast',
    bodyClassName: 'toast-body',
    progressClassName: 'error-progress'
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    icon: false,
    className: 'info-toast',
    bodyClassName: 'toast-body',
    progressClassName: 'info-progress'
  });
};

export const showWarningToast = (message) => {
  toast.warn(message, {
    icon: false,
    className: 'warning-toast',
    bodyClassName: 'toast-body',
    progressClassName: 'warning-progress'
  });
};

// Main Toast Container Component
export const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      // autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastClassName="custom-toast-wrapper"
      progressClassName="custom-progress"
    />
  );
};

