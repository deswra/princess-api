class Lounge {
  constructor(data, api) {
    this.id = data.id;
    this.viewerId = data.viewerId;
    this.name = data.name;
    this.comment = data.comment;
    this.userCount = data.userCount;
    this.userCountLimit = data.userCountLimit;
    this.fan = data.fan;
    this.masterName = data.masterName;
    this.createTime = data.createTime;
    this.updateTime = data.updateTime;
    this.api = api;
  }

  getEventHistory = () => getLoungeEventHistory(this.id, this.api);

  getEventLogs = (eventId, options) => getLoungeEventLogs(this.id, eventId, options, this.api);
}

const getLoungeEventHistory = async (loungeId, api) => {
  const response = api.query(`/lounges/${loungeId}/eventHistory`);
  return response;
};

const getLoungeEventLogs = async (loungeId, eventId, options, api) => {
  const response = api.query(`/events/${eventId}/rankings/logs/loungePoint/${loungeId}`, options);
  return response;
};

const searchLounges = async (name, api) => {
  const response = api.query(`/lounges/search`, { name });
  return response;
};

module.exports = {
  Lounge,
  getLoungeEventHistory,
  getLoungeEventLogs,
  searchLounges,
};
