// import React from "react";
// import { motion } from "framer-motion";
// import { Heart, Eye, TrendingUp } from "lucide-react";
// import { useTheme } from "../context/ThemeContext";

// const NFTCard = ({ nft, index }) => {
//   const { isDarkMode } = useTheme();

//   // Generate random price for demonstration
//   const price = (Math.random() * 50 + 1).toFixed(2);
//   const currency = "USDT";

//   // Generate random stats
//   const views = Math.floor(Math.random() * 1000) + 50;
//   const likes = Math.floor(Math.random() * 200) + 10;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -30 }}
//       transition={{
//         duration: 0.4,
//         delay: index * 0.1,
//         ease: "easeOut",
//       }}
//       whileHover={{ y: -8 }}
//       className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
//         isDarkMode
//           ? "bg-gray-800 border border-gray-700"
//           : "bg-white border border-gray-200"
//       }`}
//     >
//       {/* Image Container with Overlay */}
//       <div className="relative overflow-hidden">
//         <img
//           src={nft.image}
//           alt={nft.title}
//           className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
//           loading="lazy"
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//         {/* Action Buttons */}
//         <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
//           >
//             <Heart className="w-4 h-4" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
//           >
//             <Eye className="w-4 h-4" />
//           </motion.button>
//         </div>

//         {/* Price Badge */}
//         <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="flex items-center gap-1 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
//             <TrendingUp className="w-3 h-3" />
//             <span>
//               {price} {currency}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3
//           className={`font-semibold text-sm sm:text-base mb-2 truncate ${
//             isDarkMode ? "text-white" : "text-gray-800"
//           }`}
//         >
//           {nft.title}
//         </h3>

//         {/* Stats */}
//         <div className="flex items-center justify-between text-xs sm:text-sm">
//           <div
//             className={`flex items-center gap-3 ${
//               isDarkMode ? "text-gray-400" : "text-gray-600"
//             }`}
//           >
//             <span className="flex items-center gap-1">
//               <Eye className="w-3 h-3" />
//               {views}
//             </span>
//             <span className="flex items-center gap-1">
//               <Heart className="w-3 h-3" />
//               {likes}
//             </span>
//           </div>

//           <div
//             className={`font-semibold ${
//               isDarkMode ? "text-green-400" : "text-green-600"
//             }`}
//           >
//             {price} {currency}
//           </div>
//         </div>

//         {/* Action Button */}
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className="w-full mt-3 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 bg-gradient-to-r from-[#00d4aa] to-[#00f5d4] hover:from-[#00c29a] hover:to-[#00e5c4] text-black shadow-md hover:shadow-lg"
//         >
//           View Details
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// export default NFTCard;
