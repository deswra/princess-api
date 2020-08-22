const fetch = require('node-fetch');

const { AppVersion, AssetVersion } = require('./version');

const HOST = 'https://api.matsurihi.me/mltd/v1/';

class Princess {
  constructor(server = 'ja', prettyPrint = false, host = HOST) {
    this.server = server;
    this.prettyPrint = prettyPrint;
    this.host = host;
  }

  getVersion = async (type, version) => {
    const response = await this.query(`/version/${type ? type : 'latest'}${version ? `/${version}` : ''}`);
    switch (type) {
      case 'apps':
        if (version) return new AppVersion(response);
        return response.map((item) => new AppVersion(item));
      case 'assets':
        if (version) return new AssetVersion(response);
        return response.map((item) => new AssetVersion(item));
      default:
        return {
          app: new AppVersion(response.app),
          res: new AssetVersion(response.res),
        };
    }
  };

  query = (path) =>
    fetch(`${this.host}${this.server}${path}?prettyPrint=${this.prettyPrint}`).then((res) => res.json());
}

module.exports = Princess;
