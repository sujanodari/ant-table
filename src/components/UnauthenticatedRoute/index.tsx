import Layout from 'antd/lib/layout/layout';
import React, { Suspense } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import styles from "./styles.module.scss";
interface IProps extends RouteProps {}
const AuthenticatedRoute = (props: IProps) => {

  return (
    <Layout  className={styles["container"]}>
    <Suspense fallback={<>Loading...</>}>
      <Route {...props} />
    </Suspense>
    </Layout>
  );
};

export default AuthenticatedRoute;
