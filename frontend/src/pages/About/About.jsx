import React from 'react'
import '../About/About.scss'

import {
    Card,
    CardBody,
    Avatar,
    IconButton,
    Typography,
  } from "@material-tailwind/react";

const members = [
    {
      img: '/avatar.svg',  
      name: "Imanol Espinal",
      title: "Full-Stack Developer",
      githubUrl: "https://www.github.com/bradleyhung",
      linkedinUrl: "https://www.linkedin.com/in/bradley-hung/",
    },
    {
      img: '/avatar.svg',  
      name: "Sania Pervez",
      title: "Full-Stack Developer",
      githubUrl: "https://www.github.com/birongliu",
      linkedinUrl: "https://www.linkedin.com/in/birongliu/",
    },
    {
      img: '/avatar.svg',  
      name: "Zainib Mohammad",
      title: "Full-Stack Developer",
      linkedinUrl: "https://www.linkedin.com/in/shuyi-zhou-296ab6246/",
    },
    {
      img: '/avatar.svg',  
      name: "Leyanna Daniels",
      title: "Full-Stack Developer",
      linkedinUrl: "https://www.linkedin.com/in/jjessica415/",
    },
];

function TeamCard({ img, name, title }) {
    return (
      <Card className="rounded-lg bg-[#FAFAFA]"  shadow={false}>
        <CardBody className="text-center">
          <Avatar
            src={img}
            alt={name}
            variant="circular"
            size="xxl"
            className="mx-auto mb-6 object-top"
          />
          <Typography variant="h5" color="blue-gray" className="!font-medium text-lg">
            {name}
          </Typography>
          <Typography
            color="blue-gray"
            className="mb-2 !text-base !font-semibold text-gray-600"
          >
            {title}
          </Typography>
          <div className="flex items-center justify-center gap-1.5">
            <IconButton variant="text" color="gray">
              <i className="fa-brands fa-twitter text-lg" />
            </IconButton>
            <IconButton variant="text" color="gray">
              <i className="fa-brands fa-linkedin text-lg" />
            </IconButton>
            <IconButton variant="text" color="gray">
              <i className="fa-brands fa-dribbble text-lg" />
            </IconButton>
          </div>
        </CardBody>
      </Card>
    );
}

function About() {
  return (
    <>
      <div className='about-container'>
        <section>
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
        </section>
        
        <section className="min-h-screen py-8 px-8 lg:py-28 about-us">
        <div className="container mx-auto">
          <div className="mb-16 text-center lg:mb-28">
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-lg"
            >
              Meet the Team
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="my-2 !text-2xl lg:!text-4xl"
            >
              Behind the Success: Our Dedicated Team
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 max-w-4xl"
            >
              From visionary leadership, to creative talent, to technical wizardry, 
              each team member plays a pivotal role in delivering the exceptional 
              service and innovative solutions.
            </Typography>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {members.map((props, key) => (
              <TeamCard key={key} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
    
  </>
  )
}

export default About