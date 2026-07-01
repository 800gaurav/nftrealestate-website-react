import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";
import AuthWrapper from "../component/wrapper/AuthWrapper";
import Button from "../component/wrapper/Button";
import { Copy, Check, User, Key, Mail, Phone } from "lucide-react";

const CredentialsPopup = ({ data, onClose }) => {
  const [copied, setCopied] = useState(null);
  const copy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };
  const Row = ({ label, value, field }) => (
    <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
      <div>
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <p className="text-white font-semibold text-sm">{value}</p>
      </div>
      <button onClick={() => copy(value, field)} className="text-slate-400 hover:text-yellow-400 transition-colors ml-3">
        {copied === field ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
    </div>
  );
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-950 border border-yellow-500/30 rounded-2xl shadow-2xl w-full max-w-md p-6"
        >
          <div className="text-center mb-5">
            <div className="w-14 h-14 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check size={28} className="text-green-400" />
            </div>
            <h2 className="text-white text-xl font-bold">Registration Successful!</h2>
            <p className="text-slate-400 text-sm mt-1">Save your credentials — also sent to your email</p>
          </div>
          <div className="space-y-3 mb-6">
            <Row label="User ID" value={data.userId} field="userId" />
            <Row label="Name" value={data.name} field="name" />
            <Row label="Email" value={data.email} field="email" />
            <Row label="Phone" value={data.phone} field="phone" />
            <Row label="Transaction Password" value={data.txnpass} field="txnpass" />
            <Row label="Referral Code" value={data.referralCode} field="referralCode" />
          </div>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-bold py-3 rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all"
          >
            Proceed to Login
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const VerifyOtpPage = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const { fetchData } = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    // const email = location.state?.email;
    const email = location.state?.userdata;


    const [registerData, setData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }
        console.log({
            email
        })

        try {
            setLoading(true);
            const res = await fetchData({
                url: "/api/v1/user/auth/verify-otp",
                method: "POST",
                data: { email, otp }
            });

            console.log(res)
            const data = res.data




            setData(data);

            if (res.success) {
                const payload = {
                    referrerCode: data.referralCode || null,
                    name: data.name,
                    phone: `${data.phone}`,
                    email: data.email,
                    txnpass: data?.txnpass,
                    userId: data?.userId
                };
                toast.success('Registration successful!');
                setShowPopup(true);
                setLoading(false)
            }


        } catch (err) {
            toast.error(err.message || "Invalid OTP, try again");
        } finally {
            setLoading(false);
        }
    };

    return (<>
        {showPopup && registerData && (
            <CredentialsPopup
                data={registerData}
                onClose={() => {
                    setShowPopup(false);
                    navigate("/login");
                }}
            />
        )}
        <AuthWrapper
        title={'Verify otp'}
        onBackButtonClick={()=>{
            navigate(-1)
        }}
    >
        <p className="text-gray-600 text-center mb-6">
            We’ve sent a 6-digit OTP to <span className="font-semibold">{email}</span>
        </p>

        <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full text-center text-xl text-white tracking-widest px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
        />

        <Button
            title={loading ? "Verifying..." : "Verify & Continue"}
            type="button"
            disabled={loading}
            onClick={handleVerify}
        />

    </AuthWrapper>
    </>);
};

export default VerifyOtpPage;
