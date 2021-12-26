import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'antd/lib/modal/Modal';


interface IProps {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  showModal: boolean;
}
const CustomModal = ({ setIsModalVisible, showModal, children }: IProps) => {
  return (
    <Modal
      visible={showModal}
      footer={null}
      closable={false}
      closeIcon={false}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
