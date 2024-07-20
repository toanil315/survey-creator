import { BrowserRouter } from 'react-router-dom';
import {
  Accordion,
  Button,
  Checkbox,
  DatePicker,
  Input,
  ProviderTree,
  Select,
  Table,
  TableColumn,
  Textarea,
  Toaster,
  openToast,
} from './components';
import { createProviderConfig } from './components/ProviderTree/ProviderTree';
import { FluentProvider, createTableColumn } from '@fluentui/react-components';
import { lightTheme } from './styles/theme';
import { useState } from 'react';
import { OverflowMenu } from './components/Commons/OverflowMenu';
import { useTable } from './hooks';
import { DEFAULT_LIMIT, SORT_ORDER_ENUM } from './constants';

const App = () => {
  // Please define your providers and their configurations here
  // note that the order of the providers is important
  // the first provider will be the outermost provider
  const providersAndConfigs = [
    createProviderConfig(FluentProvider, { theme: lightTheme }),
    createProviderConfig(BrowserRouter),
  ];

  return (
    <ProviderTree providers={providersAndConfigs}>
      <AppContainer />
    </ProviderTree>
  );
};

interface Item {
  id: string;
  name: string;
  age: number;
  address: string;
}

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

const AppContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);

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
    <div
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        gap: 20,
        padding: 20,
      }}
    >
      <div
        style={{
          width: 500,
        }}
      >
        <Accordion
          items={[
            {
              key: '1',
              title: 'Accordion 1',
              container: <div>Accordion 1 content</div>,
              helperText: <p>helper text for accordion 1</p>,
            },
            { key: '2', title: 'Accordion 2', container: <div>Accordion 2 content</div> },
            { key: '3', title: 'Accordion 3', container: <div>Accordion 3 content</div> },
          ]}
        />
      </div>
      <div style={{ width: 300, display: 'flex', gap: 10 }}>
        <Button
          onClick={(e) => console.log('onClick', e)}
          appearance='primary'
        >
          Button
        </Button>
        <Button
          loading={true}
          onClick={(e) => console.log('onClick loading', e)}
          appearance='primary'
        >
          Button
        </Button>
      </div>
      <div style={{ width: 300, display: 'flex', gap: 10 }}>
        <Checkbox size='small' />
        <Checkbox size='medium' />
        <Checkbox size='large' />
        <Checkbox.Group
          items={[
            { label: 'Checkbox 1', value: '1' },
            { label: 'Checkbox 2', value: '2' },
            { label: 'Checkbox 3', value: '3' },
          ]}
          direction='column'
          onChange={(value) => console.log('onChange', value)}
          label='Checkbox Group'
          required
        />
      </div>
      <div style={{ width: 300 }}>
        <DatePicker
          label='Date Picker'
          onChange={(value) => console.log(value)}
        />
      </div>
      <div style={{ width: 300 }}>
        <Input
          value={inputValue}
          label='Input'
          onChange={(value) => {
            setInputValue(value);
          }}
        />
      </div>
      <div style={{ width: 300 }}>
        <Textarea
          value={textareaValue}
          label='Textarea'
          onChange={(value) => {
            setTextareaValue(value);
          }}
        />
      </div>
      <div>
        <OverflowMenu
          items={[
            {
              label: 'Profile',
              key: '1',
            },
            {
              label: 'Setting',
              key: '2',
            },
            {
              label: 'Logout',
              key: '4',
            },
          ]}
        >
          <Button>Click Me</Button>
        </OverflowMenu>
      </div>
      <div style={{ width: 300 }}>
        <Select
          label='Select'
          required
          placeholder='Select something...'
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ]}
          value={selectValue}
          onChange={(value) => setSelectValue(value)}
        />
      </div>
      <div>
        <Toaster />
        <Button
          onClick={() =>
            openToast({
              props: {
                title: 'Toast title',
                body: 'Toast body',
                actions: <Button>Click me</Button>,
                dismissable: true,
              },
              timeout: 1000,
              position: 'top-end',
              intent: 'success',
            })
          }
        >
          Make toast
        </Button>
      </div>
      <div style={{ width: 500 }}>
        <Table
          tableInstance={tableInstance}
          dataSource={dataSource}
          columns={columns}
          totalElements={dataSource.length || 0}
        />
      </div>
    </div>
  );
};

export default App;
