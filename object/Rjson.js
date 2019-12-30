const { insert } = require('../func/insert');
const { transform_d3 } = require('../func/transform_d3');
const { mark_line } = require('../func/mark_line');
const { count_key } = require('../func/count_key');
const { truncate } = require('../func/truncate');
const traverse = require('../utils/traverse');
const modify = require('../utils/modify');

class Rjson {
/**
 * Constructor.
 * @param {object} raw JSON Object.
 */
  constructor(raw = {}) {
    this.raw = raw;
  }
/**
 * Insert "insertee" inside every "key" in object hierarchy.
 * @param {key} key Key of keypair in object.
 * @param {object} insertee JSON object to be inserted.
 * @returns {object} Immutable Rjson.
 */
  insert({ key, insertee }) {
    return new Rjson(insert({ key, jsSource: this.raw, jsNew: insertee.raw }))
  }
/**
 * Transform raw object on active YAML line to target marked form.
 * @param {int} lineNo Active YAML line number for indicating which object in raw object hierarchy to be transformed.
 * @returns {object} Immutable Rjson.
 */
  markLine({ lineNo }) {
    return new Rjson(mark_line({ sourceObj: this.raw, lineNo }))
  }
/**
 * Truncate raw object hierarchy pivoted to object with lineNo, vertically by level, horizontally by siblingSize.
 * @param {int} level Trim N level upwards N level downwards.
 * @param {int} siblingSize Trim N left siblings N right siblings.
 * @param {int} lineNo Pivot to lineNo for trimming.
 * @returns {object} Immutable Rjson.
 */
  truncate({ level, siblingSize, lineNo }) {
    return new Rjson(truncate({ sourceObj: this.raw, lineNo, level, siblingSize }));
  }
/**
 * Traverse raw object.
 * @param {function} ({ traverser }) => traverser.toXXX().then() Actual traverse using traverse() with clone of raw object.
 * @returns {object} Immutable Rjson.
 */
  traverse(t) {
    return new Rjson(t({ traverser: traverse(JSON.parse(JSON.stringify(this.raw))) }).self);
  }
/**
 * Modify raw object.
 * @param {function} ({ modifier }) => modifier.xxx().yyy() Modify using modify() with clone of raw object.
 * @returns {object} Immutable Rjson.
 */
  modify(m) {
    return new Rjson(m({ modifier: modify(JSON.parse(JSON.stringify(this.raw))) }).self);
  }
/**
 * Convert to D3 structured object.
 * @returns {object} JSON object in D3 structure.
 */
  toD3() {
    return transform_d3({ sourceObj: this.raw });
  }
/**
 * Count number of keys in raw object.
 * @returns {int} Number of keys in raw object.
 */
  get keyCount() { return count_key({ sourceObj: this.raw }); }
}

module.exports = Rjson;
