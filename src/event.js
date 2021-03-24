const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
const { getLoungeEventLogs } = require('./lounge');

class Event {
  constructor(data, api) {
    this.id = data.id;
    this.type = data.type;
    this.appealType = data.appealType;
    this.schedule = new Schedule(data.schedule);
    this.name = data.name;
    this.api = api;
  }

  get shortName() {
    if (!this.name.includes('～')) return this.name;
    return this.name.substring(this.name.indexOf('～') + 1, this.name.lastIndexOf('～'));
  }

  get hasBorders() {
    if (this.type === 1 || this.type === 2 || this.type === 6 || this.type === 7 || this.type === 9)
      return false;
    return true;
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
    }
  }

  getBorders = () => getEventBorders(this.id, this.api);

  getBorderPoints = () => getEventBorderPoints(this.id, this.api);

  getSummaries = (type = 'eventPoint') => getEventSummaries(this.id, type, this.api);

  getIdolPointSummaries = (idolId) => getEventIdolPointSummaries(this.id, idolId, this.api);

  getLogs = (type, rank, options) => getEventLogs(this.id, type, rank, options, this.api);

  getIdolPointLogs = (idolId, rank, options) =>
    getEventIdolPointLogs(this.id, idolId, rank, options, this.api);

  getLoungeLogs = (loungeId, options) => getLoungeEventLogs(loungeId, this.id, options, this.api);
}

class Schedule {
  constructor(data) {
    this.beginDate = data.beginDate;
    this.endDate = data.endDate;
    this.pageBeginDate = data.pageBeginDate;
    this.pageEndDate = data.pageEndDate;
    this.boostBeginDate = data.boostBeginDate;
    this.boostEndDate = data.boostEndDate;
  }

  get isCurrent() {
    dayjs.extend(isBetween);
    if (dayjs().isBetween(dayjs(this.beginDate), dayjs(this.endDate))) return true;
    return false;
  }

  get isBoosting() {
    if (!this.boostBeginDate) return false;
    dayjs.extend(isBetween);
    if (dayjs().isBetween(dayjs(this.boostBeginDate), dayjs(this.boostEndDate))) return true;
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
  if (options && options.timeMin) options.timeMin = dayjs(options.timeMin).format();
  const response = await api.query(
    `/events/${eventId}/rankings/logs/${type}/${rank.join()}`,
    options
  );
  return response;
};

const getEventIdolPointLogs = async (eventId, idolId, rank, options, api) => {
  if (options && options.timeMin) options.timeMin = dayjs(options.timeMin).format();
  const response = await api.query(
    `/events/${eventId}/rankings/logs/idolPoint/${idolId}/${rank}`,
    options
  );
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
