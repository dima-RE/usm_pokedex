// colocar plugin al inicio siempre
tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    //value es para detectar el texto (input)
    let nombre = document.querySelector("#nombre-txt").value;
    //contenido escrito en tinymc
    let descripcion = tinymce.get("descripcion-txt").getContent();
    // checked indica si el boton esta seleccionado
    let legendario = document.querySelector("#legendario-si").checked;
    let tipo = document.querySelector("#tipo-txt").value;

    console.log(`Pokemon ${nombre} ${descripcion} ${legendario} ${tipo}`);
    //alert("Wena shoro " + nombre); Molesto a morir
});