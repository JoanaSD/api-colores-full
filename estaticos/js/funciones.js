const lista = document.querySelector("ul");
const formulario = document.querySelector("form");
const input = document.querySelector('input[type="text"]');

function itemColor({id,r,g,b}){
    let item = document.createElement("li");
    item.style.backgroundColor = `rgb(${[r,g,b].join(",")})`;
    item.innerText = [r,g,b].join(",");

    item.addEventListener("click", () => {
        fetch(`/borrar/${id}`, {
            method : "DELETE"
        })
        .then(respuesta => respuesta.json())
        .then(({error}) => {
            if(!error){
                return item.remove();
            }
            console.log("mostrar error a usuario");
        });
    });

    return item;
}

fetch("/colores")
.then(respuesta => respuesta.json())
.then(respuesta => {

    if(!respuesta.error){

        return respuesta.forEach(color => lista.appendChild(itemColor(color)));

    }
    console.log("error al cargar los colores");

})


formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    let [r,g,b] = input.value.split(",");

    fetch("/crear-color", {
        method : "POST",
        body : JSON.stringify({r,g,b}),
        headers : {
            "Content-type" : "application/json"
        }
    })
    .then(respuesta => respuesta.json())
    .then(({id,error}) => {

        if(!error){
           return lista.appendChild(itemColor({id,r,g,b}));
        }
        console.log("mostrar error a usuario");
    });
});