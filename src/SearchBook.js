import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

  state = {
    query: '',
    showBooks: []
  }

  search = (query) => {
    BooksAPI.search(query).then(
      (books) => {
        const savedBooks = this.props.savedBooks
        let showBooks = books.map((book) => {
           let temp = savedBooks.filter((savedBook) => book.id === savedBook.id)[0]
           return (temp)? temp: book
        })
        this.setState({showBooks: showBooks})
        this.setState({ query: query.trim() })
      }
    )    
  }

  render() {
    const { showBooks } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" onChangeCapture={(e) => this.search(e.target.value)} placeholder="Search by title or author"/>
            
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {showBooks.map((book) =>
                <li key={book.id}>
                  <Book 
                    book={book}
                    onUpdateBook={this.props.onUpdateBook} 
                  />
                </li>
              )}
          </ol>
          
        </div>
      </div>
    )
  }
}

export default SearchBook