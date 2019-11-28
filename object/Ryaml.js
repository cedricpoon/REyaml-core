const { count_junk_line } = require('../core/count_junk_line');
const { transform_js } = require('../core/transform_js');
const { patch_yaml } = require('../core/patch_yaml');
const Rjson = require('./Rjson');

class Ryaml {
  constructor(raw) {
    this.raw = raw;
  }

  countJunkLine({ lineNo }) {
    return count_junk_line({ sourceYaml: this.raw, lineNo });
  }

  get json() {
    return new Rjson(transform_js({ yamlString: patch_yaml({ yamlString: this.raw }) }));
  }
}

module.exports = Ryaml;
