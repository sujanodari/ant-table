import React, { useState } from 'react';
import { Select } from 'antd';

type Option = {
  key: 'string';
  value: 'string';
};
interface IProps {
  tags: string;
  record: any;
  handleUpdate: (row: any) => void;
  options: Option[];
}

const SelectBox = (props: IProps) => {
  const { Option } = Select;
  const { tags, handleUpdate, options } = props;
  const [select, setSelect] = useState(tags || 'select');

  const handleChange = (data:string) => {
    handleUpdate(data);
    setSelect(data);
  };
  return (
    <Select defaultValue={select} onChange={handleChange}>
      {options?.map((option: Option, index:number) => (
        <Option key={index} value={option.key}>{option.value}</Option>
      ))}
    </Select>
  );
};

export default SelectBox;
