import React from 'react'
import ArticleList from '../../components/Articles/articleFeed'
import './ArticlePage.scss'

function ArticlePage() {
  return (
    <div className='article-container'>
        <div className='article-page-title'>
          <h1>Welcome to our Education Center, where you'll find a wide range of informative articles on pet care for dogs and cats. <br />
            Whether you're a first-time pet owner or an experienced caregiver, use the search feature to easily find tips, advice, and insights on all things pet care.</h1>
        </div>
        <ArticleList></ArticleList>
    </div>
  )
}

export default ArticlePage;