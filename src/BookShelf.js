import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
function BookShelf(props) {
	return (
		<div className="bookshelf">
		<h2 className="bookshelf-title">{props.shelfName}</h2>
		<div className="bookshelf-books">
		<ol className="books-grid">
		{props.books.map(book => (
			<Book key={book.id} book={book} onChangeShelf={props.onChangeShelf} />
			))}
			</ol>
			</div>
			</div>
			);
}
BookShelf.propTypes = {
	shelfName: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};
export default BookShelf;