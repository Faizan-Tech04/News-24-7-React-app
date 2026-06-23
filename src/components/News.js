import React, { useEffect } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  const [, setTotalResults] = React.useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&country=in&language=en&category=${props.category}`;

    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.results || []);
    setTotalResults(parsedData.totalResults || parsedData.results?.length || 0);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - News24*7`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  // let url =
  //   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ccea233db7e64d56a74ba642912bd6c7&page=1&pageSize=${props.pageSize}`;
  // setState({ loading: true });
  // let data = await fetch(url);
  // let parsedData = await data.json();

  // console.log(parsedData);
  // setState({
  //   articles: parsedData.articles,
  //   totalResults: parsedData.totalResults,
  //   loading: false,
  // });

  // console.log("Previous");
  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ccea233db7e64d56a74ba642912bd6c7&page=${state.page - 1} &pageSize=${props.pageSize}`;
  // setState({ loading: true });
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // console.log(parsedData);
  // setState({
  //   page: state.page - 1,
  //   articles: parsedData.articles,
  //   loading: false,
  // });

  // if (
  //   !(
  //    state.page + 1 >
  //     Math.ceil(state.totalResults /props.pageSize)
  //   )
  // ) {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ccea233db7e64d56a74ba642912bd6c7&page=${state.page + 1} &pageSize=${props.pageSize}`;

  //   setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   setState({ loading: false });
  //   setState({
  //     page: state.page + 1,
  //     articles: parsedData.articles,
  //   });

  // }

  // const fetchMoreData = async () => {
  //   setPage(page + 1);
  //   const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&country=in&language=en&category=${props.category}`;
  //   console.log(url);
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   setArticles(articles.concat(parsedData.results || []));
  //   setTotalResults(parsedData.totalResults);
  // };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        {props.category === "top"
          ? "News24*7 - Top Headlines"
          : `News24*7 - ${capitalizeFirstLetter(props.category)} Headlines`}
      </h1>
      {loading && <Spinner />}

      <div className="container">
        <div className="row">
          {Array.isArray(articles) &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.link}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={
                      element.image_url
                        ? element.image_url
                        : "https://dummyimage.com/300x200/cccccc/000000&text=No+Image"
                    }
                    newsUrl={element.link}
                    author={element.creator ? element.creator[0] : "Unknown"}
                    date={element.pubDate}
                    source={element.source_id}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
