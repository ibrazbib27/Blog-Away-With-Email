import * as React from "react";
import {useEffect, useState} from "react";
import * as moment from "moment";

import {json} from "../../utils/api";
import * as $ from "jquery";
import {Link, Redirect, RouteComponentProps} from "react-router-dom";
import {Blog} from "../App";
import ModalConfirmation from "../modal/ModalConfirmation";
import AlertModal from "../modal/WarningAlertModal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import SuccessAlertModal from "../modal/SuccessAlertModal";
import DangerAlertModal from "../modal/DangerAlertModal";

library.add(faInfoCircle);

export interface ContactProps
    extends RouteComponentProps<any> {}


const Contact: React.FC<ContactProps> = (props) => {

    const renderTooltipSubject = (props: any) => (
        <Tooltip id="button-tooltip_title" {...props}>
            Enter your subject here (cannot exceed 60 characters).
        </Tooltip>
    );
    const renderTooltipEmail = (props: any) => (
        <Tooltip id="button-tooltip_email" {...props}>
            Enter your email here following proper email syntax; for example:
            'jane.doe@example.com'
        </Tooltip>
    );
    const renderTooltipMessage = (props: any) => (
        <Tooltip id="tooltip-top" {...props}>
            Enter your message here (cannot exceed 10000
            characters).
        </Tooltip>
    );




    const emailReg = new RegExp(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    const [errShow, setErrShow] = useState<boolean>(false);
    const handleClose = () => setErrShow(false);
    const handleShow = () => setErrShow(true);
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isEmail, setIsEmail] = useState<string>('');
    const [isSubject, setIsSubject] = useState<boolean>(false);
    const [isMessage, setIsMessage] = useState<boolean>(false);
    const [isEmailErr, setIsEmailErr] = useState<boolean>(false);
    const [isSubjectErr, setIsSubjectErr] = useState<boolean>(false);
    const [isMessageErr, setIsMessageErr] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [sucShow, setSucShow] = useState<boolean>(false);
    const handleCloseMod = () => setSucShow(false);
    const handleShowMod = () => setSucShow(true);
    const formElement: HTMLFormElement = document.getElementById(
        "blog_form"
    ) as HTMLFormElement;
    const [textLength, setTextLength] = useState(10000);

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

    const handleChange = (textBoxLength: number) => {
        setTextLength(10000 - textBoxLength);
    };

    const findInvalid = () => {
        let tempElement: string;

            tempElement = $(".is-invalid").first().attr("id").toString();

            $(`#${tempElement}`).focus();
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
    let tempEmail: boolean = false;
    let tempSubject: boolean = false;
    let tempMessage: boolean = false;

        if(email.length === 0) {
            setIsEmail('length');
            setIsEmailErr(true);
            tempEmail = true;
        }
        else if(!(emailReg.test(email))) {
            setIsEmail('syntax');
            setIsEmailErr(true);
            tempEmail = true;
        }
        else {
            setIsEmail('');
            setIsEmailErr(false);
        }

        if(subject.length === 0) {
            setIsSubject(true);
            setIsSubjectErr(true);
            tempSubject = true;
        }
        else {
            setIsSubject(false);
            setIsSubjectErr(false);
        }

        if(message.length === 0) {
            setIsMessage(true);
            setIsMessageErr(true);
            tempMessage = true;
        }
        else {
            setIsMessage(false);
            setIsMessageErr(false);
        }


        if (!tempEmail && !tempSubject && !tempMessage) {
            let emailData: any = {};
            emailData.email = email;
            emailData.subject = subject;
            emailData.message = message;
            try{
                let results = await json('api/blogs/contact', 'POST', emailData);
                if(results)
                    props.history.push({ pathname: '/' , state: {heading: 'Message Sent!', body: 'We have received your email message! We will get back to you shortly!'}});
                else
                    setErrShow(true);

            }
            catch (e) {
                console.log(e);
            }
        }
        else setTimeout(() => { findInvalid(); }, 10);
    };



    return  (
            <>
                <Jumbotron
                    style={{ backgroundColor: "lightgrey", marginTop: "2.0rem" }}
                    className= "text-center shadow-lg border border-dark text-dark align-self-center  rounded p-0 zoom pb-0 pt-2"
                >
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                        id={"email_form"}
                        className={"mx-auto my-0 p-0 w-100"}
                    >
                        <Form.Text className={"font-italic small text-dark m-0"}>
                            ( <span className={"required"}></span>Indicates required )
                        </Form.Text>

                        <Row className={"w-100 justify-content-center mx-0 my-5"}>
                            <Form.Group className={"my-2 col-12 col-md-10"}>
                                <Form.Label className={"required"}>
                                    <b>Email</b>
                                    <OverlayTrigger
                                        placement="right-end"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipEmail}
                                    >
                                        <FontAwesomeIcon
                                            className={"ml-2"}
                                            size={"sm"}
                                            icon={["fas", "info-circle"]}
                                        />
                                    </OverlayTrigger>
                                </Form.Label>

                                <Form.Control
                                    type="email"
                                    name={"email"}
                                    className={isEmailErr ? "shadow-sm is-invalid" : "shadow-sm"}
                                    id={"email"}
                                    autoFocus
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setEmail(e.target.value.trim());
                                            if (isEmail === "length") {
                                                    if (e.target.value.trim().length > 0)
                                                        setIsEmailErr(false);
                                                    else
                                                        setIsEmailErr(true);
                                            }
                                            if (isEmail === "syntax") {
                                                if (emailReg.test(e.target.value.trim()))
                                                    setIsEmailErr(false);
                                                else
                                                    setIsEmailErr(true);
                                            }

                                    }
                                    }
                                />
                                <Form.Control.Feedback
                                    id="eml"
                                    className={"text-left"}
                                    type="invalid"
                                >
                                    {isEmailErr ? isEmail === "length" ? "Enter your email" : "Enter a valid email address- see the information icon for guidance" : ""}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className={"w-100 justify-content-center mx-0 mb-0 mt-5"}>
                            <Form.Group className={"my-2 col-12 col-md-10"}>
                                <Form.Label className={"required"}>
                                    <b>
                                        Subject
                                    </b>
                                    <OverlayTrigger
                                        placement="right-end"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipSubject}
                                    >
                                        <FontAwesomeIcon
                                            className={"ml-2"}
                                            size={"sm"}
                                            icon={["fas", "info-circle"]}
                                        />
                                    </OverlayTrigger>
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name={"subject"}
                                    className={isSubject ? "shadow-sm is-invalid" : "shadow-sm"}
                                    id={"subject"}
                                    maxLength={100}
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setSubject(e.target.value);
                                        if(isSubjectErr){
                                            if(e.target.value.length > 0)
                                                setIsSubject(false);
                                            else
                                                setIsSubject(true);
                                        }
                                    }
                                    }
                                />
                                <Form.Control.Feedback className={"text-left"} type="invalid">
                                    Enter your subject
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className={"w-100 justify-content-center mb-2 mx-0 mt-5"}>
                            <Col className={"my-2"} xs={12} md={10}>
                                <Form.Group>
                                    <Form.Label className={"required"}>
                                        <b>

                                                Message

                                        </b>
                                        <OverlayTrigger
                                            placement="right-end"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipMessage}
                                        >
                                            <FontAwesomeIcon
                                                className={"ml-2"}
                                                size={"sm"}
                                                icon={["fas", "info-circle"]}
                                            />
                                        </OverlayTrigger>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name={"message"}
                                        className={isMessage ? "shadow-sm is-invalid" : "shadow-sm"}
                                        id={"message"}
                                        maxLength={10000}
                                        onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            setMessage(e.target.value);
                                            handleChange(e.target.value.length);
                                            if(isMessageErr){
                                                if(e.target.value.length > 0)
                                                    setIsMessage(false);
                                                else
                                                    setIsMessage(true);
                                            }
                                        }
                                        }
                                    />
                                    <Form.Text
                                        key={textLength}
                                        className={"font-italic small text-left text-dark"}
                                    >
                                        You have {textLength} characters left.
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid" className={"text-left"}>
                                        Enter your message
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <footer
                            className={
                                " bg-dark text-white align-self-center my-round mt-auto"
                            }
                        >
                            <Row className={"mx-0 p-0 w-100 justify-content-center"}>
                                {" "}
                                <div
                                    className={
                                        "mx-1 my-md-3 my-3 d-flex align-self-center col-xl-3  col-lg-4 col-md-5 col-sm-6 col-12"
                                    }
                                >
                                    <Button
                                        className={"w-100 shadow-sm"}
                                        variant={"success"}
                                        type={"submit"}
                                    >
                                        Send Message
                                    </Button>
                                </div>
                            </Row>
                        </footer>
                    </Form>
                </Jumbotron>
                <DangerAlertModal
                    open_mod={errShow}
                    close_func={handleClose}
                    show_func={handleShow}
                />
                <SuccessAlertModal
                    open_mod={sucShow}
                    heading={heading}
                    body={body}
                    close_func={handleCloseMod}
                    show_func={handleShowMod}
                />
            </>

    );
};
export default Contact;
