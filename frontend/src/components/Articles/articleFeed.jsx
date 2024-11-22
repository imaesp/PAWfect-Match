import React, { useState } from 'react';
import './articleFeed.scss';
import articles from './hillspet_articles';

const defaultImage = 'path/to/default-image.jpg'; 

const ArticleList = () => {
  
  const [imageError, setImageError] = useState({});

  const handleImageError = (index) => {
    // Update state to fallback to default image for the failed image
    setImageError((prevState) => ({ ...prevState, [index]: true }));
  };

  return (
    <div className="article-list">
      {articles.map((article, index) => {
        // Check if image has failed to load, if so, use the default image
        const imageUrl = imageError[index]
          ? defaultImage
          : article.image_url || defaultImage;

        return (
          <div className="article-card" key={index}>
            <img
              src={imageUrl}
              alt={article.title}
              className="article-image"
              onError={() => handleImageError(index)} // Fallback to default image on error
            />
            <h2 className="article-title">{article.title}</h2>
            <p className="article-description">{article.description}</p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
            >
              Read More
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
