// components/PaymentModal.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, IndianRupee } from "lucide-react";
import apiRoutes from "../../variables/apiRoutes";
import useAxios from "../../utils/useAxios";
import { showSuccessToast } from "../../component/toaster";
import Button from "../../component/wrapper/Button";
import { imageUrl } from "../../utils";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PaymentModal = ({
  paymentStep,
  setPaymentStep,
  selectedPlan,
  plansData,
  formatCurrency,
  transactionId,
  setTransactionId,
  uploadedScreenshot,
  setUploadedScreenshot,
  handleScreenshotUpload,
  isSubmitting,
  setUploadedImage,
  uploadedImage,
  CoinsDetails
}) => {
  const { data: payInfoData, loading, error, fetchData } = useAxios();
  const navigate = useNavigate();
  const { setloading } = useAuth();

  const getPaymentInf = async () => {
    const res = await fetchData({
      url: apiRoutes.paymentInfo,
    });
    console.log("Payment Info Response:", res);
  };

  useEffect(() => {
    if (paymentStep !== "select") {
      getPaymentInf();
    }
  }, [paymentStep]);

  const submitPaymentRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("transactionId", transactionId);
      formData.append("screenshot", uploadedImage);
      formData.append("userCoins", CoinsDetails);

      const res = await fetchData({
        url: apiRoutes.buyPlan(plansData[selectedPlan]._id),
        method: "POST",
        data: formData,
      });

      console.log("Submit Payment Response:", res);

      if (res.success) {
        showSuccessToast(res.message);
        setTimeout(() => {
          setPaymentStep("select");
        }, 300);
      } else {
        if (res.message === "Complete KYC before buying plan") {
          Swal.fire({
            title: "Complete KYC",
            text: "Complete KYC before buying plan. Do you want to continue?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard/user/kyc"); // redirect to your KYC page
            }
          });
        } else {
          toast.error(res.message || "Error submitting payment request");
        }
      }
    }  catch (error) {
      console.error("Error submitting payment request:", error);

      const errorMsg = error?.message || error?.message || "Error submitting payment request";
      console.log('Error Message:', errorMsg);
      if (errorMsg) {
        Swal.fire({
          title: "Complete KYC",
          text: "Complete KYC before buying plan. Do you want to continue?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/user/kyc"); // redirect to your KYC page
          }
        });
      } else {
        toast.error(errorMsg);
      }
    }

};



return (
  <AnimatePresence>
    {paymentStep !== "select" && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={() => paymentStep === "qr" && setPaymentStep("select")}
      >
        {/* Overlay with gradient color */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/70 to-black/60 backdrop-blur-sm"></div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* QR STEP */}
          {paymentStep === "qr" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Complete Payment
                </h3>
                <button
                  onClick={() => setPaymentStep("select")}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Amount Display */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl mb-6 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <IndianRupee className="w-5 h-5 text-blue-700" />
                  <span className="text-sm text-blue-700 font-medium">
                    Payment Amount
                  </span>
                </div>
                <div className="text-3xl font-bold text-blue-800">
                  {formatCurrency(plansData[selectedPlan].netAmount)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Included {plansData[selectedPlan].gst}% GST
                </div>
              </div>

              {/* Payment Info */}
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4 font-medium">
                  Scan the QR code using your UPI app
                </p>
                <div className="bg-white p-5 rounded-xl border border-gray-200 inline-block mb-4 shadow-sm">
                  <div className="w-48 h-48 flex items-center justify-center mx-auto">
                    {payInfoData?.qrCode ? (
                      <img
                        src={imageUrl(payInfoData?.qrCode)}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Loading QR...
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg text-left mb-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Company Name:
                    </span>
                    <span className="text-sm text-gray-900">
                      {payInfoData?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      UPI ID:
                    </span>
                    <span className="text-sm text-blue-600 font-medium">
                      {payInfoData?.upiId || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      TRC20 Address:
                    </span>
                    <span className="text-sm text-gray-900">
                      {payInfoData?.trc20Address || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      BEP20 Address:
                    </span>
                    <span className="text-sm text-gray-900">
                      {payInfoData?.bep20Address || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                title="I've Made the Payment"
                type="button"
                onClick={() => setPaymentStep("details")}
              />
            </>
          )}

          {/* DETAILS STEP */}
          {paymentStep === "details" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Submit Payment Details
                </h3>
                <button
                  onClick={() => setPaymentStep("select")}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Amount Display in Details Step */}
              <div className="bg-blue-50 p-3 rounded-lg mb-5 text-center">
                <div className="text-sm text-blue-700 font-medium mb-1">
                  Payment Amount
                </div>
                <div className="text-xl font-bold text-blue-800">
                  {formatCurrency(plansData[selectedPlan].netAmount)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID/UTR Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your transaction ID"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Find this in your bank statement or UPI app
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Payment Screenshot
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    {uploadedScreenshot ? (
                      <div className="relative">
                        <img
                          src={uploadedScreenshot}
                          alt="Payment screenshot"
                          className="mx-auto max-h-40 rounded shadow-sm"
                        />
                        <button
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          onClick={() => setUploadedScreenshot(null)}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <Upload className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                          Click to upload screenshot
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleScreenshotUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <Button
                  title={loading ? "Submitting..." : "Submit Payment Request"}
                  type="button"
                  onClick={submitPaymentRequest}
                  disabled={
                    !transactionId || !uploadedScreenshot || isSubmitting
                  }
                  loading={loading}
                />
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
};

export default PaymentModal;
