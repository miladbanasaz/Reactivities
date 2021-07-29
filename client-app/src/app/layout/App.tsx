import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../Models/activity';
import Navbar from './Navbar';
import ActivityDashbord from '../../features/activities/dashbord/ActivityDashbord';
import { v4 as uuid } from "uuid";
import agents from '../api/agent';
import ActivityList from '../../features/activities/dashbord/ActivityList';
import LoadingComonent from './LoadingComponent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agents.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
    window.scrollTo({
      top: 0,
      left: 100,
      behavior: 'smooth'
    });
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handleEditOrCreateActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agents.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
    else {
      activity.id = uuid();
      agents.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agents.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  if (Loading) return <LoadingComonent content="Loading app" />
  return (
    <Fragment>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>

        <ActivityDashbord
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleEditOrCreateActivity}
          deleteActivity={handleDeleteActivity} 
          submitting={submitting}/>

      </Container>


    </Fragment>
  );
}

export default App;
