const { getNameFromId, IdolType, capitalize } = require('./helpers');

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

  get cardTitle() {
    const splitedName = this.name.split('　');
    if (splitedName.length === 1) return 'Initial';
    return splitedName[0];
  }

  get romajiName() {
    return getNameFromId(this.idolId);
  }

  get rarityName() {
    switch (this.rarity) {
      case 1:
        return 'N';
      case 2:
        return 'R';
      case 3:
        return 'SR';
      case 4:
        return 'SSR';
    }
  }

  get idolTypeObj() {
    return new IdolType(this.idolType);
  }

  get link() {
    return `${this.api.site}cards/${this.id}`;
  }

  get totalAppealMaxAwakened() {
    return this.vocalMaxAwakened + this.danceMaxAwakened + this.visualMaxAwakened;
  }

  get vocalMaxAwakenedMR() {
    return this.vocalMaxAwakened + this.masterRankMax * this.vocalMasterBonus;
  }

  get danceMaxAwakenedMR() {
    return this.danceMaxAwakened + this.masterRankMax * this.danceMasterBonus;
  }

  get visualMaxAwakenedMR() {
    return this.visualMaxAwakened + this.masterRankMax * this.visualMasterBonus;
  }

  get totalAppealMaxAwakenedMR() {
    return (
      this.totalAppealMaxAwakened +
      this.masterRankMax * (this.vocalMasterBonus + this.danceMasterBonus + this.visualMasterBonus)
    );
  }

  get categoryName() {
    switch (this.category) {
      case 'normal':
        return 'Initial';
      case 'gasha0':
        return 'Permanent';
      case 'gasha1':
        return 'Limited';
      case 'gasha2':
        return 'FES';
      case 'gasha4':
        return 'Premium Pickup';
      case 'gasha5':
        return 'Second Hairstyle';
      case 'event0':
        return 'MilliColle';
      case 'event1':
        return 'PSTheater';
      case 'event2':
        return 'PSTour';
      case 'event3':
        return 'Anniversary';
      case 'event4':
        return 'Voting event SR';
      case 'event5':
        return 'MilliColle';
      case 'other':
        return 'Other';
    }
  }

  get extraTypeName() {
    switch (this.extraType) {
      case 0:
        return 'Normal';
      case 2:
        return 'Ranking';
      case 3:
        return 'Points';
      case 4:
        return 'FES';
      case 5:
        return '1st Anniversary';
      case 6:
        return 'Extra';
      case 7:
        return '2nd Anniversary';
      case 8:
      case 11:
        return 'Extra Ranking';
      case 9:
      case 12:
        return 'Extra Points';
      case 10:
        return '3rd Anniversary';
      case 14:
        return '4th Anniversary';
    }
  }

  getIcon(awakened = false) {
    return `https://storage.matsurihi.me/mltd/icon_l/${this.resourceId}_${awakened ? '1' : '0'}.png`;
  }

  getCardImage(awakened = false) {
    return `https://storage.matsurihi.me/mltd/card/${this.resourceId}_${awakened ? '1' : '0'}_b.png`;
  }

  getArt(awakened = false) {
    if (this.rarity !== 4 || this.category === 'event3') return this.getCardImage(awakened);
    return `https://storage.matsurihi.me/mltd/card_bg/${this.resourceId}_${awakened ? '1' : '0'}.png`;
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

  get title() {
    return this.name.substring(this.name.indexOf('[') + 1, this.name.indexOf(']'));
  }

  get image() {
    return `https://storage.matsurihi.me/mltd/costume_icon_ll/${this.resourceId}.png`;
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

  get translatedDescription() {
    if (!this.value) return 'This card does not have a leader skill.';
    let description = '';
    if (this.specificIdolType) {
      const specificIdolType = new IdolType(this.specificIdolType);
      if (specificIdolType.id === 4) {
        description += 'If your team has idols of all three attributes, ';
      } else {
        description += `If all your idols have ${capitalize(specificIdolType.name)} attribute, `;
      }
    }
    const centerEffectIdolType = new IdolType(this.idolType);
    description += `${
      centerEffectIdolType.id === 4 && this.specificIdolType
        ? centerEffectIdolType.name
        : capitalize(centerEffectIdolType.name)
    } idols's ${getAttributeName(this.attribute)} increase by ${this.value}%.`;
    return description;
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

  get translatedDescription() {
    switch (this.effectId) {
      case 1:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that ${getEvaluationType(
          this.evaluation
        )} note scores will increase by ${this.value[0]}% for ${this.duration} seconds.`;
      case 2:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that combo bonuses will increase by ${this.value[0]}% for ${this.duration} seconds.`;
      case 3:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that ${getEvaluationType(
          this.evaluation
        )} notes will recover ${this.value[0]} life for ${this.duration} seconds.`;
      case 4:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that life does not decrease for ${this.duration} seconds.`;
      case 5:
        return `Every ${this.interval} seconds, there is a ${
          this.probability
        }% chance that combos will continue through ${getEvaluationType(this.evaluation)} notes for ${
          this.duration
        } seconds.`;
      case 6:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that ${getEvaluationType(
          this.evaluation
        )} notes will become Perfect notes for ${this.duration} seconds.`;
      case 7:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that ${getEvaluationType(
          this.evaluation
        )} note scores will increase by ${this.value[0]}% and combo bonuses will increase by ${this.value[1]}% for ${
          this.duration
        } seconds`;
      case 8:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that ${getEvaluationType(
          this.evaluation
        )} note scores will increase by ${this.value[0]}% for ${this.duration} seconds and ${
          this.value[1]
        } life will be recovered for every ${getEvaluationType(this.evaluation2)} note.`;
      case 10:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that ${
          this.value[1]
        } life will be consumed so that ${getEvaluationType(this.evaluation)} note scores increase by ${
          this.value[0]
        }% for ${this.duration} seconds`;
      case 11:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance that ${this.value[1]} life will be consumed so that combo bonuses increase by ${this.value[0]}% for ${this.duration} seconds`;
      case 12:
        return `Every ${this.interval} seconds, there is a ${this.probability}% chance to increase other skills's score up and combo bonus effectiveness by ${this.value[0]}%.`;
    }
  }
}

const getAttributeName = (attribute) => {
  switch (attribute) {
    case 1:
      return 'vocal appeal';
    case 2:
      return 'dance appeal';
    case 3:
      return 'visual appeal';
    case 4:
      return 'total appeal';
    case 5:
      return 'life';
    case 6:
      return 'skill activation rate';
  }
};

const getEvaluationType = (evaluation) => {
  switch (evaluation) {
    case 0:
      return 'all';
    case 1:
      return 'Perfect';
    case 2:
      return 'Perfect/Great';
    case 3:
      return 'Great';
    case 4:
      return 'Great/Good/Fast/Slow';
    case 5:
      return 'Perfect/Great/Good';
    case 6:
      return 'Perfect/Great/Good/Fast/Slow';
    case 7:
      return 'Great/Good';
  }
};

module.exports = { Card };
