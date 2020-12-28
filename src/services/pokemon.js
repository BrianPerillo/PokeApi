
/*Función Comentada - Se usaba con url fija, pero al usar offset y limit dinámico queda obsoleta
export async function getPokemon({ url }) {          // a getPokemon le estamos pasando como parámetro un objeto que tiene una propiedad que es url, por eso hacemos ({url})
    return new Promise((resolve, reject) => {  // Para indicarle que tome del objeto que recibe el atributo que se llama url
        fetch(url)
        .then(res => res.json())
        .then(data => 
                resolve(data)
            )
    });
}
*/

export async function getPokemon(url) {          // a getPokemon le estamos pasando como parámetro un objeto que tiene una propiedad que es url, por eso hacemos ({url})
    return new Promise((resolve, reject) => {  // Para indicarle que tome del objeto que recibe el atributo que se llama url
        //console.log("EEEEE" + url);
        fetch(url)
        .then(res => res.json())
        .then(data => ( 
                resolve(data)/*,console.log("EEEEE22" + data)*/)
            )
           
    });
}

export async function getAllPokemons(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
    });
}
