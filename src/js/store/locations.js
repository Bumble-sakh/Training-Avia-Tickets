import api from '../services/apiService';

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
        this.airlines = null;
    }
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
            this.api.airlines(),
        ])

        const [countries, cities, airlines] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);

        return response;
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    getCityCodeByKey(key) {
        return this.cities[key].code;
    }

    getShortDate(date) {
        return date.split('').slice(0, -3).join('');
    }

    createShortCitiesList(cities) {
        return Object.entries(cities).reduce((acc, [city_name, city]) => {
            const data = {
                label: city_name,
                value: city.code,
            }
            acc.push(data)
            return acc;
        }, []);
    }

    serializeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {})
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const country_name = this.getCountryNameByCode(city.country_code);
            const city_name = city.name || city.name_translations.en;
            const key = `${city_name}, ${country_name}`
            acc[key] = city;
            return acc;
        }, {})
    }

    serializeAirlines(airlines) {
        return airlines.reduce((acc, airline) => {
            airline.name = airline.name || airline.name_translations.en;
            airline.logo = `https://pics.avs.io/100/100/${airline.code}.png`;
            acc[airline.code] = airline;
            return acc;
        }, {});
    }

    getCountryNameByCode(code) {
        return this.countries[code].name;
    }

    async fetchTickets(params) {
        const response = await this.api.prices(params);
        console.log(response);
    }
}

const locations = new Locations(api);

export default locations;