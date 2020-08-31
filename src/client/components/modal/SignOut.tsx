import * as React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {RouteComponentProps} from "react-router-dom";

export interface ModalProps extends RouteComponentProps<any> {
    open_mod: boolean;
    close_func: any;
    show_func: any;
}

const SignOut: React.FC<ModalProps> = (props) => {
    let complete = () =>
        props.history.push({
            pathname: "/",
            state: {
                heading: "Sorry to See You Go!",
                body: "You have successfully logged out!",
                pushed: true,
            },
        });

    return (
        <>
            <Modal
                id={"modalConfirmation"}
                className={"text-center"}
                show={props.open_mod}
                onHide={props.close_func}
            >
                <Modal.Header className={"w-100 px-3 mx-auto text-center"}>
                    <Modal.Title className={"px-0 w-100"}>
                        Sign out Confirmation
                    </Modal.Title>{" "}
                    <div className={"px-0"}>
            <span
                onClick={props.close_func}
                className="close pointer"
                aria-label="Close"
                aria-hidden="true"
            >
              &times;
            </span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you would like to sign out of this session?
                </Modal.Body>
                <Modal.Footer className={"row mx-0 w-100 justify-content-between"}>
                    <div className={"col-4"}>
                        <Button
                            className="shadow-sm w-100"
                            variant="danger"
                            onClick={props.close_func}
                        >
                            No
                        </Button>
                    </div>
                    <div className={"col-4"}>
                        <Button
                            className="shadow-sm w-100"
                            variant="success"
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("userid");
                                localStorage.removeItem("role");
                                props.close_func();
                                complete();
                                if (props.location.pathname === "/") location.reload();
                            }}
                        >
                            Yes
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SignOut;
