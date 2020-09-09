class Event {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.appealType = data.appealType;
    this.schedule = new Schedule(data.schedule);
    this.name = data.name;
  }
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
  constructor(data) {
    this.eventPoint = data.eventPoint;
    this.highScore = data.highScore;
    this.highScore2 = data.highScore2;
    this.highScoreTotal = data.highScoreTotal;
    this.loungePoint = data.loungePoint;
    this.idolPoint = data.idolPoint;
  }
}

class BorderPoints {
  constructor(data) {
    this.eventPoint = data.eventPoint ? new Points(data.eventPoint) : null;
    this.highScore = data.highScore ? new Points(data.highScore) : null;
    this.highScore2 = data.highScore2 ? new Points(data.highScore2) : null;
    this.highScoreTotal = data.highScoreTotal ? new Points(data.highScoreTotal) : null;
    this.loungePoint = data.loungePoint ? new Points(data.loungePoint) : null;
  }
}

class Points {
  constructor(data) {
    this.scores = data.scores;
    this.summaryTime = data.summaryTime;
    this.count = data.count;
  }
}

module.exports = { Event, Borders, BorderPoints };
