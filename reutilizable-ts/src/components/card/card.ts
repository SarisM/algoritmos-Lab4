//el enum es como una plantilla para no equivocarnos con los nombres y los tipados
//para poder utilizarlo aqui y en el abuelo
export enum Attribute {
    "image" = "image",
    "name" = "name",
    "status" = "status",
    "specie" = "specie",
    "type" = "type",
    "origin" = "origin",
    "episode" = "episode"

}


class Card extends HTMLElement {

    image? : string;
    name? : string;
    status?: string;
    specie?: string;
    type?: string;
    origin?: string;
    episode?: string;
    


    static get observedAttributes () {
        //aqui le estamos diciendo return ["name", "specie"...] se acrualiza solo si lo que quito o le agfrego atributos
        return Object.keys(Attribute); 
    }

    attributeChangedCallback (propName: Attribute, oldValue: string |undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    constructor ( ){
        super();
        this.attachShadow({mode: 'open'});
    }
    connectedCallback () {
        this.render();
    }

    render() {
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <section>
            <img id="img" src="${this.image ? this.image : 'Not found'}">
            <p>${this.name}</p>
            <p>${this.status}</p>
            <p>${this.specie}</p>
            <p>${this.type}</p>
            <p>${this.origin}</p>
            <p>${this.episode}</p>
            </section>
            
            `

        }
    }

}
customElements.define('card-character', Card)
export default Card
