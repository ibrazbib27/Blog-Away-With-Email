import * as React from "react";
import {useEffect, useState} from "react";
import {json} from "../../utils/api";
import {Link, RouteComponentProps} from "react-router-dom";
import * as $ from "jquery";
import Container from "react-bootstrap/Container";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import SuccessAlertModal from "../modal/SuccessAlertModal";

import Row from "react-bootstrap/Row";
import {Blog} from "../App";

interface AllBlogsProps extends RouteComponentProps<any> {}

const AllBlogs: React.FC<AllBlogsProps> = (props) => {
    $(document).ready(function () {
        if (blogs.length > 0) {
            if (blogs.length === 1) $("#blog").removeClass("align-items-stretch");
            else $("#blog").addClass("align-items-stretch");
        }
    });

    const [blogs, setBlog] = useState<Blog[]>([]);
    const [blogsBool, setBlogsBool] = useState<boolean>(true);
    const [heading, setHeading] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [sucShow, setSucShow] = useState<boolean>(false);
    const handleClose = () => setSucShow(false);
    const handleShow = () => setSucShow(true);


    let setBlogs = (bool: boolean) => {
        setBlogsBool(bool);
    };

    let getBlogs = async () => {
        try {
            let res: any;

            res = await json(`/api/blogs/getall`, "GET");
            if (res) {
                let blogMore = res;

                let blogObj: Blog[] = [];
                //json returned with username parameter is different compared to returning blogs with no parameters
                for (const blog in blogMore) {
                    blogObj.push({
                        id: blogMore[blog].id,
                        title: blogMore[blog].title,
                        img_src: blogMore[blog].img_src,
                        content: blogMore[blog].content,
                        authorid: blogMore[blog].authorid,
                        name: blogMore[blog].name,
                        tags: [{ label: "", value: "" }],
                        _created: blogMore[blog]._created,
                    });
                }

                setBlog(blogObj);
                if (blogObj !== undefined) {
                    if (blogObj.length > 0) setBlogs(true);
                    else setBlogs(false);
                }
            } else setBlogs(false);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getBlogs();
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
            {blogsBool ? (
                <Container
                    className={
                        "d-flex justify-content-center align-items-center min-vh-100"
                    }
                    fluid
                >
                    <Row
                        xs={1}
                        sm={2}
                        md={3}
                        lg={3}
                        xl={4}
                        id={"blog"}
                        className={
                            "justify-content-center justify-content-sm-around align-items-center mt-5 w-100"
                        }
                    >
                        {blogs.map((blog) => (
                            <Col
                                className={
                                    blogs.length > 1
                                        ? "my-3 py-3 d-flex align-items-stretch"
                                        : "my-3 py-3 px-0 px-sm-2"
                                }
                                key={blog.id}
                            >
                                <Card
                                    bg={"warning"}
                                    key={blog.id}
                                    id={blog.id}
                                    className={"shadow w-100 border border-dark"}
                                >
                                    <Card.Img
                                        variant="top"
                                        className="display-img w-100"
                                        src={`${blog.img_src}`}
                                    />
                                    <Card.Body>
                                        <Card.Title className={"text-monospace"}>
                                            {blog.title}
                                        </Card.Title>
                                        <Card.Text className={"text-info small"}>
                                            {blog.name}
                                        </Card.Text>
                                        <Link
                                            to={{
                                                pathname: `/${blog.id}/view`,
                                                state: { prevPath: props.location.pathname },
                                            }}
                                            className={"shadow-sm btn btn-primary"}
                                        >
                                            View Blog
                                        </Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted small font-italic">
                                            {blog._created}
                                        </small>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            ) : (
                <Container
                    className={
                        "d-flex justify-content-center align-items-center  text-center min-vh-100 container-fluid"
                    }
                    fluid
                >
                    <div>
                        <h3 className={"text-monospace mb-5"}>
                            Well, this is a little awkward...
                        </h3>

                        <p>
                            {localStorage.getItem("token") !== null
                                ? localStorage.getItem("role") === "admin"
                                    ? "It seems like you have not uploaded any blogs to your timeline, click the button below to start blogging!"
                                    : "Sorry, it seems like we have no blogs to share at this time, please try again later!"
                                : "Sorry, it seems like we have no blogs to share at this time, please try again later!"}
                        </p>
                        {localStorage.getItem("token") !== null ? (
                            localStorage.getItem("role") === "admin" ? (
                                <Link
                                    to={{
                                        pathname: `/admin`,
                                        state: { prevPath: props.location.pathname },
                                    }}
                                    className={"shadow-sm btn btn-light mt-5"}
                                >
                                    Create New Blog!
                                </Link>
                            ) : null
                        ) : null}
                    </div>
                </Container>
            )}
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

export default AllBlogs;
