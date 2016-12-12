/**
 * Copyright (c) 2016 Benny Lach
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
'use strict';

var _ = require('lodash');
var utils = require('../../../utils/utils');
var BaseXform = require('../base-xform');

var PagebreakXform = module.exports = function() {
};

utils.inherits(PagebreakXform, BaseXform, {

  get tag() { return 'brk'; },

  render: function(xmlStream, row) {
    if (row) {
      var attributes = {
        id: row,
        max: 16383,
        man: 1
      };

      if (_.some(attributes, function (value) {
          return value !== undefined;
        })) {
        xmlStream.leafNode(this.tag, attributes);
      }
    }
  },

  parseOpen: function(node) {
    switch(node.name) {
      case this.tag:
        this.model = {
          count: node.attributes.length,
          manualBreakCount: node.attributes.length
        };
        return true;
      default:
        return false;
    }
  },
  parseText: function() {
  },
  parseClose: function() {
    return false;
  }
});
