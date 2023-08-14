import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../../reducers/bookmarks";
import Image from "next/image";
import styles from "../../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function Article(props) {

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
		fetch(`http://localhost:3000/users/canBookmark/${user.token}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.result && data.canBookmark) {
				// if bookmarks exists then remove it else add it
				props.isBookmarked ? dispatch(removeBookmark(props)) : dispatch(addBookmark(props));
			}
		});
	};

	// if article is bookmarked, channge the icon color 
	props.isBookmarked && (iconStyle = { color: "#E9BE59" }) ;

	return (
		<div className={styles.articles}>
			<div className={styles.articleHeader}>
				<h3>{props.title}</h3>
				<div className={styles.icon}>
					<FontAwesomeIcon onClick={() => handleBookmarkClick()} icon={faBookmark} style={iconStyle} className={styles.bookmarkIcon} />
				</div>
			</div>
			<h4 style={{ textAlign: "right" }}>- {props.author}</h4>
			<div className={styles.divider}></div>
			<Image src={props.urlToImage} alt={props.title} width={600} height={314} />
			<p>{props.description}</p>
		</div>
	);
}

export default Article;
