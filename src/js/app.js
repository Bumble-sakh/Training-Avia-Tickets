import './plugins';
import locations from './store/locations';
import '../scss/style.scss';

locations.init().then(res => {
    console.log(res)
    console.log(locations);
    console.log(locations.getCitiesByCountryCode("US"));
});