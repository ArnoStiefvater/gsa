/* Copyright (C) 2017-2019 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
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
import React from 'react';

import _ from 'gmp/locale';

import {HOSTS_FILTER_FILTER} from 'gmp/models/filter';

import IconDivider from 'web/components/layout/icondivider';

import PropTypes from 'web/utils/proptypes';
import withCapabilities from 'web/utils/withCapabilities';

import EntitiesPage from 'web/entities/page';
import withEntitiesContainer from 'web/entities/withEntitiesContainer';

import {goto_details} from 'web/entity/component';

import DashboardControls from 'web/components/dashboard/controls';

import ManualIcon from 'web/components/icon/manualicon';
import NewIcon from 'web/components/icon/newicon';

import {
  loadEntities,
  selector as entitiesSelector,
} from 'web/store/entities/hosts';

import HostsFilterDialog from './filterdialog';
import HostsTable from './table';
import HostComponent from './component';

import HostsDashboard, {HOSTS_DASHBOARD_ID} from './dashboard';

const ToolBarIcons = withCapabilities(({
  capabilities,
  onHostCreateClick,
}) => (
  <IconDivider>
    <ManualIcon
      page="vulnerabilitymanagement"
      anchor="hosts-view"
      title={_('Help: Hosts')}
    />
    {capabilities.mayCreate('host') &&
      <NewIcon
        title={_('New Host')}
        onClick={onHostCreateClick}
      />
    }
  </IconDivider>
));

ToolBarIcons.propTypes = {
  capabilities: PropTypes.capabilities.isRequired,
  onHostCreateClick: PropTypes.func.isRequired,
};

const Page = ({
  filter,
  onChanged,
  onDownloaded,
  onError,
  onFilterChanged,
  onInteraction,
  ...props
}) => (
  <HostComponent
    onTargetCreated={goto_details('target', props)}
    onTargetCreateError={onError}
    onCreated={onChanged}
    onDeleted={onChanged}
    onDownloaded={onDownloaded}
    onDownloadError={onError}
    onInteraction={onInteraction}
    onSaved={onChanged}
  >
    {({
      create,
      createtargetfromselection,
      createtargetfromhost,
      delete: delete_func,
      download,
      edit,
    }) => (
      <EntitiesPage
        {...props}
        dashboard={() => (
          <HostsDashboard
            filter={filter}
            onFilterChanged={onFilterChanged}
            onInteraction={onInteraction}
          />
        )}
        dashboardControls={() => (
          <DashboardControls
            dashboardId={HOSTS_DASHBOARD_ID}
            onInteraction={onInteraction}
          />
        )}
        filter={filter}
        filterEditDialog={HostsFilterDialog}
        filtersFilter={HOSTS_FILTER_FILTER}
        sectionIcon="host.svg"
        table={HostsTable}
        title={_('Hosts')}
        toolBarIcons={ToolBarIcons}
        onError={onError}
        onHostCreateClick={create}
        onHostDeleteClick={delete_func}
        onHostDownloadClick={download}
        onHostEditClick={edit}
        onInteraction={onInteraction}
        onFilterChanged={onFilterChanged}
        onTargetCreateFromSelection={createtargetfromselection}
        onTargetCreateFromHostClick={createtargetfromhost}
      />
    )}
  </HostComponent>
);

Page.propTypes = {
  filter: PropTypes.filter,
  onChanged: PropTypes.func.isRequired,
  onDownloaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onFilterChanged: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
};

export default withEntitiesContainer('host', {
  entitiesSelector,
  loadEntities,
})(Page);

// vim: set ts=2 sw=2 tw=80:
