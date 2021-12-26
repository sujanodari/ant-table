import React, {useState, useEffect, useRef } from 'react';
import { Input, Form } from 'antd';
import { BiologicalHazardTableItem } from '../../interfaces/IEditableTable';
import { isEmpty } from 'lodash';

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof BiologicalHazardTableItem;
  record: BiologicalHazardTableItem;
  endAdornment?: any;
  inputType?: string;
  rules: any;
  min: number;
  max: number;
  handleSave: (record: BiologicalHazardTableItem) => void;
}

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  endAdornment,
  handleSave,
  inputType = 'text',
  rules = {},
  min,
  max,
  ...restProps
}: EditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const [err, setErr] = useState('');
  const [value, setValue] = useState(record?.[dataIndex]);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const validateMinMax = () => {
    return Number(value) >= min && Number(value) <= max;
  };

  const save = () => {
    if (min && max) {
      if (validateMinMax()) {
        toggleEdit();
        let values: any = {};
        values[dataIndex] = value;
        handleSave({ ...record, ...values });
      } else {
        setErr(rules?.message);
      }
    } else {
      if (!isEmpty(value)) {
        toggleEdit();
        let values: any = {};
        values[dataIndex] = value;
        handleSave({ ...record, ...values });
      } else {
        setErr(`${dataIndex} is required`);
      }
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0, cursor: 'pointer', width: '5rem' }} >
        <Input
          onChange={(e) => {
            setValue(e.target.value);
            setErr('');
          }}
          value={value as any}
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          type={inputType}
        />
        {err ? <div style={{ color: 'red' }}>{err}</div> : ''}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ width: '5rem', paddingRight: 24 }} onClick={toggleEdit}>
        <Input value={record[dataIndex] as any} />
      </div>
    );
  }
  return (
    <td {...restProps}>
      <div style={{ display: 'flex' }}>
        {childNode} { value && endAdornment}
      </div>
    </td>
  );
};

export default EditableCell;
