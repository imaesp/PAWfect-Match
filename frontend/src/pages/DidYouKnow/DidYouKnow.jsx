import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DidYouKnow.scss'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const facts = [
    { title: "89.7 million", fact: "There are approximately 89.7 million pet dogs in the U.S. (2023)." },
    { title: "44%", fact: "About 44% of U.S. households own at least one dog." },
    { title: "Most Popular Breed", fact: "The most popular dog breed in the U.S. is the Labrador Retriever, followed by French Bulldogs and German Shepherds." },
    { title: "300 million", fact: "Dogs have around 300 million smell receptors, making their sense of smell 40 times better than humans." },
    { title: "Unique Nose Prints", fact: "A dog’s nose print is as unique as a human fingerprint." },
    { title: "Basenji", fact: "The Basenji is known as the 'barkless dog' because it makes a yodel-like sound instead of barking." },
    { title: "94.2 million", fact: "There are around 94.2 million pet cats in the U.S. (2023)." },
    { title: "25%", fact: "About 25% of U.S. households have at least one cat." },
    { title: "12–18 years", fact: "Indoor cats typically live 12–18 years, while outdoor cats often have shorter lifespans." },
    { title: "70%", fact: "Cats spend approximately 70% of their lives sleeping—that’s 13–16 hours a day." },
    { title: "Clowder", fact: "A group of cats is called a clowder." },
    { title: "100 Sounds", fact: "Cats can make over 100 different sounds, while dogs can make about 10." },
    { title: "67%", fact: "Approximately 67% of U.S. households own a pet, which translates to about 85 million families." },
    { title: "Millennials", fact: "Millennials are the largest demographic of pet owners, followed by Baby Boomers." },
    { title: "$1,200–$2,000", fact: "The average annual cost of owning a dog is about $1,200–$2,000, while for cats, it’s around $900–$1,500." },
    { title: "Improved Health", fact: "Pets have been shown to lower stress and blood pressure in their owners, improving overall heart health." },
    { title: "60%", fact: "60% of pet owners consider their pets to be part of the family." },
    { title: "25%", fact: "About 25% of dogs and cats in shelters are purebred." },
    { title: "$136.8 billion", fact: "In 2023, Americans spent over $136.8 billion on their pets, including food, vet care, and grooming." },
    { title: "4.4 million", fact: "The pet insurance industry is growing rapidly, with more than 4.4 million pets insured in North America." },
    { title: "Sweat Through Paws", fact: "Dogs sweat through their paws, not their skin." },
    { title: "Grooming", fact: "Cats groom themselves not only for cleanliness but also to regulate their body temperature." },
    { title: "Laika", fact: "The first animal to orbit Earth was Laika, a stray dog from Moscow, aboard Sputnik 2 in 1957." },
];

const quotes = [
    {
        quote: "Pets are not our whole life, but they make our lives whole.",
        author: "Roger Caras",
    },
    {
        quote: "Animals are such agreeable friends—they ask no questions; they pass no criticisms.",
        author: "Paul McCartney",
    },
    {
        quote: "In a perfect world, every dog would have a home, and every home would have a dog.",
        author: "Unknown",
    },
    {
        quote: "Saving one dog will not change the world, but surely for that one dog, the world will change forever.",
        author: "Karen Davison",
    },
    {
        quote: "Home is where the dog hair sticks to everything… but the dog.",
        author: "Mahatma Gandhi",
    },
    {
        quote: "Time spent with cats is never wasted.",
        author: "Sigmund Freud",
    },
    {
        quote: "Money can buy you a fine dog, but only love can make him wag his tail.",
        author: "Kinky Friedman",
    },
    {
        quote: "Whoever said diamonds are a girl’s best friend never had a dog.",
        author: "Unknown",
    },
    {
        quote: "Who rescued who?",
        author: "Unknown",
    },
];

const getRandomFacts = () => {
    const shuffled = facts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
};

const getRandomQuote = () => {
    const shuffled = quotes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 1);
};

const DidYouKnow = () => {
    const [randomFacts, setRandomFacts] = useState(getRandomFacts());
    const [randomQuote, setRandomQuote] = useState(getRandomQuote());

    useEffect(() => {
        const factInterval = setInterval(() => {
            setRandomFacts(getRandomFacts());
        }, 10000); 

        const quoteInterval = setInterval(() => {
            setRandomQuote(getRandomQuote());
        }, 20000); 

        // Cleanup on component unmount
        return () => {
            clearInterval(factInterval);
            clearInterval(quoteInterval);
        };
    }, []);

    return (
        <div className="education-container text-center">
            <div className="group-container row">
                <div className="title row justify-content-center"><h1>Did You Know?</h1></div>
                <div className="col-md">
                    <div className="facts-container container text-center">
                        <div className="row row-cols-2">
                            {randomFacts.map((fact, index) => (
                                <motion.div
                                    key={fact.title + index}
                                    className="col"
                                    initial={{ opacity: 0, scale: 0.0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.5 * index,
                                        duration: 1,
                                        ease: [0, 0.71, 0.2, 1.01],
                                    }}
                                >
                                    <h3>{fact.title}</h3>
                                    <p>{fact.fact}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="edu-container container text-center rounded">
                        {randomQuote.map((quote, index) => (
                            <motion.div
                                key={quote.quote + index}
                                initial={{ opacity: 0, scale: 0.0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 0.5 * index,
                                    duration: 1,
                                    ease: [0, 0.71, 0.2, 1.01],
                                }}
                            >
                                <h3 className='quote'>{quote.quote}</h3>
                                <p>{quote.author}</p>
                            </motion.div>
                        ))}
                        <div className="card-divider"></div>
                        <h2>Want To See More?</h2>

                        <Link
                            to="/article"
                            style={{
                                textDecoration: 'none',
                                color: '#fff',
                                transition: 'color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.target.style.color = '#de9d76')}
                            onMouseLeave={(e) => (e.target.style.color = '#3D0C02')}
                        >
                            <p className="linking">Check out our Education Page</p>
                        </Link>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default DidYouKnow;
