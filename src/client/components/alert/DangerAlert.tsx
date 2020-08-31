import * as React from "react";
import Alert from "react-bootstrap/Alert";


export interface DangerProps {
    open_alert: boolean;
    close_func: any;
    show_func: any;
}

const DangerAlert: React.FC<DangerProps> = (props) => {
    return (
        <>
            <Alert
                variant="warning"
                className={"m-0"}
                show={props.open_alert}
                onClose={props.close_func}
                dismissible
            >
                <Alert.Heading>Request Failed!</Alert.Heading>
                <hr />
                <p>
                    Sorry, we can not process your request at this time, please try again later!
                </p>
            </Alert>
        </>
    );
};

export default DangerAlert;
