const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔥 Background Video */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
           <source src="/Images/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 🔥 Page Content */}
      <main className="flex-grow relative z-10">{children}</main>
    </div>
  );
};

export default Layout;
