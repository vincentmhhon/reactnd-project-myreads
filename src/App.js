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

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBook
            books={this.state.books}
          />
        )}
        />
        <Route path='/search' render={({history}) => (
          <SearchBook />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
