import React from 'react';
import './QuoteButton.css';

export class QuoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className="QuoteButton">
        <div id="new-quote" onClick={this.handleClick}>
          New Quote
        </div>
      </div>
    );
  }
}
