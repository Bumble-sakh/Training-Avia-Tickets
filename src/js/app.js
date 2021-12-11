import './plugins';
import locations from './store/locations';
import '../scss/style.scss';
import formUI from '../js/views/form';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    const form = formUI.form;

    // Events
    form.addEventListener('submit', e => {
        e.preventDefault();
        onFormSubmit();
    })

    // Handlers
    async function initApp() {
        await locations.init();
        formUI.setData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        // Собрать данные формы
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = locations.getShortDate(formUI.departValue);
        const return_date = locations.getShortDate(formUI.returnValue);
        const currency = currencyUI.currencyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });
    }

});