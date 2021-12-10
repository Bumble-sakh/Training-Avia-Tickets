import { Autocomplete } from "../plugins/autocomplete";

class FormUI {
    constructor() {
        this._form = document.forms['locationControls'];
        this.origin = document.getElementById('origin');
        this.destination = document.getElementById('destination');
        this.depart = document.getElementById('depart');
        this.return = document.getElementById('return');
        this.originAutocomplete = new Autocomplete(this.origin, {
            data: null
        });        
        this.destinationAutocomplete = new Autocomplete(this.destination, {
            data: null
        });
    }

    get form() {
        return this._form;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departValue() {
        return this.depart.value;
    }

    get returnValue() {
        return this.return.value;
    }

    setData(data) {
        this.originAutocomplete.options.data = data;
        this.destinationAutocomplete.options.data = data;
    }
}

const formUI = new FormUI();

export default formUI;