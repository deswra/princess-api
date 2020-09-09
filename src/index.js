const fetch = require('node-fetch');
const queryString = require('query-string');

const { AppVersion, AssetVersion } = require('./version');
const { Card } = require('./card');
const { Event, Borders, BorderPoints } = require('./event');

const HOST = 'https://api.matsurihi.me/mltd/v1/';

class Princess {
  constructor(options = {}) {
    this.server = options.server || 'ja';
    this.prettyPrint = options.prettyPrint || false;
    this.host = options.host || HOST;
  }

  getVersion = async (type, version) => {
    const response = await this.query(`/version/${type ? type : 'latest'}${version ? `/${version}` : ''}`);
    switch (type) {
      case 'apps':
        if (version) return new AppVersion(response);
        return response.map((item) => new AppVersion(item));
      case 'assets':
        if (version) return new AssetVersion(response);
        return response.map((item) => new AssetVersion(item));
      default:
        return {
          app: new AppVersion(response.app),
          res: new AssetVersion(response.res),
        };
    }
  };

  getCard = async (cardId) => {
    const response = await this.query(`/cards/${cardId}`);
    return response.map((item) => new Card(item));
  };

  getCards = async (options) => {
    const response = await this.query('/cards', options);
    return response.map((item) => new Card(item));
  };

  getEvent = async (eventId) => {
    const response = await this.query(`/events/${eventId}`);
    return new Event(response);
  };

  getEvents = async (options) => {
    const response = await this.query('/events', options);
    return response.map((item) => new Event(item));
  };

  getBorders = async (eventId) => {
    const response = await this.query(`/events/${eventId}/rankings/borders`);
    return new Borders(response);
  };

  getBorderPoints = async (eventId) => {
    const response = await this.query(`/events/${eventId}/rankings/borderPoints`);
    return new BorderPoints(response);
  };

  getSummaries = async (eventId, type) => {
    const response = await this.query(`/events/${eventId}/rankings/summaries/${type}`);
    return response;
  };

  getIdolPointSummaries = async (eventId, idolId) => {
    const response = await this.query(`/events/${eventId}/rankings/summaries/idolPoint/${idolId}`);
    return response;
  };

  query = (path, queries) => {
    console.log(
      queryString.stringifyUrl(
        {
          url: `${this.host}${this.server}${path}`,
          query: { ...queries, prettyPrint: this.prettyPrint },
        },
        { arrayFormat: 'comma' }
      )
    );
    return fetch(
      queryString.stringifyUrl(
        {
          url: `${this.host}${this.server}${path}`,
          query: { ...queries, prettyPrint: this.prettyPrint },
        },
        { arrayFormat: 'comma' }
      )
    ).then((res) => res.json());
  };
}

module.exports = Princess;
