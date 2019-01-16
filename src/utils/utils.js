import $ from 'jquery';

import { WikiquoteApi } from './wikiquotes-api';

// Sets components state with text and author
async function setTextAndAuthor(component) {
  const category = Helper.getRandomQuoteCategory();

  await WikiquoteApi.getRandomQuote(category, async result => {
    component.setState( { text : Helper.formatQuote(result.quote) } );
  }, errorMessage => {
    console.log(errorMessage);
  });

  await $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      const name = data.results[0].name;
      component.setState({ author : Helper.formatAuthor(name)});
    },
    error: function(xhr, result, status){
      console.log(new Error('Error retrieving name'));
    }
  });
}

// Helper functions
const Helper = {
  formatQuote(text) {
    return this.formatHtml(`"${text}"`);
  },

  formatAuthor(name) {
    if (name.first && name.last) {
      return this.capitalizeEveryWord(`- ${name.first} ${name.last}`);
    } else {
      return name;
    }
  },

  capitalizeEveryWord(text) {
    return text.split(' ').map(word => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(' ');
  },

  getRandomQuoteCategory() {
    const categories = ['quote', 'music', 'life', 'politics', 'love', 'science', 'history', 'word', 'nature'];

    let num = Math.floor(Math.random() * categories.length);
    return categories[num];
  },

  formatHtml(text) {
    let template = text.replace(/\<img .*?alt=[\"']?([^\"']*)[\"']?.*?\/?\>/g, /$1/); /* Use image alt text. */
    template = template.replace(/\<a .*?href=[\"']?([^\"']*)[\"']?.*?>(.*)<\/a\>/g, /$2/); /* Convert links to something useful */
    template = template.replace(/<(\/p|\/div|\/h\\d|br)\\w?\/?\>/g, /\n/); /* Let's try to keep vertical whitespace intact. */
    template = template.replace(/\<[A-Za-z/][^<>]*\>/g, ""); /* Remove the rest of the tags. */

    return template;
  }
}

// Sets random color for body background
function setRandomColor() {
  const red = Math.floor(Math.random() * 216);
  const green = Math.floor(Math.random() * 216);
  const blue = Math.floor(Math.random() * 216);

  const color = `rgb(${red}, ${green}, ${blue})`;

  $('body').css({ backgroundColor : color });
  $('.tweet-button img').css({ backgroundColor : color });
  $('#new-quote').css({ backgroundColor : color });
}

export { setRandomColor, setTextAndAuthor };
