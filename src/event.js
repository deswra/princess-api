const { DateTime } = require('luxon');
const { getLoungeEventLogs } = require('./lounge');

class Event {
  constructor(data, api) {
    this.id = data.id;
    this.type = data.type;
    this.appealType = data.appealType;
    this.schedule = new Schedule(data.schedule, api);
    this.name = data.name;
    this.api = api;
  }

  get shortName() {
    if (!this.name.includes('～')) return this.name;
    return this.name.substring(this.name.indexOf('～') + 1, this.name.lastIndexOf('～'));
  }

  get hasBorders() {
    if (this.type === 1 || this.type === 2 || this.type === 6 || this.type === 7 || this.type === 9 || this.type === 14)
      return false;
    return true;
  }

  get hasIdolBorders() {
    return this.type === 5;
  }

  get appealTypeName() {
    switch (this.appealType) {
      case 1:
        return 'vocal';
      case 2:
        return 'dance';
      case 3:
        return 'visual';
    }
  }

  get typeName() {
    switch (this.type) {
      case 1:
        return 'THEATER SHOW TIME☆';
      case 2:
        return 'Millicolle!';
      case 3:
        return 'Platinum Star Theater';
      case 4:
        return 'Platinum Star Tour';
      case 5:
        return 'Anniversary';
      case 6:
        return 'MILLION LIVE WORKING☆';
      case 7:
        return 'April Fools';
      case 9:
        return 'Millicolle! (box gacha)';
      case 10:
        return 'Platinum Star Twin Stage';
      case 11:
        return 'Platinum Star Tune';
      case 12:
        return 'Platinum Star Twin Stage';
      case 13:
        return 'Platinum Star Tale';
      case 14:
        return 'THEATER TALK PARTY☆';
      case 16:
        return 'Platinum Star Treasure';
      default:
        return this.type;
    }
  }

  getBorders = () => getEventBorders(this.id, this.api);

  getBorderPoints = () => getEventBorderPoints(this.id, this.api);

  getSummaries = (type = 'eventPoint') => getEventSummaries(this.id, type, this.api);

  getIdolPointSummaries = (idolId) => getEventIdolPointSummaries(this.id, idolId, this.api);

  getLogs = (type, rank, options) => getEventLogs(this.id, type, rank, options, this.api);

  getIdolPointLogs = (idolId, rank, options) => getEventIdolPointLogs(this.id, idolId, rank, options, this.api);

  getLoungeLogs = (loungeId, options) => getLoungeEventLogs(loungeId, this.id, options, this.api);
}

class Schedule {
  constructor(data, api) {
    this.beginDate = data.beginDate;
    this.endDate = data.endDate;
    this.pageBeginDate = data.pageBeginDate;
    this.pageEndDate = data.pageEndDate;
    this.boostBeginDate = data.boostBeginDate;
    this.boostEndDate = data.boostEndDate;
    this.api = api;
  }

  get isCurrent() {
    const now = DateTime.local();
    const beginDate = DateTime.fromISO(this.beginDate, { setZone: true });
    const endDate = DateTime.fromISO(this.endDate, { setZone: true });
    if (now >= beginDate && now <= endDate) return true;
    return false;
  }

  get isBoosting() {
    if (!this.boostBeginDate) return null;
    const now = DateTime.local();
    const boostBeginDate = DateTime.fromISO(this.boostBeginDate, { setZone: true });
    const boostEndDate = DateTime.fromISO(this.boostEndDate, { setZone: true });
    if (now >= boostBeginDate && now <= boostEndDate) return true;
    return false;
  }
}

const getEventBorders = async (eventId, api) => {
  const response = await api.query(`/events/${eventId}/rankings/borders`);
  return response;
};

const getEventBorderPoints = async (eventId, api) => {
  const response = await api.query(`/events/${eventId}/rankings/borderPoints`);
  return response;
};

const getEventSummaries = async (eventId, type, api) => {
  const response = await api.query(`/events/${eventId}/rankings/summaries/${type}`);
  return response;
};

const getEventIdolPointSummaries = async (eventId, idolId, api) => {
  const response = await api.query(`/events/${eventId}/rankings/summaries/idolPoint/${idolId}`);
  return response;
};

const getEventLogs = async (eventId, type, rank, options, api) => {
  if (options?.timeMin) options.timeMin = DateTime.fromISO(options.timeMin).setZone(api.jpZone).toString();
  const response = await api.query(`/events/${eventId}/rankings/logs/${type}/${rank.join()}`, options);
  return response;
};

const getEventIdolPointLogs = async (eventId, idolId, rank, options, api) => {
  if (options?.timeMin) options.timeMin = DateTime.fromISO(options.timeMin).setZone(api.jpZone).toString();
  const response = await api.query(`/events/${eventId}/rankings/logs/idolPoint/${idolId}/${rank}`, options);
  return response;
};

module.exports = {
  Event,
  getEventBorders,
  getEventBorderPoints,
  getEventSummaries,
  getEventIdolPointSummaries,
  getEventLogs,
  getEventIdolPointLogs,
};
