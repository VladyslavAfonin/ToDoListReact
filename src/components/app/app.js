import React, { Component } from 'react';

import AppHeader from '../app-header/app-header'
import SearchPanel from '../search-panel/search-panel'
import PostStatusFilter from '../post-status-filter/post-status-filter'
import PostList from '../post-list/post-list'
import PostAddForm from '../post-add-form/post-add-form'

import './app.css'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [
        {label: "Going to learn React", important: false, like: false, id: 1},
        {label: "That is so good", important: false, like: false, id: 2},
        {label: "I need a break...", important: false, like: false, id: 3}
      ],
      term: '',
      filter: 'all'
    }

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);

    this.maxId = 4;
  }

  deleteItem(id){
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id); // поиск индекса элемента по которому кликнули по id
      
      const before = data.slice(0, index); // получить массив до нашего индекса
      const after = data.slice(index + 1); // получить массив после нашего индекса
      const newArray = [...before, ...after]; // объединить в новый массив

      return {
        data: newArray
      }
    })
  }

  addItem(body){
    const newItem = {
      label: body,
      important: false,
      like: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArray = [...data, newItem];
      return {
        data: newArray
      }
    })
  }

  onToggleImportant(id){
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      
      const old = data[index];
      const newItem = {...old, important: !old.important};
      const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

      return {
        data: newArray
      }
      
    })
  }

  onToggleLiked(id){
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      
      const old = data[index];
      const newItem = {...old, like: !old.like};
      const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

      return {
        data: newArray
      }
      
    })
  }

  searchPost(items, term){
    if(term.length === 0){
      return items;
    }
    return items.filter((item) => {
      return item.label.indexOf(term) > -1
    })
  }

  filterPost(items, filter){
    if(filter === 'like'){
      return items.filter(item => item.like)
    } else {
      return items;
    }
  }

  onUpdateSearch(term){
    this.setState({
      term: term
    })
  }

  onFilterSelect(filter){
    this.setState({
      filter: filter
    })
  }

  render(){
    const {data, term, filter} = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <div className="app">
        <AppHeader liked = {liked} allPosts = {allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <PostStatusFilter filter = {filter} onFilterSelect = {this.onFilterSelect} />
        </div>
        <PostList 
          posts = {visiblePosts} 
          onDelete = {this.deleteItem}
          onToggleImportant = {this.onToggleImportant}
          onToggleLiked = {this.onToggleLiked} />
        <PostAddForm onAdd = {this.addItem} />
      </div>
    );
  }
}