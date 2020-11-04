class Card {
  constructor(data, api) {
    this.id = data.id;
    this.name = data.name;
    this.sortId = data.sortId;
    this.idolId = data.idolId;
    this.idolType = data.idolType;
    this.resourceId = data.resourceId;
    this.rarity = data.rarity;
    this.eventId = data.eventId;
    this.category = data.category;
    this.extraType = data.extraType;
    this.costume = data.costume ? new Costume(data.costume) : null;
    this.bonusCostume = data.bonusCostume ? new Costume(data.bonusCostume) : null;
    this.rank5Costume = data.rank5Costume ? new Costume(data.rank5Costume) : null;
    this.flavorText = data.flavorText;
    this.flavorTextAwakened = data.flavorTextAwakened;
    this.levelMax = data.levelMax;
    this.levelMaxAwakened = data.levelMaxAwakened;
    this.vocalMin = data.vocalMin;
    this.vocalMax = data.vocalMax;
    this.vocalMinAwakened = data.vocalMinAwakened;
    this.vocalMaxAwakened = data.vocalMaxAwakened;
    this.vocalMasterBonus = data.vocalMasterBonus;
    this.danceMin = data.danceMin;
    this.danceMax = data.danceMax;
    this.danceMinAwakened = data.danceMinAwakened;
    this.danceMaxAwakened = data.danceMaxAwakened;
    this.danceMasterBonus = data.danceMasterBonus;
    this.visualMin = data.visualMin;
    this.visualMax = data.visualMax;
    this.visualMinAwakened = data.visualMinAwakened;
    this.visualMaxAwakened = data.visualMaxAwakened;
    this.visualMasterBonus = data.visualMasterBonus;
    this.life = data.life;
    this.masterRankMax = data.masterRankMax;
    this.centerEffect = data.centerEffect ? new CenterEffect(data.centerEffect) : null;
    this.centerEffectName = data.centerEffectName;
    this.skill = data.skill ? data.skill.map((item) => new Skill(item)) : null;
    this.skillLevelMax = data.skillLevelMax;
    this.skillName = data.skillName;
    this.addDate = data.addDate;
    this.api = api;
  }
}

class Costume {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.resourceId = data.resourceId;
    this.modelId = data.modelId;
    this.sortId = data.sortId;
  }
}

class CenterEffect {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;
    this.idolType = data.idolType;
    this.specificIdolType = data.specificIdolType;
    this.attribute = data.attribute;
    this.value = data.value;
    this.songType = data.songType;
    this.attribute2 = data.attribute2;
    this.value2 = data.value2;
  }
}

class Skill {
  constructor(data) {
    this.id = data.id;
    this.description = data.description;
    this.effectId = data.effectId;
    this.evaluation = data.evaluation;
    this.evaluation2 = data.evaluation2;
    this.duration = data.duration;
    this.interval = data.interval;
    this.probability = data.probability;
    this.value = data.value;
  }
}

module.exports = { Card };
