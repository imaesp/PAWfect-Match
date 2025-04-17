import React, { useState } from 'react';
import './articleFeed.scss';
import articles from './hillspet_articles';

const defaultImage = 'path/to/default-image.jpg';

const ArticleList = () => {
  const [imageError, setImageError] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

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

  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (direction) => {
      setPage((prevPage) => {
          const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
          if (direction === 'next' && prevPage < totalPages) {
              return prevPage + 1;
          } else if (direction === 'prev' && prevPage > 1) {
              return prevPage - 1;
          }
          return prevPage;
      });
  };


  return (
    <div className="article-grid container mt-4">
      {/* Search bar */}
      <div className="row mb-3">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
      </div>


      {/* Article list */}
      <div className="article-list">
        {paginatedArticles.length > 0 ? (
          paginatedArticles.map((article, index) => {
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
       {/* Pagination Controls */}
      <div className="pagination-controls">
          <button className='pagination-button' onClick={() => handlePageChange('prev')} disabled={page === 1}>
              Previous
          </button>
          <span>Page {page}</span>
          <button className='pagination-button' onClick={() => handlePageChange('next')} disabled={page * itemsPerPage >= (filteredArticles).length}>
              Next
          </button>
      </div>
    </div>
  );
};

export default ArticleList;
