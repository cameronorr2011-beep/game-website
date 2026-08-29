(function () {
  'use strict';

  var FEED_URL = 'https://gamemonetize.com/feed.php?format=0&num=50&page=1';
  var container = document.getElementById('games');
  if (!container) return;

  function text(value) {
    return value == null ? '' : String(value);
  }

  function safeUrl(value) {
    try {
      var url = new URL(text(value), window.location.href);
      return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '#';
    } catch (error) {
      return '#';
    }
  }

  function renderGame(game) {
    var card = document.createElement('article');
    card.className = 'game-card external-game-card';

    var image = document.createElement('img');
    image.src = safeUrl(game.thumb);
    image.alt = text(game.title);
    image.loading = 'lazy';

    var title = document.createElement('h3');
    title.textContent = text(game.title);

    var description = document.createElement('p');
    description.textContent = text(game.description);

    var category = document.createElement('span');
    category.className = 'difficulty easy';
    category.textContent = text(game.category);

    var link = document.createElement('a');
    link.className = 'btn btn-primary';
    link.href = safeUrl(game.url);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Play game';

    card.append(image, title, description, category, link);
    return card;
  }

  fetch(FEED_URL)
    .then(function (response) {
      if (!response.ok) throw new Error('Feed returned HTTP ' + response.status);
      return response.json();
    })
    .then(function (games) {
      if (!Array.isArray(games) || games.length === 0) {
        throw new Error('Feed returned no games');
      }
      container.replaceChildren.apply(container, games.map(renderGame));
    })
    .catch(function (error) {
      console.error('Game feed failed:', error);
      container.innerHTML = '<p class="feed-status">More games are temporarily unavailable. Please try again later.</p>';
    });
})();
