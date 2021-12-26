import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from '../config/routes';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute';
import NotFound from '../components/NotFound';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <UnauthenticatedRoute path={routes.dashboard.path} component={routes.dashboard.component} exact />
        <UnauthenticatedRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
