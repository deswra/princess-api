class Version {
  constructor(data, api) {
    this.version = data.version;
    this.updateTime = new Date(data.updateTime);
    this.api = api;
  }
}

class AppVersion extends Version {
  constructor(data, api) {
    super(data, api);
    this.revision = data.revision;
  }
}

class AssetVersion extends Version {
  constructor(data, api) {
    super(data, api);
    this.indexName = data.indexName;
  }
}

module.exports = { AppVersion, AssetVersion };
