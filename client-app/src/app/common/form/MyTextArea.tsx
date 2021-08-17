import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";
import internal from "stream";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
    type? : string;
}

export default function MyTextArea(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>
                {props.label}
            </label>
            <textarea {...field} {...props} rows={props.rows}/>
            {meta.touched && meta.error ? (
                <Label basic color="red" >{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}