import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Quote } from './components/Quote/Quote';
import { QuoteButton } from './components/QuoteButton/QuoteButton';

import { WikiquoteApi } from './utils/wikiquotes-api';
import { setRandomColor, setTextAndAuthor } from './utils/utils';

import $ from 'jquery';

import TwitterLogo from './resources/twitter-logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text : '',
      author : ''
    };
    this.generateQuote = this.generateQuote.bind(this);
  }

  async generateQuote() {
    setRandomColor();
    $('#quote-box').slideUp(800);
    await setTextAndAuthor(this);
    $('#quote-box').slideDown(800);
  }

  componentWillMount() {
    this.generateQuote();
  }

  render() {

    return (
      <div className="App">
        <div id="quote-box">
          <Quote text={<p>{this.state.text}</p>} author={this.state.author}/>
          <QuoteButton onClick={this.generateQuote}/>
          <div id="tweet-quote">
            <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(this.state.text + ' ' + this.state.author)}>
              <div className="tweet-button">
                <img src={TwitterLogo} />
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
