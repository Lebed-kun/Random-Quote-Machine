import React from 'react';
import './Quote.css';

export class Quote extends React.Component {
  render() {
    return (
      <div className="Quote">
        <div id="text">
          {this.props.text}
        </div>
        <div id="author" className="Quote-author">
          {this.props.author}
        </div>
      </div>
    );
  }
}
