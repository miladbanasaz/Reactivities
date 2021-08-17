import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, FormField, Header, Label, Segment } from "semantic-ui-react";
import LoadingComonent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextIntup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/Models/activity";


export default observer(function ActivityForm() {

    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loadingInitial, loading } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity>({

        id: '',
        category: '',
        city: '',
        date: null,
        description: '',
        title: '',
        venue: ''

    });

    const validationSchema = Yup.object({
        title: Yup.string().required('Activity title is required!'),
        description: Yup.string().required('Activity description is required!'),
        category: Yup.string().required('Activity category is required!'),
        city: Yup.string().required('Activity city is required!'),
        date: Yup.string().required('Activity date is required!').nullable(),
        venue: Yup.string().required('Activity venue is required!'),
    })

    useEffect(() => {

        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }
        else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value })
    // }

    if (loadingInitial) return <LoadingComonent content="Loading activity ..." />
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name='title' placeholder='Title'/>
                        <MyTextArea placeholder="Description" name="description" rows={3}/>
                        <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
                        <MyDateInput placeholderText="Date"
                         name="date" 
                         showTimeSelect
                         timeCaption='time'
                         dateFormat='MMMM d, yyyy h:mm aa' />
                         <Header content='Location Details' sub color='teal'/>
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />
                        <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={loading} floated="right" positive type="Submit" content="Submit" />
                        <Button as={Link} to={`/activities/${activity.id}`} floated="right" type="Button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})