class Version {
  constructor(data) {
    this.version = data.version;
    this.updateTime = new Date(data.updateTime);
  }
}

class AppVersion extends Version {
  constructor(data) {
    super(data);
    this.revision = data.revision;
  }
}

class AssetVersion extends Version {
  constructor(data) {
    super(data);
    this.indexName = data.indexName;
  }
}

module.exports = { AppVersion, AssetVersion };
