import React from "react";
import { useAuth } from "../context/AuthContext";

const Loader = () => {
  const { Loading } = useAuth();
  if (!Loading) return null;
console.log(Loading, "loading")
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[9999] pointer-events-none"
      style={{ backgroundColor: "transparent" }} 
    >
      <div className="loader pointer-events-auto" />
    </div>
  );
};

export default Loader;
