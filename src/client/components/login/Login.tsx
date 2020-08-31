import * as React from "react";
import {useEffect, useState} from "react";
import * as $ from "jquery";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Link, RouteComponentProps} from "react-router-dom";
import {json, SetAccessToken} from "../../utils/api";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";

library.add(faInfoCircle);

export interface LoginProps extends RouteComponentProps<any> {}

const Login: React.FC<LoginProps> = (props) => {
  const renderTooltipEmail = (props: any) => (
    <Tooltip id="button-tooltip_title" {...props}>
      Enter your email here
    </Tooltip>
  );
  const renderTooltipPwd = (props: any) => (
    <Tooltip id="button-tooltip_img" {...props}>
      Enter your password here
    </Tooltip>
  );

  const [link, setLink] = useState<string>("/");
  const [validateForm, setValidateForm] = useState<boolean>(false);

  $(document).ready(function () {
    if (validateForm) {
      isValid("#email");
      isValid("#password");
    }

    $("#shw_pas").click(function () {
      $(this).is(":checked")
        ? $("#password").attr("type", "text")
        : $("#password").attr("type", "password");
    });
  });

  useEffect(() => {
    let myLink: any;
    if (localStorage.getItem("token") === null) {
      if (props.location.state) {
        myLink = props.location.state;
        setLink(myLink.prevPath);
      }
    }
  }, []);

  const isValid = (id: string) => {
    $(id).on("input", () => {
      if ($(id).hasClass("is-invalid")) {
        if ($(id).val().toString().trim().length > 0) {
          if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
        } else {
          if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
        }
      }
    });
  };
  const findInvalid = (blank: boolean) => {
    $(document).ready(function () {
      if (blank) {
        $(".form-control:input").each(function () {
          let valdid: string;

          if ($(this).attr("id").toString() === "email")
            valdid = $(this).val().toString().trim();
          else valdid = $(this).val().toString().trim();

          if ($(this).hasClass("is-invalid")) $(this).removeClass("is-invalid");

          if (valdid.length === 0) $(this).addClass("is-invalid");
        });
      } else {
        $(".form-control:input").each(function () {
          if ($(this).hasClass("is-invalid")) $(this).removeClass("is-invalid");

          $(this).addClass("is-invalid");
        });
      }
      $(".is-invalid:input").first().focus();
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const email: string = $("#email").val() as string;
    const password: string = $("#password").val() as string;

    if (email.trim().length === 0 || password.length === 0) {
      if (password.length === 0) $("#pass").html("Enter your password");
      if (email.trim().length === 0) {
        $("#eml").html("Enter your email");
        $("#email").val(email.trim());
      }

      findInvalid(true);
      setValidateForm(true);
    } else postFunc();
  };

  let loginForm = () => {
    let form = $(`#login_form`).serializeArray();
    let formData: any = {};
    formData.email = form[0].value;
    formData.password = form[1].value;
    return formData;
  };
  let postFunc = async () => {
    setValidateForm(false);
    let formData: any = loginForm();
    try {
      let result: any = await json(`/auth/login`, `POST`, formData);
      if (result) {
        SetAccessToken(result.token, {
          userid: result.userid,
          role: result.role,
        });
        let path: any = props.location.state;

        if (result.role === "admin") {
          if (path.prevPath && path.prevPath !== "/admin")
            props.history.replace({
              pathname: path.prevPath,
              state: {
                heading: "Welcome Back!",
                body: "You have successfully logged back in!",
              },
            });
          else
            props.history.replace({
              pathname: "/",
              state: {
                heading: "Welcome Back!",
                body: "You have successfully logged back in!",
              },
            });
        } else if (result.role === "member") {
          if (
            path.prevPath.includes("/view") ||
            path.prevPath.includes("/about") ||
              path.prevPath.includes("/donations")
          )
            props.history.replace({
              pathname: path.prevPath,
              state: {
                heading: "Welcome Back!",
                body: "You have successfully logged back in!",
              },
            });
          else
            props.history.replace({
              pathname: "/",
              state: {
                heading: "Welcome Back!",
                body: "You have successfully logged back in!",
              },
            });
        } else
          props.history.replace({
            pathname: "/",
            state: {
              heading: "Welcome Back!",
              body: "You have successfully logged back in!",
            },
          });
      } else {
        $("#pass").html("Incorrect email/password entry!");
        $("#eml").html("Incorrect email/password entry!");
        findInvalid(false);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
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
        id={"login_form"}
        className={"m-0 w-100"}
      >
        <Row className={"w-100 mx-0 mb-1"}>
          <Col xs={12} className={"text-wrap w-100"}>
            <Form.Text className={"font-italic small m-0"}>
              <Link
                key={link}
                to={{ pathname: `/register`, state: { prevPath: link } }}
                style={{ color: "hotpink" }}
              >
                Don't Have an Account? Register Here!
              </Link>
            </Form.Text>
          </Col>
        </Row>
        <Row className={"w-100 mx-0"}>
          <Col xs={12} className={"text-wrap w-100"}>
            <Form.Text className={"font-italic small text-dark m-0"}>
              ( <span className={"required"}></span>Indicates required )
            </Form.Text>
          </Col>
        </Row>

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
              className={"shadow-sm"}
              id={"email"}
              autoFocus
            />
            <Form.Control.Feedback
              id="eml"
              className={"text-left"}
              type="invalid"
            ></Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className={"w-100 justify-content-center mx-0 my-5"}>
          <Form.Group className={"my-2 col-12 col-md-10"}>
            <Form.Label className={"required"}>
              <b>Password</b>
              <OverlayTrigger
                placement="right-end"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipPwd}
              >
                <FontAwesomeIcon
                  className={"ml-2"}
                  size={"sm"}
                  icon={["fas", "info-circle"]}
                />
              </OverlayTrigger>
            </Form.Label>

            <Form.Control
              type="password"
              name={"password"}
              className={"shadow-sm"}
              id={"password"}
            />
            <Form.Check
              type="checkbox"
              id="shw_pas"
              label="Show Password"
              className={"font-italic small text-left text-dark my-2"}
            />
            <Form.Control.Feedback
              id="pass"
              className={"text-left"}
              type="invalid"
            ></Form.Control.Feedback>
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
                Login
              </Button>
            </div>
          </Row>
        </footer>
      </Form>
    </Jumbotron>
  );
};

export default Login;
