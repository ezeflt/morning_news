import { useSelector } from "react-redux";
import Head from "next/head";
import styles from "../styles/Bookmarks.module.css";
import Article from "./Articles/Article";

function Bookmarks() {

  const bookmarksData = useSelector((state) => state.bookmarks.value); // bookmarks data from local storage

  let bookmarks = <p>No article</p>;  // initialise no bookmark message

  // check if bookmarks data is greater than 0
  if (bookmarksData.length > 0) 
    // bookmarks becomes all articles bookmarked
    bookmarks = bookmarksData.map((data, i) => {return <Article key={i} {...data} isBookmarked />});
  

  return (
    <div>
      <Head>
        <title>Morning News - Bookmarks</title>
      </Head>
      <div className={styles.container}>
        <h2 className={styles.title}>Bookmarks</h2>
        <div className={styles.articlesContainer}>{bookmarks}</div>
      </div>
    </div>
  );
}

export default Bookmarks;
