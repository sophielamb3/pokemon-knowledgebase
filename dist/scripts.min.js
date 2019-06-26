var pokemonRepository = (function() {
  var o = [],
    n = 'https://pokeapi.co/api/v2/pokemon/',
    t = $('#modal-container'),
    e = $('.modal-body');
  function a(n) {
    o.push(n);
  }
  function i() {
    t.removeClass('is-visible');
  }
  return (
    $('window').on('keydown', o => {
      'Escape' === o.key && i();
    }),
    {
      add: a,
      getAll: function() {
        return o;
      },
      addListItem: function(o) {
        $('.selectedElement').append(
          `<button class="button" data-url="${o.deatilsUrl}">${o.name}</button>`
        );
      },
      showDetails: function(o) {
        pokemonRepository
          .loadDetails(o)
          .then(function(o) {
            !(function(o) {
              t.html(''), e.html(''), console.log(o);
              var n = `\n                        <div>\n                          <h4> My name is ${
                o.name
              }</h4>\n                          <img src="${
                o.imageUrl
              }" />\n                          <h5>I am ${
                o.height
              } cm tall!</h5>\n                        </div>\n                          `;
              e.html(n), t.addClass('is-visible');
            })(o);
          })
          .catch(function(o) {
            console.log(o);
          });
      },
      loadList: function() {
        return $.ajax(n, { dataType: 'json' })
          .then(function(o) {
            console.log(o),
              o.results.forEach(function(o) {
                a({ name: o.name, deatilsUrl: o.url });
              });
          })
          .catch(function(o) {
            console.error(o);
          });
      },
      loadDetails: function(o) {
        return (
          console.log(o),
          $.ajax(o, { dataType: 'json' }).then(function(o) {
            console.log(o);
            let n = {};
            return (
              (n.name = o.name),
              (n.height = o.height),
              (n.types = Object.keys(o.types)),
              (n.imageUrl = o.sprites.front_default),
              n
            );
          })
        );
      },
      hideModal: i
    }
  );
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(o) {
    pokemonRepository.addListItem(o);
  });
}),
  $('.selectedElement').on('click', '.button', function(o) {
    o.preventDefault(), pokemonRepository.showDetails($(this).data('url'));
  });
