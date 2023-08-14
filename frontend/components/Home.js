import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Article from "./Articles/Article";
import TopArticle from "./Articles/TopArticle";
import styles from "../styles/Home.module.css";

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value); // the bookmarks local storage

  let topArticles; // initialise the variable to hold the top article

  const [articlesData, setArticlesData] = useState([]); // state to hold all articles data
  const [topArticleData, setTopArticleData] = useState({}); // state to hold the top article

  /**
   * Description :
   * when the component is mounted
   * fetch the route from the backend that returns all articles
   *
   */
  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((response) => response.json())
      .then((data) => {
        setTopArticleData(data.articles[0]); // store the top article to state
        setArticlesData(data.articles.filter((data, i) => i > 0)); // store all articles to state (without the top article)
      });
  }, []);

  /**
   * Description :
   * loop trougth array of articles data
   *
   */
  const articles = articlesData.map((data, i) => {
    // check if the article title is include in your bookmarked
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.title === data.title
    );

    // return Article with its data and its bookmarked
    return <Article key={i} {...data} isBookmarked={isBookmarked} />;
  });

  /**
   * Check if the top article is include in your bookmarked
   *
   * if true topArticles = TopArticle component with its data and bookmarked true
   * if false topArticles = TopArticle component with its data and bookmarked false
   */
  if (bookmarks.some((bookmark) => bookmark.title === topArticleData.title)) {
    topArticles = <TopArticle {...topArticleData} isBookmarked={true} />;
  } else {
    topArticles = <TopArticle {...topArticleData} isBookmarked={false} />;
  }

  return (
    <div>
      <Head>
        <title>Morning News</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>{articles}</div>
    </div>
  );
}

export default Home;
