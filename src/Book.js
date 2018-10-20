import React from 'react';
import PropTypes from 'prop-types';
function Book(props) {
	const { book, onChangeShelf } = props;
	return (
		<li>
		<div className="book">
		<div className="book-top">
		<div
		className="book-cover"
		style={{
			width: 128,
			height: 193,
			backgroundImage: `url(${book.imageLinks.thumbnail})`
		}}
		/>
		<div className="book-shelf-changer">
		<select
		value={book.shelf}
		onChange={event => {
			onChangeShelf(book, event);
		}}
		>
		<option value="move" disabled>
		Move to...
		</option>
		<option value="currentlyReading">Currently Reading</option>
		<option value="wantToRead">Want to Read</option>
		<option value="read">Read</option>
		<option value="none">None</option>
		</select>
		</div>
		</div>
		<div className="book-title">{book.title}</div>
		<div className="book-authors">{book.authors.join(', ')}</div>
		</div>
		</li>
		);
}
Book.propTypes = {
	book: PropTypes.object.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};
export default Book;