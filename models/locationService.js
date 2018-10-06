const db = require('../db');

class LocationService {
  constructor(data) {
    this.locationId = data.locationId;
    this.serviceId = data.serviceId;

    Object.keys(this).forEach((key) => {
      if (this[key] === undefined) { delete this[key]; }
    });
  }

  static async get(locationId, serviceId) {
    let locationServiceTbl = '';

    try {
      locationServiceTbl = await db.select('location_service', '',
        [{ col: 'locationId', oper: '=', val: locationId },
          {
            logic: 'AND', col: 'serviceId', oper: '=', val: serviceId,
          }]);
    } catch (e) {
      return 0;
    }

    const locationService = this.processResult(locationServiceTbl)[0];

    return locationService;
  }

  static async create({ locationId, serviceId }) {
    try {
      await db.insert('location_image',
        ['locationId', 'serviceId'],
        [locationId, serviceId]);
    } catch (e) {
      return 0;
    }

    return this.get(locationId, serviceId);
  }

  static async remove(locationId, serviceId) {
    const locationService = this.get(locationId, serviceId);

    try {
      await db.delete('location_service',
        [{ col: 'locationId', oper: '=', val: locationId },
          {
            logic: 'AND', col: 'serviceId', oper: '=', val: serviceId,
          }]);
    } catch (e) {
      return 0;
    }

    return locationService;
  }

  static processResult(data) {
    this.result = [];
    data.forEach((obj) => {
      this.result.push(new LocationService(obj));
    });
    return this.result;
  }
}

module.exports = LocationService;
