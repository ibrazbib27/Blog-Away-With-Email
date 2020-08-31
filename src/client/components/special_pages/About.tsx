import * as React from "react";
import {useEffect, useState} from "react";

import {RouteComponentProps} from "react-router-dom";
import SuccessAlertModal from "../modal/SuccessAlertModal";

export interface AboutProps extends RouteComponentProps<any> {}

const About: React.FC<AboutProps> = (props) => {
    const [heading, setHeading] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [sucShow, setSucShow] = useState<boolean>(false);
    const handleClose = () => setSucShow(false);
    const handleShow = () => setSucShow(true);
    useEffect(() => {
        if (props.location.state) {
            const modalInfo: any = props.location.state;
            if (modalInfo.heading) setHeading(modalInfo.heading);

            if (modalInfo.body) setBody(modalInfo.body);

            if (modalInfo.heading && modalInfo.body) setSucShow(true);

            props.history.push({
                pathname: props.location.pathname,
                state: {},
            });
        }
    }, []);

    return (
        <>
            <h3 className={"text-monospace mb-5"}>Who Are We?</h3>

            <p>
                2020 has been a crazy year, in every single way. If you wanna share your
                perspective and insight to the world on current events, books, games,
                sports, or anything, then Blog Away is the place you wanna be to do it.
                Plenty of things are going on around the world, so feel free to express
                yourself to your fullest at Blog Away!
            </p>
            <SuccessAlertModal
                open_mod={sucShow}
                heading={heading}
                body={body}
                close_func={handleClose}
                show_func={handleShow}
            />
        </>
    );
};
export default About;
