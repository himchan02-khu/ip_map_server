const axios = require('axios');

const apiKey = 'AIzaSyA70KzHVrptd0-9lUE2uynA8CdKA2wqUpw';

async function fetchAddress(lat, lon) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=ko&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            if (data.results.length > 0) {
                return data.results[0].formatted_address;
            } else {
                return '주소를 찾을 수 없습니다';
            }
        } else {
            throw new Error('Failed to load address');
        }
    } catch (error) {
        throw new Error(`Error fetching address: ${error.message}`);
    }
}

async function fetchAddresses(lat1, lon1, lat2, lon2) {
    const address1 = await fetchAddress(lat1, lon1);
    const address2 = await fetchAddress(lat2, lon2);
    return { address1, address2 };
}

module.exports = {
    fetchAddress,
    fetchAddresses
};
