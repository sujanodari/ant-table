import { Button, Form, Input } from 'antd';
import isEmpty from 'lodash/isEmpty';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface IProps {
  setProcess: Dispatch<SetStateAction<any[]>>;
  process: any;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}
const Process = ({ setProcess, process, setIsModalVisible }: IProps) => {
  const [newProcess, setNewProcess] = useState('');
  const [processErr, setProcessErr] = useState('');
  const [processSuccess, setProcessSuccess] = useState('');

  const addProcess = () => {
    if (isEmpty(newProcess)) {
      setProcessErr('Process can not be empty.');
    } else {
      setProcess([...process, { key: newProcess, value: newProcess }]);
      setNewProcess('');
      setProcessSuccess('Process Added.')
    }
  };
  return (
    <div style={{ height: '7rem' }}>
      <Form.Item
        style={{ margin: 0, width: '12rem' }}
        rules={[
          {
            required: true,
            message: 'Process is required.',
          },
        ]}
      >
        <Input
          onChange={(e: any) => {
            setNewProcess(e.target.value);
            setProcessErr('');
            setProcessSuccess('');
          }}
          placeholder="Enter Process"
          value={newProcess}
        />
        {processErr ? <div style={{ color: 'red' }}>{processErr}</div> : ''}
     {processSuccess?<div style={{ color: 'green' }}>{processSuccess}</div> :''}
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" onClick={addProcess} style={{ marginTop: '1rem' }}>
          add
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible(false);
            setProcessErr('');
            setProcessSuccess('');
          }}
          style={{ marginLeft: '1rem', marginTop: '1rem' }}
        >
          ok
        </Button>
      </div>
    </div>
  );
};

export default Process;
