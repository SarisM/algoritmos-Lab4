export const getData = async () => {
    try {
        //aqui lo que dice es: quiero que en la constante data hagas el fetch a este api, el await le dice que espere hasta 
        //que tu termines de traer todo y el then lo que hace es decirle que esa respuesta me la traiga en formato json 
        //como un objeto 
        const data = await fetch ('https://rickandmortyapi.com/api/character').then(resultado => resultado.json());

        //mostrar el resultado
        // console.log(data)

        //retornar la data, porque como tal no lo vamos a usar aqui, lo que voy a hacer es en otro lago ejecutar la funcion getData
        //para traerme todo lo que le pedi al api
        return data.results
    } catch (error) {
        console.error(error);

    }
}

export const episodeCharacter = async (url: string) => {
    try {
        const dataEpisode = await fetch ( 
            url 
        );
        const episode = await dataEpisode.json();
        return episode;
    } catch (error){
        console.log(error)
    }
}