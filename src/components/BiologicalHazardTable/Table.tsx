import { Table } from 'antd';
import { BiologicalHazardTableItem } from '../../interfaces/IEditableTable';
import EditableCell from './EditableCell';
import EditableRow from './EditableRow';

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type IProps = {
  setData: React.Dispatch<React.SetStateAction<BiologicalHazardTableItem[]>>;
  data: any;
  columns: any;
  handleUpdate:(row:any)=>void;
};

const DataTable = (props: IProps) => {
  const { columns,handleUpdate } = props;

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const TableColumns = columns.map((col: any) => {
    // eslint-disable-next-line
    if (!col.editable) {
      return col;
    } 
    return {
      ...col,
      onCell: (record: BiologicalHazardTableItem) => ({
        record,
        editable: col?.editable,
        dataIndex: col.dataIndex,
        endAdornment: col?.endAdornment,
        title: col.title,
        inputType:col?.inputType,
        rules:col?.rules,
        min:col?.min,
        max:col?.max,
        handleSave: handleUpdate,
      }),
    };
  });

  return (
    <Table
      scroll={{ x: 1300 }}
      components={components}
      rowClassName={() => 'editable-row'}
      dataSource={props?.data}
      columns={TableColumns as ColumnTypes}
      pagination={false}
    />
  );
};

export default DataTable;
