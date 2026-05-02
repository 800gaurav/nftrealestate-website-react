import React, { useState, useEffect } from 'react';
import { User, MapPin , BarChart, Target, Users, Globe, TrendingUp, Award ,Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
const navigate  = useNavigate()
  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="financial-ecosystem">
      {/* Main Content */}
      <div className="content-container">
        <header className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <h1>Jupiter</h1>
          <p className="tagline">Bridging Traditional Finance and Digital Assets</p>
        </header>

        {/* Company Profile Section */}
        <section className={`profile-section slide-up ${isVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <h2>Company Profile</h2>
            <div className="underline"></div>
          </div>
          <div className="profile-intro">
            <p className="profile-description">
              At Jupiter, our commitment to innovation, transparency, and member success shines 
              through every aspect of our ecosystem.
            </p>
          </div>
          
          <div className="profile-details">
            <div className="profile-card">
              <div className="profile-icon">
                <User className="icon" />
              </div>
              <h3>Owner</h3>
              <p>John Charles</p>
            </div>
            
            <div className="profile-card">
              <div className="profile-icon">
                <MapPin className="icon" />
              </div>
              <h3>Country</h3>
              <p>USA</p>
            </div>
            
            <div className="profile-card">
              <div className="profile-icon">
                <Coins  className="icon" />
              </div>
              <h3>Token Name</h3>
              <p>Jupiter (JUP)</p>
            </div>
            
            <div className="profile-card">
              <div className="profile-icon">
                <BarChart className="icon" />
              </div>
              <h3>Token Supply</h3>
              <p>7 Billion</p>
            </div>
            
            <div className="profile-card">
              <div className="profile-icon">
                <TrendingUp className="icon" />
              </div>
              <h3>Market Cap</h3>
              <p>$1.55 Billion</p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className={`vision-section slide-up ${isVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <h2>Our Vision</h2>
            <div className="underline"></div>
          </div>
          <div className="vision-content">
            <div className="vision-item">
              <div className="icon-container">
                <div className="icon globe">
                  <Globe className="icon-inner" />
                </div>
              </div>
              <h3>Global Decentralized Ecosystem</h3>
              <p>Build a global decentralized financial ecosystem that empowers individuals worldwide.</p>
            </div>
            <div className="vision-item">
              <div className="icon-container">
                <div className="icon empowerment">
                  <Target className="icon-inner" />
                </div>
              </div>
              <h3>Financial Independence</h3>
              <p>Empower people to achieve financial independence through blockchain technology.</p>
            </div>
            <div className="vision-item">
              <div className="icon-container">
                <div className="icon bridge">
                  <Award className="icon-inner" />
                </div>
              </div>
              <h3>Bridge Between Worlds</h3>
              <p>Create a seamless bridge between traditional finance and digital assets.</p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className={`mission-section slide-up ${isVisible ? 'visible' : ''}`}>
          <div className="section-header">
            <h2>Our Mission</h2>
            <div className="underline"></div>
          </div>
          <div className="mission-content">
            <div className="mission-card">
              <h3>Redefine Network Marketing</h3>
              <p>Transform network marketing with blockchain innovation, creating fair and transparent opportunities.</p>
              <div className="animation-bar">
                <div className="progress"></div>
              </div>
            </div>
            <div className="mission-card">
              <h3>Wealth Creation</h3>
              <p>Provide fair income opportunities with daily rewards and long-term wealth building.</p>
              <div className="animation-bar">
                <div className="progress"></div>
              </div>
            </div>
            <div className="mission-card">
              <h3>Sustainable Growth</h3>
              <p>Foster continuous innovation, build strong communities, and ensure sustainable growth.</p>
              <div className="animation-bar">
                <div className="progress"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className={`cta-section fade-in ${isVisible ? 'visible' : ''}`}>
          <h2>Join Our Financial Revolution</h2>
          <p>Be part of the movement that's transforming finance through blockchain technology</p>
          <button className="cta-button" onClick={()=> navigate('/login')}>Get Started Today</button>
        </section>
      </div>

      <style jsx>{`
        .financial-ecosystem {
          color: white;
          font-family: 'Arial', sans-serif;
          overflow-x: hidden;
          padding: 2rem 0;
        }

       

        header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        header h1 {
          font-size: 3.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #00b4db, #0083b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tagline {
          font-size: 1.2rem;
          opacity: 0.8;
        }

        /* Section Headers */
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .underline {
          height: 4px;
          width: 80px;
          background: linear-gradient(to right, #00b4db, #0083b0);
          margin: 0 auto;
          border-radius: 2px;
        }

        /* Profile Section */
        .profile-section {
          padding: 4rem 0;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
        }

        .profile-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .profile-intro {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .profile-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #e2e8f0;
        }

        .profile-details {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }

        .profile-card {
          flex: 1;
          min-width: 200px;
          text-align: center;
          padding: 2rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .profile-icon {
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }

        .profile-icon .icon {
          width: 50px;
          height: 50px;
          padding: 12px;
          background: linear-gradient(45deg, #00b4db, #0083b0);
          border-radius: 50%;
        }

        .profile-card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #00b4db;
        }

        .profile-card p {
          font-size: 1.1rem;
          font-weight: 600;
        }

        /* Vision Section */
        .vision-section {
          padding: 4rem 0;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }

        .vision-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .vision-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }

        .vision-item {
          flex: 1;
          min-width: 300px;
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .vision-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .icon-container {
          margin-bottom: 1.5rem;
        }

        .icon {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon.globe {
          background: conic-gradient(from 0deg, #00b4db, #0083b0, #00b4db);
        }

        .icon.empowerment {
          background: conic-gradient(from 90deg, #00b4db, #0083b0, #00b4db);
        }

        .icon.bridge {
          background: conic-gradient(from 180deg, #00b4db, #0083b0, #00b4db);
        }

        .icon-inner {
          width: 40px;
          height: 40px;
          color: white;
        }

        .vision-item h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #00b4db;
        }

        .vision-item p {
          line-height: 1.6;
          opacity: 0.9;
        }

        /* Mission Section */
        .mission-section {
          padding: 4rem 0;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }

        .mission-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .mission-content {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .mission-card {
          flex: 1;
          min-width: 300px;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .mission-card:hover {
          transform: translateY(-5px);
        }

        .mission-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #00b4db;
        }

        .mission-card p {
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .animation-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .progress {
          height: 100%;
          width: 0;
          background: linear-gradient(to right, #00b4db, #0083b0);
          border-radius: 2px;
          animation: progressAnimation 2s ease-in-out infinite alternate;
        }

        @keyframes progressAnimation {
          0% {
            width: 30%;
          }
          100% {
            width: 100%;
          }
        }

        /* CTA Section */
        .cta-section {
          text-align: center;
          padding: 4rem 0;
          opacity: 0;
          transition: opacity 0.8s ease 0.4s;
        }

        .cta-section.visible {
          opacity: 1;
        }

        .cta-section h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-section p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.8;
        }

        .cta-button {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          background: linear-gradient(45deg, #00b4db, #0083b0);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .content-container {
            padding: 1rem;
          }
          
          header h1 {
            font-size: 2.5rem;
          }
          
          .profile-details,
          .vision-content,
          .mission-content {
            flex-direction: column;
          }
          
          .profile-card,
          .vision-item,
          .mission-card {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default About;