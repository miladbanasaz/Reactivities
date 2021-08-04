import { Fragment, useEffect} from 'react';
import {  Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashbord from '../../features/activities/dashbord/ActivityDashbord';
import LoadingComonent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
     activityStore.loadingActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComonent content="Loading app" />
  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashbord/>

      </Container>


    </Fragment>
  );
}

export default observer(App);
