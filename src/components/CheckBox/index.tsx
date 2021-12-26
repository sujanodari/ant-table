import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useState } from 'react';

interface IProps{
    tags:boolean;
    record:any;
    handleUpdate:(row:any)=>void;
}

const CheckBox = (props: IProps) => {
  const { tags, handleUpdate } = props;
  const [status, setStatus] = useState(tags);

  const handleChange = (e:any)=>{
    handleUpdate(e?.target?.checked);
    setStatus(e?.target?.checked);
  }
  return (
    <Checkbox
      checked={status}
      onChange={handleChange}
    ></Checkbox>
  );
};

export default CheckBox;
