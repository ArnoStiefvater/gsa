/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2016 - 2018 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import 'core-js/fn/set';
import 'core-js/fn/symbol';

import {is_defined} from '../utils/identity';
import {map} from '../utils/array';
import {pluralizeType} from '../utils/entitytype';

const types = {
  host: 'asset',
  hosts: 'asset',
  os: 'asset',
  cve: 'info',
  cves: 'info',
  cpe: 'info',
  cpes: 'info',
  dfncert: 'info',
  dfncerts: 'info',
  nvt: 'info',
  nvts: 'info',
  ovaldefs: 'info',
  ovaldef: 'info',
  certbund: 'info',
  certbunds: 'info',
  secinfo: 'info',
  secinfos: 'info',
  portlist: 'port_list',
  portlists: 'port_list',
  reportformat: 'report_format',
  reportformats: 'report_format',
  scanconfig: 'config',
  scanconfigs: 'config',
};

const convertType = type => {
  const ctype = types[type];
  if (is_defined(ctype)) {
    return ctype;
  }
  return type;
};

class Capabilities {

  constructor(cap_names) {
    this._has_caps = is_defined(cap_names);

    let caps;

    if (this._has_caps) {
      caps = map(cap_names, name => name.toLowerCase());
    }

    this._capabilities = new Set(caps);
  }

  [Symbol.iterator]() {
    return this._capabilities[Symbol.iterator]();
  }

  get(name) {
    name = name.toLowerCase();
    const capability = this._capabilities.get(name);
    return is_defined(capability) ? capability : {};
  }

  areDefined() {
    return this._has_caps;
  }

  has(name) {
    return this._capabilities.has(name);
  }

  forEach(callback) {
    return this._capabilities.forEach(callback);
  }

  mayAccess(type) {
    return this.mayOp('get_' + pluralizeType(convertType(type)));
  }

  mayOp(value) {
    return this.has(value.toLowerCase()) || this.has('everything');
  }

  mayClone(type) {
    return this.mayOp('create_' + convertType(type));
  }

  mayEdit(type) {
    return this.mayOp('modify_' + convertType(type));
  }

  mayDelete(type) {
    return this.mayOp('delete_' + convertType(type));
  }

  mayCreate(type) {
    return this.mayOp('create_' + convertType(type));
  }

  get length() {
    return this._capabilities.size;
  }
}

export default Capabilities;

// vim: set ts=2 sw=2 tw=80:
