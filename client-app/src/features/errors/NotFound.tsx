import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                oops - we've looked everywhere and could not fine this!!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    return to activity list
                </Button>
            </Segment.Inline>
        </Segment>
            )
}