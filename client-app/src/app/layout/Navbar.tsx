import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";


export default function Navbar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name='Activities' />
                <Menu.Item as={NavLink} to="/TestErrors" name='Test Errors' />
                <Menu.Item>
                    <Button positive content="Create Activity" as={NavLink} to="/createActivity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}