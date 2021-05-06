
// colocar plugin al inicio siempre
//plugin Tinymce
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
//Fin plugin
// ----------- Funciones ----------------
//Definir arreglo fuera para que persista
const pokemones = [];

// Eliminar pokemon de las listas
const eliminarPokemon = async function(){
  // await y async deben funcionar en conjunto
  // actualmente, ya no se usa la promesa "then"
  /*Swal.fire({
    title: `¿Desea enviar al profesor el pokemon ${pokemones[this.nro].nombre}?`,
    showCancelButton: true,
    confirmButtonText: "Si, enviar!"
  })then(res...);*/
  let res = await Swal.fire({
    title: `¿Desea enviar al profesor el pokemon ${pokemones[this.nro].nombre}?`,
    showCancelButton: true,
    confirmButtonText: "Si, enviar!"
  });
  //debugger; // Para identificar lineas
  if(res.isConfirmed){
    pokemones.splice(this.nro,1); //elimina posicion y luego la cantidad a elimnar (Pos,Cant)
    cargarTabla(); // recarga la tabla
    Swal.fire("Pokemon enviado al profesor Oak.")
  } else {
    Swal.fire("Operacion cancelada")
  }
  //this.nro; //this es una referencia al elemento que se apreta
}; //Es una función asincrónica 

// Cargas elementos en la lista y en la tabla
const cargarTabla = ()=>{
  // Referencia
  let tbody = document.querySelector("#tabla-tbody");
  //elimina los elementos antiguos ingresados
  tbody.innerText = "";
  //Recorrer lista
  //i++ = evalua, incrementa, evalua
  //++i = incrementa, evalua = mas eficiente
  for(let i=0; i < pokemones.length; ++i){
    let p = pokemones[i];
    //Generar fila (tr)
    let tr = document.createElement("tr");
    //Generar celdas (td)
    let tdNro = document.createElement("td");
    tdNro.innerText = (i+1);            //propiedades de texto
    let tdNombre = document.createElement("td");
    tdNombre.innerText = p.nombre;
    if(p.legendario){
      tdNombre.classList.add("text-warning");
    }
    //if(legendario.checked == true){
    //  alert("A");
    //}

    let tdTipo = document.createElement("td");
    //tdTipo.innerText = p.tipo;

    let icono = document.createElement("i");
    if(p.tipo == "fuego"){
      icono.classList.add("fas","fa-fire","text-danger","fa-3x");
    }else if(p.tipo == "agua"){
      icono.classList.add("fas","fa-tint","text-primary","fa-3x");
    }else if(p.tipo == "planta"){
      icono.classList.add("fas","fa-leaf","text-success","fa-3x");
    }else if(p.tipo == "electrico"){
      icono.classList.add("fas","fa-bolt","warning","text-warning","fa-3x");
    }else{
      icono.classList.add("fas","fa-star","text-info","fa-3x");
    }
    tdTipo.classList.add("text-center");
    tdTipo.appendChild(icono);

    let tdDesc = document.createElement("td");
    tdDesc.innerHTML = p.descripcion;   //propiedades html
    let tdAcciones = document.createElement("td");
    // Agregar un boton al td de acciones
    let boton = document.createElement("button");
    boton.classList.add("btn","btn-danger");
    boton.innerText = "Enviar al profesor Oak";
    boton.nro = i;
    boton.addEventListener("click",eliminarPokemon);

    tdAcciones.appendChild(boton);

    //tdAcciones.innerText = p.;
    //Agregar td al tr
    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdDesc);
    tr.appendChild(tdAcciones);
    //Agregar tr a la tabla
    tbody.appendChild(tr);
  }
}

document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    //value es para detectar el texto (input)
    let nombre = document.querySelector("#nombre-txt").value;
    //contenido escrito en tinymc
    let descripcion = tinymce.get("descripcion-txt").getContent();
    // checked indica si el boton esta seleccionado
    let legendario = document.querySelector("#legendario-si").checked;
    let tipo = document.querySelector("#tipo-txt").value;

    //console.log(`Pokemon ${nombre} ${descripcion} ${legendario} ${tipo}`);
    //alert("Wena shoro " + nombre); Molesto a morir

    //Como crear un objeto
    let pokemon = {};
    pokemon.nombre = nombre;
    pokemon.descripcion = descripcion;
    pokemon.legendario = legendario;
    pokemon.tipo = tipo;

    //Como guardar en una lista de elementos
    pokemones.push(pokemon); //Agrega el objeto a la lista
    //pokemones.splice(2,0,pokemon);  Agrega a la posicion 2, sin eliminar el valor anterior.
    //pokemon[0] = a; 
    cargarTabla();
    //titulo, texto, tipo
    swal.fire("Exito!","Pokemon registrado","success")

});

document.querySelector("#limpiar-btn").addEventListener("click", ()=>{
  document.querySelector("#nombre-txt").value = "";
  //document.querySelector("#descripcion-txt").value = "";
  tinymce.get("descripcion-txt").setContent("");
  document.querySelector("legendario-no").checked = true;
  document.querySelector("#tipo-select").value = "planta";
});