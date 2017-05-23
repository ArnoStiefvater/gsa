/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2016 - 2017 Greenbone Networks GmbH
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

import {for_each, is_defined} from '../../utils.js';

import Model from '../model.js';
import {parse_severity} from '../parser.js';

import Nvt from './nvt.js';

export class Result extends Model {

  parseProperties(elem) {
    let ret = super.parseProperties(elem);

    let host = ret.host;

    ret.host = {
      name: host.__text,
      id: host.asset._asset_id,
    };

    ret.nvt = new Nvt(ret.nvt);

    if (is_defined(ret.severity)) {
      ret.severity = parse_severity(ret.severity);
    }

    ret.vulnerability = is_defined(ret.name) ? ret.name : ret.nvt.oid;

    if (is_defined(elem.report)) {
      ret.report = new Model(elem.report);
    }

    if (is_defined(elem.task)) {
      ret.task = new Model(elem.task);
    }

    if (is_defined(elem.detection) && is_defined(elem.detection.result)) {
      let d_result = {
        id: ret.detection.result._id,
      };
      let details = {};

      if (is_defined(ret.detection.result.details)) {
        for_each(ret.detection.result.details.detail, detail => {
          details[detail.name] = detail;
        });
      }

      d_result.details = details;
      ret.detection.result = d_result;
    }

    return ret;
  }
}

export default Result;

// vim: set ts=2 sw=2 tw=80:
