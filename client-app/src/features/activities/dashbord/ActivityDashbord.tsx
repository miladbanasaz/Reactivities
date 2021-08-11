import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComonent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilter from "./ActivityFilter";
import ActivityList from "./ActivityList";


export default observer(function ActivityDashbord() {
    const { activityStore } = useStore();
    const {loadingActivities, activityRegistry} = activityStore;

    useEffect(() => {
       if(activityRegistry.size <= 1) loadingActivities();
    }, [activityRegistry.size,loadingActivities])

    if (activityStore.loadingInitial) return <LoadingComonent content="Loading app" />
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />


            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilter/>
            </Grid.Column>

        </Grid>
    )
})