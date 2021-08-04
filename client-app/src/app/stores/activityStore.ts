import { makeAutoObservable, runInAction } from "mobx"
import agents from "../api/agent";
import { Activity } from "../Models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    //activities: Activity[] = [];
    activityRegistry = new Map<string,Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activityByDate(){
        return Array.from(this.activityRegistry.values())
        .sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }


    loadingActivities = async () => {
        try {
            const activities = await agents.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    //this.activities.push(activity);
                    this.activityRegistry.set(activity.id,activity);
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
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(a => a.id === id);
        this.selectedActivity = this.activityRegistry.get(id);

        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'smooth'
        });
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    open = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    close = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agents.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id,activity);
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
                this.activityRegistry.set(activity.id,activity);
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
                    if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
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


