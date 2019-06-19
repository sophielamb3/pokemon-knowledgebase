/*global $:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: "error"*/

var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  var $modalContainer = $('#modal-container');
  var $modalBody = $('.modal-body');

  function add(item) {
    repository.push(item);
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemonObject) {
    /* eslint-disable */
    var $button = $('.selectedElement').append(
      /* eslint-enable*/
      `<button class="button" data-url="${pokemonObject.deatilsUrl}">${
        pokemonObject.name
      }</button>`
    );
  }

  function showDetails(item) {
    pokemonRepository
      .loadDetails(item)
      .then(function(res) {
        showModal(res);
      })
      .catch(function(err) {
        /* eslint-disable no-console*/
        console.log(err);
        /* eslint-enable no-console*/
      });
  }

  function loadList() {
    return $.ajax(apiUrl, {
      dataType: 'json'
    })
      .then(function(json) {
        /* eslint-disable no-console*/
        console.log(json);
        /* eslint-enable no-console*/
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            deatilsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        /* eslint-disable no-console*/
        console.error(e);
        /* eslint-enable no-console*/
      });
  }

  function loadDetails(item) {
    /* eslint-disable no-console*/
    console.log(item);
    /* eslint-enable no-console*/
    // var url = item;
    return $.ajax(item, {
      dataType: 'json'
    }).then(function(details) {
      /* eslint-disable no-console*/
      console.log(details);
      /* eslint-enable no-console*/
      let detail = {};
      detail.name = details.name;
      detail.height = details.height;
      detail.types = Object.keys(details.types);
      detail.imageUrl = details.sprites.front_default;

      return detail;
    });
  }

  function showModal(item) {
    $modalContainer.html('');
    $modalBody.html('');

    /* eslint-disable no-console*/
    console.log(item);
    /* eslint-enable no-console*/
    var htmlInformation = `
                        <div>
                          <h4> My name is ${item.name}</h4>
                          <img src="${item.imageUrl}" />
                          <h5>I am ${item.height} cm tall!</h5>
                        </div>
                          `;
    /* eslint-disable */
    var $modalContent = $modalBody.html(htmlInformation);
    /*eslint-enable*/

    $modalContainer.addClass('is-visible');
  }

  function hideModal() {
    $modalContainer.removeClass('is-visible');
  }

  $('window').on('keydown', e => {
    if (e.key === 'Escape') {
      hideModal();
    }
  });

  //  $modalContainer.on('click', '.modal-close', function(e) {
  //    hideModal();
  //  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    // showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

$('.selectedElement').on('click', '.button', function(event) {
  event.preventDefault();
  pokemonRepository.showDetails($(this).data('url'));
});
