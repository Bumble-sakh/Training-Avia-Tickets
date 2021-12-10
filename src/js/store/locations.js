import api from '../services/apiService';

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = null;
    }
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities()
        ])

        const [countries, cities] = response;
        this.countries = this.serializeCountries(countries.data);
        this.cities = this.serializeCities(cities.data);
        this.shortCitiesList = this.createShortCitiesList(this.cities)

        return response;
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