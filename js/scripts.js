var pokemonRepository = (function () {

  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  function add(item){
    repository.push(item);
  }

  function getAll(){
    return repository;
  }

  function addListItem(pokemonObject){
    var $newListItem = $('.selectedElement').append('<li>some item</li>');
    var $newButton = $('.selectedElement').append('newButton');
    var $div = $('div');

    $newListItem.addClass('grid');
    $newButton.addClass('button');

    $newButton.innerText = pokemonObject.name;

    $('newButton').on('click',
      function (event){
        showDetails(pokemonObject.detailsUrl)
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function (res){
      showModal(res)
        success
    }).catch(function(err){
      console.log(err)
    })
  }

  function loadList(){
    return $.ajax('apiUrl', {
      dataType: 'json'
    }).then(function (response){
      return response.json();
    }).then(function (json){
      json.results.each(function (item){
        var pokemon = {
          name: item.name,
          deatilsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e){
      console.error(e);
    })
  }

  function loadDetails(item){
    console.log(item)
    var url = item;
    return $.ajax('apiUrl', {
      dataType: 'json'
    }).then (function (response){
      return response.json();
    }).then(function (details) {
      let detail = {}
      detail.name = details.name;
      detail.height = details.height;
      detail.types = Object.keys(details.types);
      detail.imageUrl = details.sprites.front_default;

      return detail
    }).catch(function (e) {
      console.error(e);
    });
  }


  function showModal(item){
    var $modalContainer = $('#modal-container');
    $modalContainer.innerHTML = '';
    var modal = $('.selectedElement').append('modal');
    $modal.addClass('modal');

    var closeButtonElement = $('.selectedElement').append('closeButtonElement');
    $closeButtonElement.addClass('modal-close');
    $('closeButtonElement').on('click',function (event){
        hideModal ();
    });

    var nameElement = $('.selectedElement').append('nameElement');
    nameElement.innerText = 'My name is ' + item.name;

    var imageElement = $('.selectedElement').append('imageElement');
    $imageElement.addClass('modal-img');
    $imageElement.setAttribute("src", item.imgUrl);

    var heightElement = $('.selectedElement').append('heightElement');
    nameElement.innerText = 'Height: ' + item.height;

    var weightElement = $('.selectedElement').append('weightElement');
    nameElement.innerText = 'Weight: ' + item.weight;

    $modalContainer.addClass('is-visible');
  }

  function hideModal(){
    var $modalContainer = $('#modal-container');
    $modalContainer.removeClass('is-visible');
  }

  $('window').on('keydown', (e) => {
    if (e.key === 'Escape'){
        hideModal();
    }
  });

  var $modalContainer = $('#modal-container');
  $('$modalContainer').on('click', (e) => {
    var target = e.target;
    if(target === $modalContainer){
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().each(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
