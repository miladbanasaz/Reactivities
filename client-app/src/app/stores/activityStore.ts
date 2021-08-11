import { makeAutoObservable, runInAction } from "mobx"
import agents from "../api/agent";
import { Activity } from "../Models/activity";


export default class ActivityStore {
    //activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activityByDate() {
        return Array.from(this.activityRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    get groupedActivity() {
        return Object.entries(
            this.activityByDate.reduce((activities,activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date],activity] : [activity];
                return activities;
            }, {} as {[key : string]: Activity[]})
        )
    }

    loadingActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agents.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                });
                this.setLoadingInitial(false);
            })


        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;

            try {
                activity = await agents.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {

                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agents.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });

        }

    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agents.Activities.update(activity);
            runInAction(() => {
                // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }

    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agents.Activities.delete(id);
            runInAction(() => {
                //this.activities= [...this.activities.filter(x => x.id !== id)];
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            });
        }
    }

}


