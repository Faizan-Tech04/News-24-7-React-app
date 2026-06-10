import React, { Component } from 'react'

export class NewsItem extends Component {

  
  render() {
   let {title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className='my-3'>
 <div className="card">
  <img src= {!imageUrl?"https://cdn.sanity.io/images/s3y3vcno/production/62f409ba891aac91753fc2f4043b8f9f6d271891-1500x1029.jpg?auto=format&w=960&h=540&crop=focalpoint&fit=clip&q=75&fm=jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <a  rel="noreferrer" href= {newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default  NewsItem
