const chars = {
  1: {
    name: 'Haruka Amami',
    keywords: ['haruka', 'amami'],
  },
  2: {
    name: 'Chihaya Kisaragi',
    keywords: ['chihaya', 'kisaragi'],
  },
  3: {
    name: 'Miki Hoshii',
    keywords: ['miki', 'hoshii'],
  },
  4: {
    name: 'Yukiho Hagiwara',
    keywords: ['yukiho', 'hagiwara'],
  },
  5: {
    name: 'Yayoi Takatsuki',
    keywords: ['yayoi', 'takatsuki'],
  },
  6: {
    name: 'Makoto Kikuchi',
    keywords: ['makoto', 'kikuchi'],
  },
  7: {
    name: 'Iori Minase',
    keywords: ['iori', 'minase'],
  },
  8: {
    name: 'Takane Shijou',
    keywords: ['takane', 'shijou'],
  },
  9: {
    name: 'Ritsuko Akizuki',
    keywords: ['ritsuko', 'akizuki'],
  },
  10: {
    name: 'Azusa Miura',
    keywords: ['azusa', 'miura'],
  },
  11: {
    name: 'Ami Futami',
    keywords: ['ami'],
  },
  12: {
    name: 'Mami Futami',
    keywords: ['mami'],
  },
  13: {
    name: 'Hibiki Ganaha',
    keywords: ['hibiki', 'gahana'],
  },
  14: {
    name: 'Mirai Kasuga',
    keywords: ['mirai', 'kasuga'],
  },
  15: {
    name: 'Shizuka Mogami',
    keywords: ['shizuka', 'mogami'],
  },
  16: {
    name: 'Tsubasa Ibuki',
    keywords: ['tsubasa', 'ibuki'],
  },
  17: {
    name: 'Kotoha Tanaka',
    keywords: ['kotoha', 'tanaka'],
  },
  18: {
    name: 'Elena Shimabara',
    keywords: ['elena', 'shimabara'],
  },
  19: {
    name: 'Minako Satake',
    keywords: ['minako', 'satake'],
  },
  20: {
    name: 'Megumi Tokoro',
    keywords: ['megumi', 'tokoro'],
  },
  21: {
    name: 'Matsuri Tokugawa',
    keywords: ['matsuri', 'tokugawa'],
  },
  22: {
    name: 'Serika Hakozaki',
    keywords: ['serika', 'hakozaki'],
  },
  23: {
    name: 'Akane Nonohara',
    keywords: ['akane', 'nonohara'],
  },
  24: {
    name: 'Anna Mochizuki',
    keywords: ['anna', 'mochizuki'],
  },
  25: {
    name: 'Roco',
    keywords: ['roco'],
  },
  26: {
    name: 'Yuriko Nanao',
    keywords: ['yuriko', 'nanao'],
  },
  27: {
    name: 'Sayoko Takayama',
    keywords: ['sayoko', 'tokugawa'],
  },
  28: {
    name: 'Arisa Matsuda',
    keywords: ['arisa', 'matsuda'],
  },
  29: {
    name: 'Umi Kousaka',
    keywords: ['umi', 'kousaka'],
  },
  30: {
    name: 'Iku Nakatani',
    keywords: ['iku', 'nikutani'],
  },
  31: {
    name: 'Tomoka Tenkubashi',
    keywords: ['tomoka', 'tenkubashi'],
  },
  32: {
    name: 'Emily Stewart',
    keywords: ['emily', 'stewart'],
  },
  33: {
    name: 'Shiho Kitazawa',
    keywords: ['shiho', 'kitazawa'],
  },
  34: {
    name: 'Ayumu Maihama',
    keywords: ['ayumu', 'maihama'],
  },
  35: {
    name: 'Hinata Kinoshita',
    keywords: ['hinata', 'kinoshita'],
  },
  36: {
    name: 'Kana Yabuki',
    keywords: ['kana', 'yabuki'],
  },
  37: {
    name: 'Nao Yokoyama',
    keywords: ['nao', 'yokoyama'],
  },
  38: {
    name: 'Chizuru Nikaido',
    keywords: ['chizuru', 'nikaido'],
  },
  39: {
    name: 'Konomi Baba',
    keywords: ['konomi', 'baba'],
  },
  40: {
    name: 'Tamaki Ogami',
    keywords: ['tamaki', 'ogami'],
  },
  41: {
    name: 'Fuka Toyokawa',
    keywords: ['fuka', 'fuuka', 'toyokawa'],
  },
  42: {
    name: 'Miya Miyao',
    keywords: ['miya', 'miyao'],
  },
  43: {
    name: 'Noriko Fukuda',
    keywords: ['noriko', 'fukuda'],
  },
  44: {
    name: 'Mizuki Makabe',
    keywords: ['mizuki', 'makabe'],
  },
  45: {
    name: 'Karen Shinomiya',
    keywords: ['karen', 'shinomiya'],
  },
  46: {
    name: 'Rio Momose',
    keywords: ['rio', 'momose'],
  },
  47: {
    name: 'Subaru Nagayoshi',
    keywords: ['subaru', 'nagayoshi'],
  },
  48: {
    name: 'Reika Kitakami',
    keywords: ['reika', 'kitakami'],
  },
  49: {
    name: 'Momoko Suou',
    keywords: ['momoko', 'suou'],
  },
  50: {
    name: 'Julia',
    keywords: ['julia'],
  },
  51: {
    name: 'Tsumugi Shiraishi',
    keywords: ['tsumugi', 'shiraishi'],
  },
  52: {
    name: 'Kaori Sakuramori',
    keywords: ['kaori', 'sakuramori'],
  },
  201: {
    name: 'Shika',
    keywords: ['shika'],
  },
  202: {
    name: 'Leon',
    keywords: ['leon'],
  },
  204: {
    name: 'Frederica Miyamoto',
    keywords: ['frederica', 'miyamoto'],
  },
  205: {
    name: 'Shiki Ichinose',
    keywords: ['shiki', 'ichinose'],
  },
};

const idolTypes = {
  1: {
    name: 'princess',
    icon: 'https://i.imgur.com/ZwZZnea.png',
    color: '#ffbdd0',
  },
  2: {
    name: 'fairy',
    icon: 'https://i.imgur.com/hQ8UKEf.png',
    color: '#9ac7ff',
  },
  3: {
    name: 'angel',
    icon: 'https://i.imgur.com/1sVQ4Cp.png',
    color: '#ffe25d',
  },
  4: {
    name: 'all',
  },
  5: {
    name: 'extra',
    icon: 'https://i.imgur.com/vjIPio9.png',
    color: '#25b340',
  },
};

const getIdFromName = (name) => {
  const lowerCaseName = name.toLowerCase();
  for (const [key, value] of Object.entries(chars)) {
    if (value.keywords.includes(lowerCaseName)) return key;
  }
};

const getNameFromId = (idolId) => chars[idolId].name;

class IdolType {
  constructor(typeId) {
    this.id = typeId;
  }
  get name() {
    return idolTypes[this.id].name;
  }
  get icon() {
    return idolTypes[this.id].icon;
  }
  get color() {
    return idolTypes[this.id].color;
  }
}

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

module.exports = { getIdFromName, getNameFromId, IdolType, capitalize };
