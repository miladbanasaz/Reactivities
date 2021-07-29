import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { boolean, string } from "yargs";

interface Props {
    inverted?: boolean;
    content?: string;

}

export default function LoadingComonent({ inverted = true, content = "Loading ... " }: Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}