import html from './home.component.html';
import css from './home.component.scss';

import { Component } from '../../models/core/component';

class HomeComponent extends Component {
    constructor() {
        super({ html, css });
    }

    $$onInit() {
        alert('hello');
    }
}

customElements.define('app-home', HomeComponent);