// obtiene el elemento ul donde se mostrarán las imágenes
var listaImagenes = document.getElementById('lista-imagenes');

// maneja el evento change del input file
document.getElementById('inputFile').addEventListener('change', function() {
  var archivos = this.files;

  // itera sobre cada archivo seleccionado
  for (var i = 0; i < archivos.length; i++) {
    var archivo = archivos[i];
    var lector = new FileReader();

    // crea un nuevo elemento li para cada imagen y agrega la imagen a la lista
    lector.onload = (function(archivo) {
      return function(evento) {
        var imagen = document.createElement('img');
        imagen.src = evento.target.result;

        var item = document.createElement('li');
        item.appendChild(imagen);
        listaImagenes.appendChild(item);

        // almacena la imagen en LocalStorage
        var imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];
        imagenes.push(evento.target.result);
        localStorage.setItem('imagenes', JSON.stringify(imagenes));
      };
    })(archivo);

    lector.readAsDataURL(archivo);
  }
});

// muestra las imágenes almacenadas en LocalStorage al cargar la página
window.addEventListener('load', function() {
  var imagenes = JSON.parse(localStorage.getItem('imagenes')) || [];
  for (var i = 0; i < imagenes.length; i++) {
    var imagen = document.createElement('img');
    imagen.src = imagenes[i];

    var item = document.createElement('li');
    item.appendChild(imagen);
    listaImagenes.appendChild(item);
  }
});
