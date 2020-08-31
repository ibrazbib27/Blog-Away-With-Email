import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fab} from "@fortawesome/free-brands-svg-icons";

library.add(fab);

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <Row className="w-100  mx-0 justify-content-around bg-dark mt-auto pt-3 pb-1">
            <Col xs={12} className="mx-auto p-0">
                <Row className="w-100  mx-auto justify-content-around">
                    <FontAwesomeIcon
                        className="fa-2x text-primary"
                        icon={["fab", "facebook"]}
                    />
                    <FontAwesomeIcon
                        className="fa-2x text-white"
                        icon={["fab", "twitter"]}
                    />
                    <FontAwesomeIcon
                        className="fa-2x text-danger"
                        icon={["fab", "instagram"]}
                    />
                </Row>
            </Col>

            <Col
                xs={12}
                className="text-center font-weight-lighter small text-white mt-4 mt-md-3 px-0"
            >
                © 2020 Copyright: <b>blogaway.com</b>
            </Col>
        </Row>
    );
};

export default Footer;
