import { format } from "date-fns";
import * as react from "react";
import { Link } from "react-router-dom";
import * as semanticUiReact from "semantic-ui-react";
import { Activity } from "../../../app/Models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {

    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;

    const [target, setTarget] = react.useState('');


    function handleActivityDelete(e: react.SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <semanticUiReact.Segment.Group>
            <semanticUiReact.Segment>
                <semanticUiReact.Item.Group>
                    <semanticUiReact.Item>
                        <semanticUiReact.Item.Image size="tiny" circular src="/assets/user.png" />
                        <semanticUiReact.Item.Content>
                            <semanticUiReact.Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </semanticUiReact.Item.Header>
                            <semanticUiReact.Item.Description>Hosted by Milad</semanticUiReact.Item.Description>
                        </semanticUiReact.Item.Content>
                    </semanticUiReact.Item>
                </semanticUiReact.Item.Group>
            </semanticUiReact.Segment>
            <semanticUiReact.Segment>
                <span>
                    <semanticUiReact.Icon name="clock" /> {format(activity.date!,'dd MMM yyyy h:mm aa')}
                    <semanticUiReact.Icon name="marker" /> {activity.venue}
                </span>
            </semanticUiReact.Segment>
            <semanticUiReact.Segment secondary>
                Attendees go here
            </semanticUiReact.Segment>
            <semanticUiReact.Segment clearing>
                <span>{activity.description}</span>
                <semanticUiReact.Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color="teal"
                    floated="right"
                    content="view"
                />
            </semanticUiReact.Segment>
        </semanticUiReact.Segment.Group>

    )
}