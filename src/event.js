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
}

class Borders {
  constructor(data, api) {
    this.eventPoint = data.eventPoint;
    this.highScore = data.highScore;
    this.highScore2 = data.highScore2;
    this.highScoreTotal = data.highScoreTotal;
    this.loungePoint = data.loungePoint;
    this.idolPoint = data.idolPoint;
    this.api = api;
  }
}

class BorderPoints {
  constructor(data, api) {
    this.eventPoint = data.eventPoint ? new Points(data.eventPoint) : null;
    this.highScore = data.highScore ? new Points(data.highScore) : null;
    this.highScore2 = data.highScore2 ? new Points(data.highScore2) : null;
    this.highScoreTotal = data.highScoreTotal ? new Points(data.highScoreTotal) : null;
    this.loungePoint = data.loungePoint ? new Points(data.loungePoint) : null;
    this.api = api;
  }
}

class Points {
  constructor(data) {
    this.scores = data.scores;
    this.summaryTime = data.summaryTime;
    this.count = data.count;
  }
}

const getEventBorders = async (eventId, api) => {
  const response = await api.query(`/events/${eventId}/rankings/borders`);
  return new Borders(response, api);
};

const getEventBorderPoints = async (eventId, api) => {
  const response = await api.query(`/events/${eventId}/rankings/borderPoints`);
  return new BorderPoints(response, api);
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
  const response = await api.query(`/events/${eventId}/rankings/logs/${type}/${rank}`, options);
  return response;
};

const getEventIdolPointLogs = async (eventId, idolId, rank, options, api) => {
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
