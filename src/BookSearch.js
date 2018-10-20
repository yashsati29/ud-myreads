import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class BookSearch extends Component {
	state = {
		query: '',
		sBooks: []
	};

	updateQuery = event => {
		this.setState({ query: event.target.value }, () => {
			this.searchBooks(event);
		});
	};

	searchBooks = event => {
		if (this.state.query) {
			BooksAPI.search(this.state.query).then(res => {
				if (res.error) {
					this.setState({ sBooks: [] });
				} else if (res) {
					this.updateBooks(res);
				}
			});
		} else {
			this.setState({ sBooks: [] });
		}
	};

	updateBooks = books => {
		for (const book of books) {
			book.shelf = 'none';
			for (const shelvedBook of this.props.shelvedBooks) {
				if (book.id === shelvedBook.id) book.shelf = shelvedBook.shelf;
			}
		}

		this.setState({ sBooks: books });
	};

	render() {
		const { sBooks } = this.state;

		return (
			<div className="search-books">
			<div className="search-books-bar">
			<Link to="/" className="close-search">
			Close
			</Link>
			<div className="search-books-input-wrapper">
			<input
			type="text"
			value={this.state.query}
			placeholder="Search by title or author"
			onChange={event => {
				this.updateQuery(event);
			}}
			/>
			</div>
			</div>
			<div className="search-books-results">
			<ol className="books-grid">
			{sBooks.map(book => (
				<Book key={book.id} book={book} onChangeShelf={this.onChangeShelf} />
				))}
				</ol>
				</div>
				</div>
				);
		}
	}

	BookSearch.propTypes = {
		shelvedBooks: PropTypes.array.isRequired,
		onChangeShelf: PropTypes.func.isRequired
	};

	export default BookSearch;