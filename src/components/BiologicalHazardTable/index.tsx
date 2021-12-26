import React, { useState } from 'react';
import { Button } from 'antd';
import { BiologicalHazardTableItem } from '../../interfaces/IEditableTable';
import { PlusOutlined, PlusSquareOutlined, DeleteFilled } from '@ant-design/icons';
import DataTable from './Table';
import CheckBox from '../CheckBox';
import SelectBox from '../Select';
import Modal from '../Modal';
import { CheckCircleTwoTone } from '@ant-design/icons';
import Analyze from './Analyze';
import Process from './Process';

type IProps = {
  setData: React.Dispatch<React.SetStateAction<BiologicalHazardTableItem[]>>;
  data: any;
  setProcess: React.Dispatch<React.SetStateAction<any[]>>;
  process: any;
};

const BiologicalHazardTable = (props: IProps) => {
  const { data, setData, process, setProcess } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcess, setIsProcess] = useState(false);

  if (!data) {
    return null;
  }
  const columns = [
    {
      title: 'INGREDIENT NAME',
      dataIndex: 'IngredientName',
      width: '10rem',
      render: (tags: any, record: any, index: number) => (isMatchedIngredient(index, record) ? '' : tags),
    },
    {
      title: 'CATEGORY',
      dataIndex: 'CategoryTitle',
      width: '10rem',
      render: (tags: any, record: any, index: number) => (isMatchedCategory(index, record) ? '' : tags),
    },
    {
      title: 'SUB CATEGORY',
      dataIndex: 'RecipeSubCategoryTitle',
      width: '10rem',
      render: (tags: any, record: any, index: number) => (isMatchedSubCategory(index, record) ? '' : tags),
    },
    {
      title: 'BIOLOGICAL HAZARD',
      dataIndex: 'BiologicalHazardTitle',
      width: '10rem',
      render: (tags: any, record: any, index: number) =>
        isMatchedBiologicalHazardTitle(index, record) ? (
          ''
        ) : (
          <a href="/#">
            <u>{tags}</u>
          </a>
        ),
    },
    {
      title: 'HAZARD ADDRESSED BY SUPPLIER',
      dataIndex: 'Status',
      width: '10rem',
      render: (tags: any, record: any) => {
        return (
          <div style={{ margin: 'auto' }}>
            <CheckBox
              tags={tags}
              record={record}
              handleUpdate={(Status: boolean) => handleUpdate({ ...record, Status: Status })}
            />
          </div>
        );
      },
    },
    {
      title: 'PROCESS',
      dataIndex: 'BiologicalHazardId',
      width: '10rem',
      render: (tags: any, record: any, index: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PlusOutlined
              onClick={() => handleAdd(tags, index)}
              style={{ color: 'rgb(6, 121, 81)', cursor: 'pointer' }}
            />
            &nbsp;
            {isMatchedBiologicalHazardTitle(index, record) ? (
              <DeleteFilled onClick={() => handleDelete(tags)} style={{ color: 'red', cursor: 'pointer' }} />
            ) : (
              ''
            )}
          </div>
          &nbsp;
          <div>
            <div style={{ display: 'flex', alignItems: 'center', height: '2rem' }}>
              <span>Process</span> &nbsp;
              <PlusSquareOutlined
                style={{ color: 'rgb(6, 121, 81)', cursor: 'pointer' }}
                onClick={() => {
                  setIsProcess(true);
                  setIsModalVisible(true);
                }}
              />
            </div>
            <SelectBox
              tags={record?.process}
              record={record}
              handleUpdate={(process: string) => handleUpdate({ ...record, process: process })}
              options={process as any}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'MIN UNIT',
      dataIndex: 'minUnit',
      width: '9rem',
      editable: true,
      inputType: 'number',
      endAdornment: <>&#8457;</>,
      rules: { message: 'Please enter value between 160 to 180' },
      min: 160,
      max: 180,
    },
    {
      title: 'MAX UNITS',
      dataIndex: 'maxUnit',
      width: '9rem',
      editable: true,
      inputType: 'number',
      rules: { message: 'Please enter value between 160 to 180' },
      min: 160,
      max: 180,
      endAdornment: <>&#8457;</>,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      width: '9rem',
      editable: true,
      inputType: 'number',
    },
    {
      title: 'INTERVAL',
      dataIndex: 'interval',
      width: '9rem',
      render: (tags: any, record: any) => (
        <SelectBox
          tags={tags}
          record={record}
          handleUpdate={(interval: string) => handleUpdate({ ...record, interval: interval })}
          options={
            [
              { key: 'second', value: 'second' },
              { key: 'minute', value: 'minute' },
              { key: 'hour', value: 'hour' },
            ] as any
          }
        />
      ),
    },
    {
      title: 'ANALYZE',
      dataIndex: 'BiologicalHazardId',
      width: '7rem',
      fixed: 'right',
      render: (tags: any, records: any) => (
        <Analyze setIsProcess={setIsProcess} setIsModalVisible={setIsModalVisible} records={records} />
      ),
    },
  ];

  const isMatchedIngredient = (index: number, record: any) => {
    return data?.[index - 1]?.IngredientId === record?.IngredientId;
  };

  const isMatchedCategory = (index: number, record: any) => {
    return data?.[index - 1]?.RecipeCategoryId === record?.RecipeCategoryId;
  };

  const isMatchedSubCategory = (index: number, record: any) => {
    return data?.[index - 1]?.RecipeSubCategoryId === record?.RecipeSubCategoryId;
  };
  const isMatchedBiologicalHazardTitle = (index: number, record: any) => {
    return data?.[index - 1]?.BiologicalHazardTitle === record?.BiologicalHazardTitle;
  };

  const handleDelete = (key: React.Key) => {
    setData(data?.filter((item: any) => item.BiologicalHazardId !== key));
  };

  const handleExist = (BiologicalHazardId: number) => {
    return data.some((item: any) => item?.BiologicalHazardId === BiologicalHazardId);
  };

  const handleAdd = (BiologicalHazardId: number, index: number) => {
    let id = BiologicalHazardId + data?.length + 1;
    while (handleExist(id)) {
      id = id + 1;
    }
    const newItem: BiologicalHazardTableItem = {
      ...data.filter((data: BiologicalHazardTableItem) => data?.BiologicalHazardId === BiologicalHazardId)?.[0],
      BiologicalHazardId: id,
    };

    const dataIndex = data.findIndex(
      (data: BiologicalHazardTableItem) => data?.BiologicalHazardId === BiologicalHazardId
    );
    const newData = [...data];
    newData.splice(dataIndex + 1, 0, newItem);
    setData([...newData]);
  };

  const handleUpdate = (row: BiologicalHazardTableItem) => {
    const index = data.findIndex(
      (item: BiologicalHazardTableItem) => row.BiologicalHazardId === item.BiologicalHazardId
    );
    const item = data[index];
    const newData = [...data];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData([...newData]);
  };

  return (
    <>
      <DataTable setData={setData} data={data} columns={columns} handleUpdate={handleUpdate} />;
      <Modal setIsModalVisible={setIsModalVisible} showModal={isModalVisible}>
        {isProcess ? (
          <Process setProcess={setProcess} process={process} setIsModalVisible={setIsModalVisible} />
        ) : (
          <div style={{ height: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '1rem' }}>
              <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp; &nbsp; <span>Pathogens controlled</span>
            </div>
            <Button
              type="primary"
              onClick={() => setIsModalVisible(false)}
              style={{ float: 'right', marginTop: '1rem' }}
            >
              ok
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BiologicalHazardTable;
