import React, { Dispatch, SetStateAction } from 'react';
import { Button } from 'antd';
import isEmpty  from 'lodash/isEmpty';


interface IProps {
  setIsProcess: Dispatch<SetStateAction<boolean>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  records:any;
}
const Analyze = ({ setIsProcess, setIsModalVisible,records }: IProps) => {
    const disabled = isEmpty(records?.process)||isEmpty(records?.minUnit)||isEmpty(records?.maxUnit)||isEmpty(records?.duration) || isEmpty(records?.interval);
  return (
    <Button
      disabled={disabled}
      type="primary"
      onClick={() => {
        setIsProcess(false);
        setIsModalVisible(true);
      }}
    >
      Analyze
    </Button>
  );
};

export default Analyze;
