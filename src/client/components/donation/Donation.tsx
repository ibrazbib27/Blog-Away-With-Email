import * as React from "react";
import {useEffect, useState} from "react";
import * as $ from "jquery";

import Jumbotron from "react-bootstrap/Jumbotron";
import {IMaskInput} from "react-imask";
import {json} from "../../utils/api";
import {RouteComponentProps} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import {CardElement, injectStripe, ReactStripeElements,} from "react-stripe-elements";
import SuccessAlertModal from "../modal/SuccessAlertModal";
import DangerAlertModal from "../modal/DangerAlertModal";

library.add(faInfoCircle);

export interface DonationPaymentProps
    extends ReactStripeElements.InjectedStripeProps {}
export interface DonationRouteProps extends RouteComponentProps<any> {}

const Donation: React.FC<DonationPaymentProps & DonationRouteProps> = (
    props
) => {
    const renderTooltipName = (props: any) => (
        <Tooltip id="button-tooltip_title" {...props}>
            Enter your name here
        </Tooltip>
    );
    const renderTooltipAmt = (props: any) => (
        <Tooltip id="button-tooltip_amt" {...props}>
            Enter the amount you are willing to donate today (USD). The minimum amount
            you can donate is $0.01 and the maximum is $100,000.00
        </Tooltip>
    );
    const renderTooltipCardDetails = (props: any) => (
        <Tooltip id="button-tooltip_amt" {...props}>
            Enter your card payment details here
        </Tooltip>
    );

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("0.00");
    const [amountErr, setAmountErr] = useState<boolean>(false);
    const [nameErr, setNameErr] = useState<boolean>(false);
    const [cardErr, setCardErr] = useState<boolean>(false);
    const [amountErrConfirm, setAmountErrConfirm] = useState<boolean>(false);
    const [nameErrConfirm, setNameErrConfirm] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const routeHeading = "Payment Complete!";
    let routeBody =
        `Your payment has been successfully processed! Thank you for your donation of $${amount}! ` +
        `Your donation means a lot to the Blog Away community. Your contribution will surely help improve the Blog Away experience and our development!`;
    const [sucShow, setSucShow] = useState<boolean>(false);
    const handleCloseMod = () => setSucShow(false);
    const handleShowMod = () => setSucShow(true);
    const [dangerShow, setDangerShow] = useState<boolean>(false);
    const handleCloseDangerMod = () => setDangerShow(false);
    const handleShowDangerMod = () => setDangerShow(true);

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
    const findInvalid = () => {
        $(document).ready(() => {
            let tempElement: string;

            if ($(".is-invalid").length > 0)
                tempElement = $(".is-invalid").first().attr("id").toString();

            $(`#${tempElement}`).focus();
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        let tempAmountErrBool: boolean = false;
        let tempCardErrBool: boolean = false;
        let tempNameErrBool: boolean = false;

        if (name.trim().length === 0) {
            setNameErr(true);
            setNameErrConfirm(true);
            tempNameErrBool = true;
        } else {
            setNameErr(false);
            setNameErrConfirm(false);
        }

        if (amount === "0.00") {
            setAmountErr(true);
            setAmountErrConfirm(true);
            tempAmountErrBool = true;
        } else {
            setAmountErr(false);
            setAmountErrConfirm(false);
        }

        try {
            let token: any = await props.stripe.createToken({ name: name });
            if (token.error) {
                setCardErr(true);
                tempCardErrBool = true;
            } else setCardErr(false);

            if (tempAmountErrBool || tempCardErrBool || tempNameErrBool)
                findInvalid();
            else await postPayment({ token: token.token, amount: amount });
        } catch (e) {
            console.log(e);
        }
    };

    let postPayment = async (dataBody: any) => {
        try {
            const verify = await json("api/blogs/donation", "POST", dataBody);

            if (verify)
                props.history.push({
                    pathname: "/",
                    state: { heading: routeHeading, body: routeBody },
                });
            else setDangerShow(true);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Jumbotron
                style={{
                    wordBreak: "break-word",
                    marginTop: "5.5rem",
                    backgroundColor: "lightgrey",
                }}
                className={
                    "text-center shadow-lg border border-dark text-dark align-self-center mt-5 rounded p-0 zoom mb-5 mb-0 pb-0 pt-2"
                }
            >
                <Form
                    noValidate
                    onSubmit={handleSubmit}
                    id={"donation_form"}
                    className={"m-0 w-100"}
                >
                    <Row className={"w-100 mx-0 mb-1"}>
                        <Col xs={12} className={"text-wrap w-100"}>
                            <Form.Text className={"font-italic small text-dark m-0"}>
                                ( <span className={"required"}></span>Indicates required )
                            </Form.Text>
                        </Col>
                    </Row>

                    <Row className={"w-100 justify-content-around mx-0 my-5"}>
                        <Form.Group className={"my-2  col-md-5 col-sm-6 col-12"}>
                            <Form.Label className={"required"}>
                                <b>Name</b>
                                <OverlayTrigger
                                    placement="right-end"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipName}
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
                                name={"name"}
                                className={nameErr ? "shadow-sm is-invalid" : "shadow-sm"}
                                id={"name"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (nameErrConfirm) {
                                        if (e.target.value.trim().length === 0) setNameErr(true);
                                        else setNameErr(false);
                                    }
                                    setName(e.target.value);
                                }}
                                autoFocus
                            />
                            <Form.Control.Feedback
                                id="nm"
                                className={"text-left"}
                                type="invalid"
                            >
                                Enter your name
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"my-2 col-md-4 col-sm-5 col-12 "}>
                            <Form.Label className={"required"}>
                                <b>Amount</b>
                                <OverlayTrigger
                                    placement="right-end"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipAmt}
                                >
                                    <FontAwesomeIcon
                                        className={"ml-2"}
                                        size={"sm"}
                                        icon={["fas", "info-circle"]}
                                    />
                                </OverlayTrigger>
                            </Form.Label>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <IMaskInput
                                    id={"amount"}
                                    className={
                                        amountErr
                                            ? "shadow-sm is-invalid form-control rounded-right"
                                            : "shadow-sm form-control rounded-right"
                                    }
                                    mask={Number}
                                    min={0}
                                    max={100000}
                                    scale={2}
                                    radix={"."}
                                    normalizeZeros={true}
                                    padFractionalZeros={true}
                                    thousandsSeparator={","}
                                    onAccept={(value: any, mask: any) => {
                                        if (!value.includes(".")) value = value + ".00";

                                        if (value.indexOf(".") === value.length - 1)
                                            value = value + "00";

                                        if (value.indexOf(".") === value.length - 2)
                                            value = value + "0";

                                        if (value.length === 3) value = "0" + value;

                                        if (amountErrConfirm) {
                                            if (value === "0.00") setAmountErr(true);
                                            else setAmountErr(false);
                                        }

                                        setAmount(value);
                                    }}
                                />
                                <Form.Control.Feedback
                                    id="amt"
                                    className={"text-left"}
                                    type="invalid"
                                >
                                    Enter a valid price amount
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row className={"w-100 justify-content-center mx-0 my-5"}>
                        <Form.Group className={"my-2 col-12 col-md-10"}>
                            <Form.Label className={"required"}>
                                <b>Card Details</b>
                                <OverlayTrigger
                                    placement="right-end"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipCardDetails}
                                >
                                    <FontAwesomeIcon
                                        className={"ml-2"}
                                        size={"sm"}
                                        icon={["fas", "info-circle"]}
                                    />
                                </OverlayTrigger>
                            </Form.Label>

                            <CardElement
                                id={"card"}
                                className={
                                    cardErr
                                        ? "form-control is-invalid shadow-sm"
                                        : "form-control shadow-sm"
                                }
                            />

                            <Form.Control.Feedback
                                id="crd"
                                className={"text-left"}
                                type="invalid"
                            >
                                Enter all the card credentials
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <footer
                        className={" bg-dark text-white align-self-center my-round mt-auto"}
                    >
                        <Row className={"mx-0 p-0 w-100 justify-content-center"}>
                            {" "}
                            <div
                                className={
                                    "mx-1 my-md-3 my-3 d-flex align-self-center col-xl-3  col-lg-4 col-md-5 col-sm-6 col-12"
                                }
                            >
                                <Button
                                    type="submit"
                                    className="shadow-sm w-100"
                                    variant="success"
                                >
                                    Donate ${`${amount}`}
                                </Button>
                            </div>
                        </Row>
                    </footer>
                </Form>
            </Jumbotron>
            <SuccessAlertModal
                open_mod={sucShow}
                heading={heading}
                body={body}
                close_func={handleCloseMod}
                show_func={handleShowMod}
            />
            <DangerAlertModal
                open_mod={dangerShow}
                close_func={handleCloseDangerMod}
                show_func={handleShowDangerMod}
            />
        </>
    );
};

export default injectStripe(Donation);
