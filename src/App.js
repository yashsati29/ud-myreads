import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';
import './App.css';

class BooksApp extends Component {
	state = {
		books: []
	};

	componentDidMount() {
		BooksAPI.getAll().then(res => {
			this.setState({
				books: res
			});
		});
	}

	updateShelf = (book, event) => {
		BooksAPI.update(book, event.target.value).then(res => {
			BooksAPI.getAll().then(res => {
				console.log(res);
				this.setState({
					books: res
				});
			});
		});
	};

	render() {
		const { books } = this.state;

		return (
			<div className="app">
			<Route path="/search" render={() => <BookSearch />} />
			<Route
			exact
			path="/"
			render={() => (
				<div className="list-books">
				<div className="list-books-title">
				<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
				<div>
				<BookShelf
				key="Currently Reading"
				shelfName="Currently Reading"
				books={books.filter(book => book.shelf === 'currentlyReading')}
				onChangeShelf={this.updateShelf}
				/>
				<BookShelf
				key="Want to Read"
				shelfName="Want to Read"
				books={books.filter(book => book.shelf === 'wantToRead')}
				onChangeShelf={this.updateShelf}
				/>
				<BookShelf
				key="Read"
				shelfName="Read"
				books={books.filter(book => book.shelf === 'read')}
				onChangeShelf={this.updateShelf}
				/>
				</div>
				</div>
				<div className="open-search">
				<Link to="/search">Add Book</Link>
				</div>
				</div>
				)}
			/>
			</div>
			);
		}
	}

	export default BooksApp;