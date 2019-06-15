var pokemonRepository = (function () {

  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  var $modalContainer = $('#modal-container');

  function add(item){
    repository.push(item);
  }

  function getAll(){
    return repository;
  }

  function addListItem(pokemonObject){
    var $newButton = $('.selectedElement').append(`<button class="button" data-url="${pokemonObject.deatilsUrl}">${pokemonObject.name}</button>`);
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function (res){
      showModal(res)
    }).catch(function(err){
      console.log(err)
    })
  }

  function loadList(){
    return $.ajax(apiUrl, {
      dataType: 'json'
    }).then(function (json){
      console.log(json)
      json.results.forEach(function (item){
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
    return $.ajax(item, {
      dataType: 'json'
    })
    .then(function (details) {
      console.log(details)
      let detail = {}
      detail.name = details.name;
      detail.height = details.height;
      detail.types = Object.keys(details.types);
      detail.imageUrl = details.sprites.front_default;

      return detail
    })
  }



  function showModal(item){

    $modalBody.html('') //clear the modal-body`

      var htmlInformation = `<div>
      <h4> My name is ${item.name}</h4>
      <img src="${item.imageUrl}" />
      <h5>I am ${item.height} cm tall!</h5>
      </div>`


    $modalContainer.addClass('is-visible');
  }

  function hideModal(){
    $modalContainer.removeClass('is-visible');
  }

  $('window').on('keydown', (e) => {
    if (e.key === 'Escape'){
        hideModal();
    }
  });

  $modalContainer.on('click', '.modal-close', function(e){
    hideModal();
  });

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

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


$('.selectedElement').on('click', '.button',
  function (event){
    event.preventDefault()
    pokemonRepository.showDetails($(this).data("url"))
  });
