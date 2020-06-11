export class Component extends HTMLElement {
    constructor({ html, css }) {
        super();
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
    }

    connectedCallback() {
        !this.$$onInit || this.$$onInit();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === newValue) {
            return;
        }

        !this.$$onAttrChange || this.$$onAttrChange(name, oldValue, newValue);
    }

    static get observedAttributes() {
        return !this.$$listenAttribs ? [] : this.$$listenAttribs;
    }
    /**
     * --------Implementation--------
     * static get $$listenAttribs() {
     *      return ['key'];
     * }
     * ------------------------------
     */

     disconnectedCallback() {
        !this.$$onDestroy || this.$$onDestroy();
     }
}