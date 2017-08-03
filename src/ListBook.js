import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBook extends Component {  
  
  static protoType = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props
    let currentlyReadingBooks, wantToReadBooks, readBooks
    currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading")
    wantToReadBooks = books.filter((book) => book.shelf === "wantToRead")
    readBooks = books.filter((book) => book.shelf === "read")

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf 
              title="Currently Reading"
              books={currentlyReadingBooks}
              onUpdateBook={this.props.onUpdateBook}
            />
            <BookShelf 
              title="Want to Read"
              books={wantToReadBooks}
              onUpdateBook={this.props.onUpdateBook}
            />
            <BookShelf 
              title="Read"
              books={readBooks}
              onUpdateBook={this.props.onUpdateBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBook