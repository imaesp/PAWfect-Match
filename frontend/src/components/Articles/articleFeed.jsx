import React, { useState } from 'react';
import './articleFeed.scss';
import articles from './hillspet_articles';

const defaultImage = 'path/to/default-image.jpg';

const ArticleList = () => {
  const [imageError, setImageError] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleImageError = (index) => {
    setImageError((prevState) => ({ ...prevState, [index]: true }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter articles based on search term
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-4">
      {/* Search bar */}
      <div className="row mb-3">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
      </div>

      {/* Article list */}
      <div className="article-list">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => {
            const imageUrl = imageError[index]
              ? defaultImage
              : article.image_url || defaultImage;

            return (
              <div className="article-card" key={index}>
                <img
                  src={imageUrl}
                  alt={article.title}
                  className="article-image"
                  onError={() => handleImageError(index)}
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
          })
        ) : (
          <p className="no-results">No articles found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
