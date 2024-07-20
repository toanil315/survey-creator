import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '.';
import { DEFAULT_LIMIT, SORT_ORDER_ENUM } from '@/constants';
import { useTable } from '@/hooks';
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';
import { TableColumn } from './types';
import { createTableColumn } from '@fluentui/react-components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: `    
            Data table component
            when init the table, you need to pass the tableInstance returned from useTable hook.
            this instance contains table state like sort, filter, pagination, 
            these table's state will be updated automatically when you interact with the table,
            so you can use this to fetch data from server side.
            NOTE: table's state will be stored in URL query params, 
            this approach is used to achieve following goals:
            + make the table's state bookmarkable
            + end user can share link with table's state to others
            + when user refresh the page, the table state will be restored
            NOTE: this table is based on antd table, so when attach this with data source,
            with each item, you need to pass key property. This prop used to indentify each row in the table by default antd table.
            If you want to use another property, you can pass rowKey prop to the table component.
        `,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Table>;

interface Item {
  id: string;
  name: string;
  age: number;
  address: string;
}

export const Primary: Story = {
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({}),
  },
  render: () => {
    const dataSource: Item[] = [
      {
        id: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        id: '2',
        name: 'John',
        age: 42,
        address: '11 Downing Street',
      },
    ];

    const columns: TableColumn<Item>[] = [
      {
        title: 'Name',
        definition: createTableColumn<Item>({
          columnId: 'name',
          compare: (a, b) => {
            return a.name.localeCompare(b.name);
          },
        }),
        render: (item) => item.name,
      },
      {
        title: 'Age',
        definition: createTableColumn<Item>({
          columnId: 'age',
          compare: (a, b) => {
            return a.age - b.age;
          },
        }),
        render: (item) => item.age,
      },
      {
        title: 'Address',
        definition: createTableColumn<Item>({
          columnId: 'address',
          compare: (a, b) => {
            return a.address.localeCompare(b.address);
          },
        }),
        render: (item) => item.address,
      },
    ];

    const tableInstance = useTable({
      pagination: {
        page: 1,
        limit: DEFAULT_LIMIT,
      },
      sort: {
        field: 'name',
        order: SORT_ORDER_ENUM.ASC,
      },
    });

    console.log('====tableInstance', tableInstance);

    return (
      <div style={{ width: 500 }}>
        <Table
          tableInstance={tableInstance}
          dataSource={dataSource}
          columns={columns}
          totalElements={dataSource.length || 0}
        />
      </div>
    );
  },
};
