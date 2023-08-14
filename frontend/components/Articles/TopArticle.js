import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../../reducers/bookmarks";
import styles from "../../styles/TopArticle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function TopArticle(props) {

  const user = useSelector((state) => state.user.value);  // the user local stoage
	const dispatch = useDispatch();	// initialise the dispatch
	let iconStyle = {};	// initialise the bookmark color


	/**
	 * when click to handleBookmarkClick
	 * fetch the user bookmarks 
	 * if bookmarks exists then remove it else add it
	 */
	function handleBookmarkClick ()
	{
		// if user has not a token, stop the function
		if(!user.token) 
		return;
		
		// fetch the user bookmarks 
		fetch(`https://morning-back.vercel.app/users/canBookmark/${user.token}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.result && data.canBookmark) {
				// if bookmarks exists then remove it else add it
				props.isBookmarked ? dispatch(removeBookmark(props)) :  dispatch(addBookmark(props));
			}
		});
	};

	// if article is bookmarked, channge the icon color 
	props.isBookmarked && (iconStyle = { color: "#E9BE59" }) ;

  return (
    <div className={styles.topContainer}>
      <img src={props.urlToImage} className={styles.image} alt={props.title} />
      <div className={styles.topText}>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <FontAwesomeIcon onClick={() => handleBookmarkClick()} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon}/>
        <h4>{props.author}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default TopArticle;
