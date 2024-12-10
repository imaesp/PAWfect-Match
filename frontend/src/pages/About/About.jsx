import React from 'react';
import './About.scss';

const members = [
  {
    img: '/avatar.svg',
    name: "Imanol Espinal",
    title: "Full-Stack Developer",
    githubUrl: "https://www.github.com/imaesp",
    linkedinUrl: "https://www.linkedin.com/in/imanol-espinal-8b366326b",
  },
  {
    img: '/avatar.svg',
    name: "Sania Pervez",
    title: "Full-Stack Developer",
    githubUrl: "https://www.github.com/sanipervez",
    linkedinUrl: "https://www.linkedin.com/in/saniapervez",
  },
  {
    img: '/avatar.svg',
    name: "Zainib Mohammad",
    title: "Full-Stack Developer",
    githubUrl: "https://www.github.com/zainibm",
    linkedinUrl: "https://www.linkedin.com/in/zainib-mohammad/",
  },
  {
    img: '/avatar.svg',
    name: "Leyanna Daniels",
    title: "Full-Stack Developer",
    githubUrl: "https://www.github.com/LeyannaD",
    linkedinUrl: "https://www.linkedin.com",
  },
];

const About = () => {
  return (
    <div className="about-page">
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
  );
};

export default About;
