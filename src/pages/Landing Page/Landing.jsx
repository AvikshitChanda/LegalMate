import React, { useRef } from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import Video from '../../assets/videos/video.mp4';
import aboutImage from '../../assets/images/aboutImage.jpg';
import Priyanshu from '../../assets/images/priyanshu.png';
import Rudra from '../../assets/images/rudra.png';
import prince from '../../assets/images/prince.png';
import Avikshit from '../../assets/images/me.png';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landing = () => {
  const form = useRef(null);

  const reload = () => {
    window.location.reload();
  };

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm('service_1756ihk', 'template_h4cm07v', form.current, {
        publicKey: '8MkaDBRIPqnkqCYip',
      })
      .then(
        () => {
          toast.success('✅ Email sent successfully!');
          form.current.reset(); // Reset form on success
          document.getElementById('part1').scrollIntoView({
            behavior: 'smooth', // Smooth scrolling
            block: 'start', // Align to the top of the viewport
          });
        },
        (error) => {
          toast.error(`❌ Error sending email: ${error.text}`);
        }
      );
  };

  return (
    <div id="landingContainer">
      <div id="mainContainer">
        <div id="part1">
          <nav id="navBar">
            <div id="logo" onClick={reload}>
              <img src={Logo} alt="Logo" />
              <h2>LegalMate.AI</h2>
            </div>
            <div id="options">
              <h4>
                <Link to="/chat">Ask AI</Link>
              </h4>
              <h4>
                <Link to="/">Doc AI</Link>
              </h4>
            </div>
          </nav>

          <div id="mainLandingContent">
            <div id="writtenContent">
              <h2>LEGAL</h2>
              <h2> MADE</h2>
              <h1 id="Taglinegradient">SIMPLE</h1>
            </div>
            <div id="buldgeContainer">
              <div id="bluge1"></div>
              <div id="bluge2"></div>
              <div id="bluge3"></div>
              <div id="bluge4"></div>
            </div>
            <div id="videoContainer">
              <div id="videoContainer1">
                <video src={Video} autoPlay muted loop></video>
                <video src={Video} autoPlay muted loop></video>
              </div>
              <div id="videoContainer2">
                <video src={Video} autoPlay muted loop></video>
                <video src={Video} autoPlay muted loop></video>
              </div>
            </div>
          </div>
        </div>
        <div id="part2">
          <div id="about">
            <h2>What We Do</h2>
            <p>
              We have developed an AI-powered legal documentation assistant
              that automates the drafting of legal documents in plain
              language. Our tool is user-friendly, allowing users to input
              relevant information and receive customized legal documents
              tailored to their specific needs. Our AI ensures that these
              documents are accurate and compliant with Indian legal standards
              by integrating with existing legal resources and databases. In
              cases where more complex legal advice is required, we also offer
              the option to connect with legal experts.
            </p>
          </div>
          <div id="imageAbout">
            <img src={aboutImage} alt="About Us" />
          </div>
        </div>
        <div id="part3">
          <h1>Meet Our Team!</h1>
          <div id="teamMates">
            <div className="tm">
              <div id="image1">
                <img src={Priyanshu} alt="Priyanshu Sharma" />
              </div>
              <div className="contentBox">
                <h2>Priyanshu Sharma</h2>
                <h3>Web Development Enthusiast</h3>
              </div>
            </div>
            <div className="tm">
              <div id="image2">
                <img src={Rudra} alt="Rudra Ranjan" />
              </div>
              <div className="contentBox">
                <h2>Rudra Ranjan</h2>
                <h3>Machine Learning Enthusiast</h3>
              </div>
            </div>
            <div className="tm">
              <div id="image3">
                <img src={prince} alt="Prince Tripathi" />
              </div>
              <div className="contentBox">
                <h2>Prince Tripathi</h2>
                <h3>Machine Learning Enthusiast</h3>
              </div>
            </div>
            <div className="tm">
              <div id="image4">
                <img src={Avikshit} alt="Avikshit Chanda" />
              </div>
              <div className="contentBox">
                <h2>Avikshit Chanda</h2>
                <h3>Web Development Enthusiast</h3>
              </div>
            </div>
          </div>
        </div>
        <div id="part4">
          <h1>Need assistance? Contact us</h1>
          <form id="form" ref={form} onSubmit={sendEmail}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
            <input type="submit" value="Send" />
          </form>
          <h6>© 2024 LEGALMATE.AI. All rights reserved.</h6>

        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Landing;
