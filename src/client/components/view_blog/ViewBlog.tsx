import * as React from "react";
import {useEffect, useState} from "react";
import {json} from "../../utils/api";
import Image from "react-bootstrap/Image";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Link, Redirect, RouteComponentProps} from "react-router-dom";

import {Blog} from "../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import SuccessAlertModal from "../modal/SuccessAlertModal";

export interface ViewBlogProps
  extends RouteComponentProps<{ id: null | string }> {}

const ViewBlog: React.FC<ViewBlogProps> = (props) => {
  const [blog, setBlog] = useState<Blog>({
    id: "",
    title: "",
    img_src: "",
    content: "",
    authorid: "",
    name: "",
    tags: [{ label: "", value: "" }],
    _created: "",
  });
  const [heading, setHeading] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [sucShow, setSucShow] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(true);
  const handleClose = () => setSucShow(false);
  const handleShow = () => setSucShow(true);

  let getBlog = async () => {
    try {
      let res1 = await json(
        `/api/blogs/${props.match.params.id}/getblog`,
        "GET"
      );
      let myBlog = res1[0];

      let res2: any = await json(
        `/api/blogs/${props.match.params.id}/gettag`,
        "GET"
      );
      let tags = res2;
      let tagObj: [{ label: string; value: string }] = [
        { label: "", value: "" },
      ];
      let count: number = 0;
      for (const tag in tags[0]) {
        if (count === 0)
          tagObj.splice(0, 1, {
            label: `${tags[0][tag].name}`,
            value: `${tags[0][tag].id}`,
          });
        else
          tagObj.push({
            label: `${tags[0][tag].name}`,
            value: `${tags[0][tag].id}`,
          });
        count++;
      }

      setBlog({
        id: `${myBlog.id}`,
        title: `${myBlog.title}`,
        img_src: `${myBlog.img_src}`,
        content: `${myBlog.content}`,
        authorid: `${myBlog.authorid}`,
        name: `${myBlog.name}`,
        tags: tagObj,
        _created: `${myBlog._created}`,
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      if (props.match.params.id) getBlog();
    } else {
      if (props.location.pathname.includes("/view")) setRedirect(false);
    }

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
      {redirect ? (
        <>
          <Jumbotron
            style={{
              wordBreak: "break-word",
              marginTop: "2.0rem",
              backgroundColor: "lightgrey",
            }}
            className={
              "text-center shadow-lg border border-dark text-dark align-self-center  rounded p-0 zoom pb-0 pt-2"
            }
          >
            <>
              <Row className={"w-100 mx-0"}>
                <Col
                  xs={12}
                  className={"text-wrap w-100 my-font-size text-monospace"}
                >
                  {blog.title}
                </Col>
                <Col xs={12} className={"mt-3"}>
                  <p className={"small font-italic text-dark"}>
                    By: {blog.name}
                  </p>
                </Col>
                <Col xs={12} className={"mt-1"}>
                  <p className={"small font-italic text-dark"}>
                    {blog._created}
                  </p>
                </Col>
              </Row>
              <Row xs={3} className={"mb-5 w-100 justify-content-around mx-0"}>
                {blog.tags.map((tg) => (
                  <Col className={"my-3"} key={`${tg.value}`}>
                    <Badge
                      pill
                      key={`${tg.value}`}
                      className={"shadow-sm text-dark mx-auto"}
                      style={{
                        backgroundColor:
                          parseInt(tg.value) === 1
                            ? "#ffc0cb"
                            : parseInt(tg.value) === 2
                            ? "#cd5c5c"
                            : parseInt(tg.value) === 3
                            ? "#a1a1e4"
                            : parseInt(tg.value) === 4
                            ? "#00a9fa"
                            : parseInt(tg.value) === 5
                            ? "#face00"
                            : parseInt(tg.value) === 6
                            ? "#ffffff"
                            : parseInt(tg.value) === 7
                            ? "#ffa500"
                            : parseInt(tg.value) === 8
                            ? "#e4e4a1"
                            : null,
                      }}
                    >
                      {tg.label}
                    </Badge>
                  </Col>
                ))}
              </Row>
              <Row className={"justify-content-center w-100 mx-0 mt-0 mb-5"}>
                <Col xs={12} sm={10} md={8} lg={6}>
                  <Image
                    className={
                      "border border-dark shadow-sm rounded display-img w-100"
                    }
                    src={blog.img_src}
                  />
                </Col>
              </Row>
              <Row
                className={
                  "justify-content-center w-100 mx-0 mb-2 my-5 text-left"
                }
              >
                <Col xs={12} md={10}>
                  <p>{blog.content}</p>
                </Col>
              </Row>
              {localStorage.getItem("role") === "admin" ? (
                <footer
                  className={
                    " bg-dark text-white align-self-center my-round mt-auto "
                  }
                >
                  <Row className={"m-0 p-0 w-100 justify-content-md-between"}>
                    <Col
                      key={`GOINGBACK`}
                      xs={12}
                      md={5}
                      lg={3}
                      className={"mx-1 my-md-3 my-3 order-2 order-md-1"}
                    >
                      <Link
                        className={"w-100 btn btn-info shadow-sm"}
                        to={{
                          pathname: `/`,
                          state: { prevPath: props.location.pathname },
                        }}
                      >
                        Go Home
                      </Link>
                    </Col>

                    <Col
                      key={`edit`}
                      xs={12}
                      md={5}
                      lg={3}
                      className={"mx-1 my-md-3 my-3 order-1 order-md-2"}
                    >
                      <Link
                        style={{ backgroundColor: "#BA55D3" }}
                        className={"btn  w-100 shadow-sm text-white"}
                        to={{
                          pathname: `/${props.match.params.id}/edit`,
                          state: { prevPath: props.location.pathname },
                        }}
                      >
                        Edit
                      </Link>
                    </Col>
                  </Row>
                </footer>
              ) : (
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
                      <Link
                        className={"w-100 btn btn-info shadow-sm"}
                        to={{
                          pathname: `/`,
                          state: { prevPath: props.location.pathname },
                        }}
                      >
                        Go Home
                      </Link>
                    </div>
                  </Row>
                </footer>
              )}
            </>
          </Jumbotron>
          <SuccessAlertModal
            open_mod={sucShow}
            heading={heading}
            body={body}
            close_func={handleClose}
            show_func={handleShow}
          />
        </>
      ) : (
        <>
          <Redirect
            to={{
              pathname: "/login",
              state: { prevPath: props.location.pathname },
            }}
          />
        </>
      )}
    </>
  );
};

export default ViewBlog;
