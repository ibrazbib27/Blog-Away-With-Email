import * as React from "react";
import Modal from "react-bootstrap/Modal";
import DangerAlert from "../alert/DangerAlert";


export interface ModalProps {
    open_mod: boolean;
    close_func: any;
    show_func: any;
}

const DangerAlertModal: React.FC<ModalProps> = (props) => {
    return (
        <>
            <Modal show={props.open_mod} onHide={props.close_func} className={"text-center"}>
                <DangerAlert
                    open_alert={props.open_mod}
                    close_func={props.close_func}
                    show_func={props.show_func}
                />
            </Modal>
        </>
    );
};

export default DangerAlertModal;
