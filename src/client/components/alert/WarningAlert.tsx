import * as React from "react";
import Alert from "react-bootstrap/Alert";

export interface WarningProps {
    open_alert: boolean;
    close_func: any;
    show_func: any;
}

const WarningAlert: React.FC<WarningProps> = (props) => {
    return (
        <>
            <Alert
                variant="warning"
                className={"m-0"}
                show={props.open_alert}
                onClose={props.close_func}
                dismissible
            >
                <Alert.Heading>Warning! Image Upload Failed!</Alert.Heading>
                <hr />
                <p>
                    Your url image did not upload, check the information icon for further
                    guidance. You can still submit your blog but the blog will not save
                    the image you have just tried to upload.
                </p>
            </Alert>
        </>
    );
};

export default WarningAlert;
