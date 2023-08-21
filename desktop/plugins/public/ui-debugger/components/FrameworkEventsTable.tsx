/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {PartitionOutlined} from '@ant-design/icons';
import {
  DataTable,
  DataTableColumn,
  DataTableManager,
  Layout,
  usePlugin,
} from 'flipper-plugin';
import React, {useEffect, useRef} from 'react';
import {FrameworkEvent, Id} from '../ClientTypes';
import {plugin} from '../index';
import {Button, Tooltip} from 'antd';

export function FrameworkEventsTable({treeId}: {treeId?: Id}) {
  const instance = usePlugin(plugin);

  const managerRef = useRef<DataTableManager<FrameworkEvent> | null>(null);

  useEffect(() => {
    if (treeId != null) {
      managerRef.current?.resetFilters();
      managerRef.current?.addColumnFilter('treeId', treeId as string);
    }
  }, [treeId]);

  return (
    <Layout.Container grow>
      <DataTable<FrameworkEvent>
        dataSource={instance.frameworkEvents}
        tableManagerRef={managerRef}
        columns={columns}
        extraActions={
          <Tooltip title="Back to tree">
            <Button
              onClick={() => {
                instance.uiActions.onSetViewMode({mode: 'default'});
              }}
              icon={<PartitionOutlined />}></Button>
          </Tooltip>
        }
      />
    </Layout.Container>
  );
}

const columns: DataTableColumn<FrameworkEvent>[] = [
  {
    key: 'timestamp',
    onRender: (row: FrameworkEvent) => {
      return new Date(row.timestamp).toLocaleTimeString();
    },
  },
  {
    key: 'treeId',
  },
  {
    key: 'nodeId',
  },
  {
    key: 'type',
  },
  {
    key: 'thread',
  },
];
