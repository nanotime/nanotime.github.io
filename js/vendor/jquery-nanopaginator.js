(function($) {

 $.fn.nanoPaginator = function(options) {

  // Objeto de configuración
  var config = $.extend({
    posts: 5, // Cantidad de posts que se mostrarán por página
    postsContainer: '.posts', // Nodo que contiene los posts
    postItem: '.post', // Posts contenidos en un nodo
    nextBtn: '#next', // Botón Next
    prevBtn: '#prev', // Botón Prev
    paginatorContainer: '.paginator' // Contenedor del paginador
  }, options);

  // Cantidad total de nodos contenidos en postContainer
  var items = $(config.postsContainer).children().length;

  // Total de paginas a repartir los elementos paginados
  var pags;

  if (items % 2 == 0) {
    pags = Math.floor(items / config.posts);
  } else {
    pags = Math.ceil(items / config.posts);
  }

  // Nodo vacío a llenar de elementos lista para el paginador
  var list = config.paginatorContainer;

  // Pagina en la que se ven los primeros elementos paginados
  var init = 1; //

  return paginate();

  function paginate () {
    showPosts(init);
    buildPaginator();
    addActiveClass();
    next();
    prev();
  }

  function showPosts (total) {
    $(config.postItem).hide();

    $(config.postItem).each(function(n) {
      if (n >= config.posts * (total - 1) && n < config.posts * total)
        $(this).show();
    });
  } // showPosts

  function buildPaginator () {

    for (var i = 0; i < pags; i++) {
      if (i == 0)
        $(list).append('<a href="#" class="pag-item active">' + (i+1) + '</a>');
      else
        $(list).append('<a href="#" class="pag-item">' + (i+1) + '</a>');
    }

    $(list).children().last().addClass('last');

    $('.pag-item').click(function() {
      showPosts(Number($(this).text()));
      init = Number($(this).children().text());
    })
  } // buildPaginator

  function addActiveClass () {
    $('.pag-item').click(function() {
      $('.pag-item').removeClass('active')
      $(this).addClass('active');
    })
  }

  function next () {
    var last = Number($('.last a').text());
    $(config.nextBtn).click(function() {
      init++;
      if (init > last) {
        init = last;
        showPosts(init);
      } else {
        showPosts(init);
      }
    });
  } // next

  function prev () {
    $(config.prevBtn).click(function() {
      init--;
      if (init < 1) {
        init = 1;
        showPosts(init);
      } else {
        showPosts(init);
      }
    });
  } // prev
 };

}(jQuery));
