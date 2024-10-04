import * as components from './components/indexPadre';
import Card, { Attribute } from './components/card/card';
import { getData } from './services/dataFetch';

class AppContainer extends HTMLElement {

    cards: Card[] = [];
    dataApi: any[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        this.dataApi = await getData();
        this.render();
    }

    createCardsRickandMorty(cardCount: number) {
        // Limpiar el arreglo de tarjetas antes de agregar nuevas
        this.cards = [];

        // Crear tarjetas según la cantidad especificada
        this.dataApi.slice(0, cardCount).forEach((element) => {
            const card = this.ownerDocument.createElement("card-character") as Card;
            card.setAttribute(Attribute.image, element.image);
            card.setAttribute(Attribute.name, element.name);
            card.setAttribute(Attribute.status, element.status);
            card.setAttribute(Attribute.specie, element.species);
            card.setAttribute(Attribute.type, element.type);
            card.setAttribute(Attribute.origin, element.origin.name);
            card.setAttribute(Attribute.episode, element.episode[0]);
            this.cards.push(card);
        });
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div>
                    <input id="cardCount" type="number" placeholder="Enter number of cards" min="1" max="${this.dataApi.length}" />
                    <button id="renderButton">Render Cards</button>
                </div>
                <div id="cardContainer"></div>
            `;

            const renderButton = this.shadowRoot.querySelector("#renderButton") as HTMLButtonElement;
            const cardCountInput = this.shadowRoot.querySelector("#cardCount") as HTMLInputElement;
            const cardContainer = this.shadowRoot.querySelector("#cardContainer") as HTMLDivElement;

            renderButton.addEventListener("click", () => {
                const cardCount = parseInt(cardCountInput.value) || 0;

                // Limpiar el contenedor de tarjetas antes de agregar nuevas
                cardContainer.innerHTML = "";

                // Crear las tarjetas con la cantidad especificada
                this.createCardsRickandMorty(cardCount);

                // Agregar las tarjetas al contenedor
                this.cards.forEach((card) => {
                    cardContainer.appendChild(card);
                });
            });
        }
    }
}

customElements.define("app-container", AppContainer);
