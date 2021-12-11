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
        const city = Object.values(this.cities).find((item) => {
            return item.full_name === key;
        });
        return city.code;
    }

    getCityNameByCode(code) {
        return this.cities[code].name;
    }

    getShortDate(date) {
        return date.split('').slice(0, -3).join('');
    }

    createShortCitiesList(cities) {
        return Object.values(cities).reduce((acc, city) => {
            const data = {
                label: city.full_name,
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
            const full_name = `${city_name}, ${country_name}`;
            acc[city.code] = {
                ...city,
                country_name,
                full_name,
            }
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
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map((ticket) => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
            }
        })
    }


}

const locations = new Locations(api);

export default locations;