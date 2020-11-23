const fetch = require('node-fetch');
const queryString = require('query-string');
const dayjs = require('dayjs');

const { AppVersion, AssetVersion } = require('./version');
const { Card } = require('./card');
const {
  Event,
  getEventBorders,
  getEventBorderPoints,
  getEventSummaries,
  getEventIdolPointSummaries,
  getEventLogs,
  getEventIdolPointLogs,
} = require('./event');
const { Lounge, getLoungeEventHistory, getLoungeEventLogs, searchLounges } = require('./lounge');
const { getIdFromName, getNameFromId } = require('./helpers');

const HOST = 'https://api.matsurihi.me/mltd/v1/';
const SITE = 'https://mltd.matsurihi.me/';

class Princess {
  constructor(options = {}) {
    this.server = options.server || 'ja';
    this.prettyPrint = options.prettyPrint || false;
    this.host = options.host || HOST;
    if (this.server === 'ja') {
      this.site = SITE;
    } else {
      this.site = `${SITE}${this.server}/`;
    }
  }

  static getIdolIdFromName = (name) => getIdFromName(name);
  static getIdolNameFromId = (idolId) => getNameFromId(idolId);

  getVersion = async (type, version) => {
    const response = await this.query(
      `/version/${type ? type : 'latest'}${version ? `/${version}` : ''}`
    );
    switch (type) {
      case 'apps':
        if (version) return new AppVersion(response, this);
        return response.map((item) => new AppVersion(item, this));
      case 'assets':
        if (version) return new AssetVersion(response, this);
        return response.map((item) => new AssetVersion(item, this));
      default:
        return {
          app: new AppVersion(response.app, this),
          res: new AssetVersion(response.res, this),
        };
    }
  };

  getCard = async (cardId) => {
    const response = await this.query(`/cards/${cardId}`);
    return response.map((item) => new Card(item, this));
  };

  getCards = async (options) => {
    const response = await this.query('/cards', options);
    return response.map((item) => new Card(item, this));
  };

  getEvent = async (eventId) => {
    const response = await this.query(`/events/${eventId}`);
    return new Event(response, this);
  };

  getEvents = async (options) => {
    if (options && options.at) options.at = dayjs(options.at).format();
    const response = await this.query('/events', options);
    return response.map((item) => new Event(item, this));
  };

  getBorders = (eventId) => getEventBorders(eventId, this);

  getBorderPoints = (eventId) => getEventBorderPoints(eventId, this);

  getSummaries = (eventId, type) => getEventSummaries(eventId, type, this);

  getIdolPointSummaries = (eventId, idolId) => getEventIdolPointSummaries(eventId, idolId, this);

  getLogs = async (eventId, type, rank, options) =>
    getEventLogs(eventId, type, rank, options, this);

  getIdolPointLogs = async (eventId, idolId, rank, options) =>
    getEventIdolPointLogs(eventId, idolId, rank, options, this);

  getLounge = async (loungeId) => {
    const response = await this.query(`/lounges/${loungeId}`);
    return new Lounge(response, this);
  };

  getEventHistory = async (loungeId) => getLoungeEventHistory(loungeId, this);

  getLoungeEventLogs = async (loungeId, eventId, options) =>
    getLoungeEventLogs(loungeId, eventId, options, this);

  searchLounges = async (name) => searchLounges(name, this);

  query = (path, queries) =>
    fetch(
      queryString.stringifyUrl(
        {
          url: `${this.host}${this.server}${path}`,
          query: { ...queries, prettyPrint: this.prettyPrint },
        },
        { arrayFormat: 'comma' }
      )
    ).then((res) => res.json());
}

module.exports = Princess;
