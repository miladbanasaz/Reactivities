import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";


export default function Navbar() {

    const {activityStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={() => activityStore.open()}/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}