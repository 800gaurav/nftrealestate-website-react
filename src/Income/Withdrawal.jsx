import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Upload, X, ArrowRight, Info, CheckCircle } from "lucide-react";
import apiRoutes from "../variables/apiRoutes";

// Color constants
export const colors = {
  theme1: "#0671FF",
  theme2: "#02D396"
};

const Withdrawal = () => {
  const { fetchData } = useAxios();
  const { setloading } = useAuth();

  const [formValues, setFormValues] = useState({
    amount: "",
    upiId: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    passbookPhoto: null,
    pancardPhoto: null,
  });

  const [previewImages, setPreviewImages] = useState({
    passbookPhoto: null,
    pancardPhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (files && files[0]) {
      const file = files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [name]: "Please upload an image file" }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [name]: "File size must be less than 2MB" }));
        return;
      }

      setFormValues({ ...formValues, [name]: file });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages(prev => ({ ...prev, [name]: e.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const removeImage = (name) => {
    setFormValues({ ...formValues, [name]: null });
    setPreviewImages(prev => ({ ...prev, [name]: null }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.amount || formValues.amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formValues.upiId) {
      newErrors.upiId = "UPI ID is required";
    }

    if (!formValues.accountNumber || formValues.accountNumber.length < 9) {
      newErrors.accountNumber = "Please enter a valid account number";
    }

    if (!formValues.ifscCode) {
      newErrors.ifscCode = "IFSC Code is required";
    }

    if (!formValues.bankName) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formValues.passbookPhoto) {
      newErrors.passbookPhoto = "Passbook photo is required";
    }

    if (!formValues.pancardPhoto) {
      newErrors.pancardPhoto = "PAN card photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Values:", formValues);

    if (!validateForm()) {
      return;
    }

    setloading(true);

    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // Debugging: Check FormData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await fetchData({
        url: apiRoutes.withdrawRequest,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",  // ✅ Force multipart
        },
      });


      console.log("Withdraw Response:", res);

      if (res.success) {
        setSubmitted(true);
        setFormValues({
          amount: "",
          upiId: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
          passbookPhoto: null,
          pancardPhoto: null,
        });
        setPreviewImages({
          passbookPhoto: null,
          pancardPhoto: null,
        });

        Swal.fire({
          title: "Success 🎉",
          text: res.message || "Withdrawal request submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

      } else {
        Swal.fire({
          title: "Error ",
          text: res.message || "Failed to submit withdrawal request",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Withdraw Error:", error);
      Swal.fire({
        title: "Error ❌",
        text: error.message || "Something went wrong while submitting withdrawal request",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setloading(false);
    }
  };



  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Withdrawal Request Submitted</h2>
            <p className="text-gray-600 mb-6">
              Your withdrawal request has been submitted successfully. We will process it within 24-48 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0671FF] to-[#02D396] p-6 text-white">
            <h1 className="text-2xl font-bold">Withdrawal Request</h1>
            <p className="opacity-90">Fill in your bank details to request a withdrawal</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Amount Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (INR)
              </label>
              <input
                type="number"
                name="amount"
                value={formValues.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.amount ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                  }`}
              />
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            </div>

            {/* Bank Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formValues.bankName}
                  onChange={handleChange}
                  placeholder="e.g., State Bank of India"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.bankName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                />
                {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formValues.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.accountNumber ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                />
                {errors.accountNumber && <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formValues.ifscCode}
                  onChange={handleChange}
                  placeholder="e.g., SBIN0000000"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.ifscCode ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                />
                {errors.ifscCode && <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  name="upiId"
                  value={formValues.upiId}
                  onChange={handleChange}
                  placeholder="e.g., yourname@upi"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.upiId ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                />
                {errors.upiId && <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>}
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Passbook Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passbook Photo
                </label>
                <div className="space-y-2">
                  {previewImages.passbookPhoto ? (
                    <div className="relative">
                      <img
                        src={previewImages.passbookPhoto}
                        alt="Passbook preview"
                        className="w-full h-48 object-contain rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage("passbookPhoto")}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload passbook photo</p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                      </div>
                      <input
                        type="file"
                        name="passbookPhoto"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.passbookPhoto && <p className="text-sm text-red-600">{errors.passbookPhoto}</p>}
                </div>
              </div>

              {/* PAN Card Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Card Photo
                </label>
                <div className="space-y-2">
                  {previewImages.pancardPhoto ? (
                    <div className="relative">
                      <img
                        src={previewImages.pancardPhoto}
                        alt="PAN card preview"
                        className="w-full h-48 object-contain rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage("pancardPhoto")}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload PAN card photo</p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                      </div>
                      <input
                        type="file"
                        name="pancardPhoto"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.pancardPhoto && <p className="text-sm text-red-600">{errors.pancardPhoto}</p>}
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Your withdrawal will be processed within 24-48 hours. Please ensure all details are correct before submitting.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0671FF] to-[#02D396] text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Submit Withdrawal Request
              {/* <ArrowRight className="w-5 h-5 ml-2" /> */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;