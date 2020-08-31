import * as React from "react";
import Alert from "react-bootstrap/Alert";

export interface SuccessProps {
    open_alert: boolean;
    close_func: any;
    show_func: any;
    heading: string;
    body: string;
}

const WarningAlert: React.FC<SuccessProps> = (props) => {
    return (
        <>
            <Alert
                variant="success"
                className={"m-0"}
                show={props.open_alert}
                onClose={props.close_func}
                dismissible
            >
                <Alert.Heading>{props.heading}</Alert.Heading>
                <hr />
                <p>{props.body}</p>
            </Alert>
        </>
    );
};

export default WarningAlert;
