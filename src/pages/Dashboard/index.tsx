import React, { useState } from 'react';
import BiologicalHazardTable from '../../components/BiologicalHazardTable';
import Data from './data.json';
interface IProps {}

const Dashboard = (props: IProps) => {

  const NewData:any = Data.map((object: any) => {
      // eslint-disable-next-line
    return {
      ...object,
      process:object?.process || '',
      minUnit: object?.minUnit || '',
      maxUnit: object?.maxUnit || '',
      duration: object?.duration || '',
      interval: object?.interval || "second",
    };
  });

  const [data,setData] = useState<any>(NewData);
  const [process,setProcess] = useState<any>([]);
  return (
    <>
       <BiologicalHazardTable  setData={setData} data={data} process={process} setProcess={setProcess}/>
    </>
  );
};

export default Dashboard;
