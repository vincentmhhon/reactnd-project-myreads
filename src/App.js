import React from 'react'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import ListBook from './ListBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then(      
      (books) => {
        this.setState({books})
      }
    )
  }

  updateBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(
      () => {
        let newState = this.state.books.filter((b) => b.id !== book.id)
        book.shelf = newShelf
        newState.concat([book])
        this.setState({newState})                                    
      }
    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBook
            books={this.state.books}
            onUpdateBook={(book, newShelf) => {
              this.updateBook(book, newShelf)
            }}
          />
        )}
        />
        <Route path="/search" render={({history}) => (
          <SearchBook />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
