

import React from 'react';
import './About.scss';
import Footer from '../../components/Footer/Footer.jsx'


const members = [
 {
   img: '/ima.png',
   name: "Imanol Espinal",
   title: "Full-Stack Developer",
   githubUrl: "https://www.github.com/imaesp",
   linkedinUrl: "https://www.linkedin.com/in/imanol-espinal-8b366326b",
 },
 {
   img: '/Sania.jpg',
   name: "Sania Pervez",
   title: "Full-Stack Developer",
   githubUrl: "https://www.github.com/sanipervez",
   linkedinUrl: "https://www.linkedin.com/in/saniapervez",
 },
 {
   img: '/zainib.jpg',
   name: "Zainib Mohammad",
   title: "Full-Stack Developer",
   githubUrl: "https://www.github.com/zainibm",
   linkedinUrl: "https://www.linkedin.com/in/zainib-mohammad/",
 },
 {
   img: '/leyanna.jpg',
   name: "Leyanna Daniels",
   title: "Full-Stack Developer",
   githubUrl: "https://www.github.com/LeyannaD",
   linkedinUrl: "https://www.linkedin.com",
 },
];


const About = () => {
 return (
   <div className="about-page">
     <div className="mission">
         <p className='welcome'>Welcome to PAWfect Match!</p>
         <p>
             Our mission is to make pet adoption more approachable and responsible by providing you
             with the tools to be both emotionally and financially prepared for pet ownership. Inspired by the challenges and joys experienced
             during the pandemic, PAWfect Match was created to address the significant issue of financial barriers that lead to pet rehoming.
         </p>
         <p>
             With our innovative features like the Matchmaking Quiz, which offers personalized pet recommendations, the Budgeting Tool,
             designed to help you manage ongoing pet care costs, and the Preparation Checklist that guides you through essential steps of pet
             care and adoption, we aim to ensure that every adoption is a perfect match both ways.
         </p>
         <p>
             We are committed to fostering lasting connections between pets and their owners through informed decision-making,
             sustainable pet care, and a fulfilling journey of companionship. Together, we can create a world where every pet finds a loving,
             prepared home.
         </p>
     </div>
     <div className='about-container'>
       <h1 className="title">Meet the Team</h1>
       <div className="team-container">
         {members.map((member, index) => (
           <div key={index} className="team-card">
             <img src={member.img} alt={member.name} className="team-avatar" />
             <h5 className="team-name">{member.name}</h5>
             <p className="team-title">{member.title}</p>
             <div className="team-links">
               {member.githubUrl && (
                 <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
                   <i className="fab fa-github"></i>
                 </a>
               )}
               {member.linkedinUrl && (
                 <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                   <i className="fab fa-linkedin"></i>
                 </a>
               )}
             </div>
           </div>
         ))}
       </div>
       <div>
         <h1 className="sub-title">
           From visionary leadership to creative talent, and technical wizards,
           each team member plays a pivotal role in delivering the exceptional
           service and innovative solutions.
         </h1>
       </div>
     </div>
     <Footer></Footer>
   </div>
 );
};


export default About;





