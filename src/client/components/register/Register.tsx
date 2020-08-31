import * as React from "react";
import {useEffect, useState} from "react";
import * as $ from "jquery";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Link, RouteComponentProps} from "react-router-dom";
import {json, SetAccessToken} from "../../utils/api";
import Select from "react-select";
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

export interface RegisterProps extends RouteComponentProps<any> {}

const Register: React.FC<RegisterProps> = (props) => {
  const renderTooltipEmail = (props: any) => (
    <Tooltip id="button-tooltip_title" {...props}>
      Enter your email here following proper email syntax; for example:
      'jane.doe@example.com'
    </Tooltip>
  );
  const renderTooltipPwd = (props: any) => (
    <Tooltip id="button-tooltip_img" {...props}>
      Enter your password here. Your password must be at least 8 characters long
      with, at least one capitalized character, one lower case character, one
      special character, one numeric character. Also, your password cannot have
      any white spaces, any types of colons, parentheses, any types of brackets,
      any types of slashes, and any types of quotation marks.
    </Tooltip>
  );
  const renderTooltipPwdConfirm = (props: any) => (
    <Tooltip id="button-tooltip_img" {...props}>
      Re-enter your password here
    </Tooltip>
  );
  const renderTooltipRole = (props: any) => (
    <Tooltip id="button-tooltip_author" {...props}>
      Select a role here
    </Tooltip>
  );

  const [emailInvMes, setEmailInvMes] = useState<string>("");
  const [pass1InvMes, setPass1InvMes] = useState<string>("");
  const [pass2InvMes, setPass2InvMes] = useState<string>("");

  const [link, setLink] = useState<string>("/");

  const [roleOption, setRoleOptions] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "" });

  $(document).ready(function () {
    rolesValidationColors("#ced4da");
    selectCss();
    switch (emailInvMes) {
      case "length":
        isValidLength("#email", 0);
        break;
      case "syntax":
        const emailReg = new RegExp(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );
        isValidEmailSyntax(emailReg);
        break;
      default:
        break;
    }
    switch (pass1InvMes) {
      case "length":
        isValidLength("#password", 0);
        break;
      case "syntax":
        const pass1Reg = new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_\-\+\*\~\=\.\,\?])(?=.{8,})/
        );
        const pass2Reg = new RegExp(/^\S*$/);
        isValidPwdSyntax(pass1Reg, pass2Reg, false);
        break;
      default:
        break;
    }
    switch (pass2InvMes) {
      case "length":
        isValidLength("#password2", 0);
        break;
      case "match":
        isValidPwd();
        break;
      default:
        break;
    }

    $("#shw_pas").click(function () {
      $(this).is(":checked")
        ? $("#password").attr("type", "text")
        : $("#password").attr("type", "password");
      $(this).is(":checked")
        ? $("#password2").attr("type", "text")
        : $("#password2").attr("type", "password");
    });
  });

  const selectCss = () => {
    $("#roles .css-1hb7zxy-IndicatorsContainer").css("cursor", "pointer");
    $("#roles div").first().css({
      cursor: "text",
      "box-shadow": "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
      "border-radius": "0.25rem",
      "border-style": "solid",
      "border-width": "1px",
    });
  };
  const rolesValidationColors = (color: string) => {
    if ($("#roles").hasClass("is-invalid"))
      $("#roles div").first().css("border-color", "#dc3545");
    else $("#roles div").css("border-color", `${color}`);
  };

  const selectValid = (cssValidation: boolean) => {
    if ($("#roles").hasClass("is-invalid"))
      $("#roles").removeClass("is-invalid");

    if (!cssValidation) $("#roles").addClass("is-invalid");

    $("#roles div")
      .first()
      .css("border-color", cssValidation ? "#ced4da" : "#dc3545");
  };
  useEffect(() => {
    let myLink: any;
    if (localStorage.getItem("token") === null) {
      if (props.location.state) {
        myLink = props.location.state;
        setLink(myLink.prevPath);
      }
    }
  }, []);

  const isValidPwd = () => {
    const pass1Reg = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_\-])(?=.{8,})/
    );
    const pass2Reg = new RegExp(/^\S*$/);

    $("#password").on("input", () => {
      let syntax: boolean = false;

      if ($("#password").hasClass("is-invalid"))
        $("#password").removeClass("is-invalid");

      if ($("#password2").hasClass("is-invalid"))
        $("#password2").removeClass("is-invalid");

      if (
        $("#password").val().toString() !== $("#password2").val().toString()
      ) {
        $("#password").addClass("is-invalid");
        $("#password2").addClass("is-invalid");
        syntax = true;
      }

      isValidPwdSyntax(pass1Reg, pass2Reg, syntax);
    });
    $("#password2").on("input", () => {
      let syntax: boolean = false;

      if ($("#password").hasClass("is-invalid"))
        $("#password").removeClass("is-invalid");

      if ($("#password2").hasClass("is-invalid"))
        $("#password2").removeClass("is-invalid");

      if (
        $("#password").val().toString() !== $("#password2").val().toString()
      ) {
        $("#password").addClass("is-invalid");
        $("#password2").addClass("is-invalid");
        syntax = true;
      }

      isValidPwdSyntax(pass1Reg, pass2Reg, syntax);
    });
  };
  const isValidLength = (id: string, length: number) => {
    $(id).on("input", () => {
      if ($(id).val().toString().trim().length > length) {
        if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
      } else {
        if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      }
    });
  };
  const isValidEmailSyntax = (compare: RegExp) => {
    $("#email").on("input", () => {
      if (compare.test($("#email").val().toString().trim())) {
        if ($("#email").hasClass("is-invalid"))
          $("#email").removeClass("is-invalid");
      } else {
        if (!$("#email").hasClass("is-invalid"))
          $("#email").addClass("is-invalid");
      }
    });
  };
  const isValidPwdSyntax = (
    compare1: RegExp,
    compare2: RegExp,
    syntax: boolean
  ) => {
    $("#password").on("input", () => {
      if (
        compare1.test($("#password").val().toString()) &&
        compare2.test($("#password").val().toString())
      ) {
        if (syntax) $("#pass").html("");
        else {
          $("#pass").html(
            "Enter a valid password- see the information icon for guidance"
          );
          if ($("#password").hasClass("is-invalid"))
            $("#password").removeClass("is-invalid");
        }
      } else {
        if (!$("#password").hasClass("is-invalid"))
          $("#password").addClass("is-invalid");
      }
    });
  };

  const findInvalid = () => {
    $(document).ready(function () {
      let tempElement: string;

      if ($(".is-invalid").length > 0)
        tempElement = $(".is-invalid").first().attr("id").toString();

      if ($(`#${tempElement}`).hasClass("form-control"))
        $(`#${tempElement}`).focus();
      else $(`#${tempElement} input`).first().focus();
    });
  };

  let emailCheck = (email: string) => {
    let emailValidation: boolean = true;
    if ($("#email").hasClass("is-invalid"))
      $("#email").removeClass("is-invalid");

    switch (emailValidation) {
      case email.trim().length === 0:
        emailValidation = false;
        setEmailInvMes("length");
        $("#eml").html("Enter your email");
        $("#email").addClass("is-invalid");
        break;
      case !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()):
        emailValidation = false;
        setEmailInvMes("syntax");
        $("#email").val(email.trim());
        $("#eml").html(
          "Enter a valid email address- see the information icon for guidance"
        );
        $("#email").addClass("is-invalid");
        break;
      default:
        $("#email").val(email.trim());
        setEmailInvMes("");
        break;
    }

    return emailValidation;
  };

  let pwdCheck = (password: string) => {
    let pwdValidation: boolean = true;
    if ($("#password").hasClass("is-invalid"))
      $("#password").removeClass("is-invalid");

    if ($("#password2").hasClass("is-invalid"))
      $("#password2").removeClass("is-invalid");

    switch (pwdValidation) {
      case password.length === 0:
        pwdValidation = false;
        setPass1InvMes("length");
        $("#pass").html("Enter your password");
        $("#password").addClass("is-invalid");
        break;
      case !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_\-])(?=.{8,})/.test(
        password
      ):
        pwdValidation = false;
        setPass1InvMes("syntax");
        $("#pass").html(
          "Enter a valid password- see the information icon for guidance"
        );
        $("#password").addClass("is-invalid");
        break;
      case !/^\S*$/.test(password):
        pwdValidation = false;
        setPass1InvMes("syntax");
        $("#pass").html(
          "Enter a valid password- see the information icon for guidance"
        );
        $("#password").addClass("is-invalid");
        break;
      default:
        setPass1InvMes("");
        break;
    }

    return pwdValidation;
  };
  let pwdCheckMatch = (password1: string, password2: string) => {
    let pwdValidation: boolean = true;

    if ($("#password2").hasClass("is-invalid"))
      $("#password2").removeClass("is-invalid");

    switch (pwdValidation) {
      case password2.length === 0:
        pwdValidation = false;
        setPass2InvMes("length");
        $("#pass2").html("Type your password again");
        $("#password2").addClass("is-invalid");
        break;
      case password1 !== password2:
        if ($("#password").hasClass("is-invalid"))
          $("#password").removeClass("is-invalid");
        pwdValidation = false;
        setPass2InvMes("match");
        $("#pass2").html("Passwords must match");
        $("#password").addClass("is-invalid");
        $("#password2").addClass("is-invalid");
        break;
      default:
        setPass2InvMes("");
        break;
    }

    return pwdValidation;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    let email: boolean = emailCheck($("#email").val().toString());

    let password1: boolean = pwdCheck($("#password").val().toString());

    let password2: boolean = true;

    if ($("#password").val().toString().length > 0)
      password2 = pwdCheckMatch(
        $("#password").val().toString(),
        $("#password2").val().toString()
      );

    let role: boolean = true;

    if (roleOption.value.length === 0) {
      selectValid(false);
      role = false;
    }

    if (!email || !password1 || !password2 || !role) findInvalid();
    else postFunc();
  };

  let registerForm = () => {
    let form = $(`#register_form`).serializeArray();
    let formData: any = {};
    formData.email = form[0].value;
    formData.password = form[1].value;
    formData.role = roleOption.label;
    return formData;
  };
  let selectRoleChange = (newOptions: { value: string; label: string }) => {
    if ($("#roles").hasClass("is-invalid")) {
      if (newOptions !== null) selectValid(true);
      else selectValid(false);
    }
    setRoleOptions(newOptions);
  };
  let postFunc = async () => {
    let formData: any = registerForm();
    try {
      let result: any = await json(`/auth/register`, `POST`, formData);
      if (result) {
        SetAccessToken(result.token, {
          userid: result.userid,
          role: result.role,
        });
        if (result.role !== null) {
          props.history.replace({
            pathname: "/",
            state: {
              heading: "Welcome!",
              body:
                "Congratulations! You have successfully created an account with Blog Away! Welcome to the Family!",
            },
          });
        }
      } else {
        $("#eml").html("An account associated with this email already exists!");

        if ($("#email").hasClass("is-invalid"))
          $("#email").removeClass("is-invalid");

        $("#email").addClass("is-invalid");

        $("#email").focus();
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
        id={"register_form"}
        className={"m-0 w-100"}
      >
        <Row className={"w-100 mx-0 mb-1"}>
          <Col xs={12} className={"text-wrap w-100"}>
            <Form.Text className={"font-italic small  m-0"}>
              <Link
                key={link}
                to={{ pathname: `/login`, state: { prevPath: link } }}
                style={{ color: "hotpink" }}
              >
                Already have an Account? Login Here!
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
            <Form.Control.Feedback
              id="pass"
              className={"text-left"}
              type="invalid"
            ></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className={"w-100 justify-content-center mx-0 my-5"}>
          <Form.Group className={"my-2 col-12 col-md-10"}>
            <Form.Label className={"required"}>
              <b>Confirm Password</b>
              <OverlayTrigger
                placement="right-end"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipPwdConfirm}
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
              name={"password2"}
              className={"shadow-sm"}
              id={"password2"}
            />
            <Form.Check
              type="checkbox"
              id="shw_pas"
              label="Show Passwords"
              className={"font-italic small text-left text-dark my-2"}
            />
            <Form.Control.Feedback
              id="pass2"
              className={"text-left"}
              type="invalid"
            ></Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className={"w-100 justify-content-center mb-0 mx-0 my-5"}>
          <Form.Group className={"my-2 col-12 col-md-10"}>
            <Form.Label className={"required"}>
              <b>Role</b>
              <OverlayTrigger
                placement="right-end"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipRole}
              >
                <FontAwesomeIcon
                  className={"ml-2"}
                  size={"sm"}
                  icon={["fas", "info-circle"]}
                />
              </OverlayTrigger>
            </Form.Label>
            <Select
              id="roles"
              key={"rolez"}
              options={[
                { value: "1", label: "member" },
                { value: "2", label: "admin" },
              ]}
              onChange={selectRoleChange}
              className={"text-left border-0"}
              onBlur={() => {
                rolesValidationColors("#ced4da");
              }}
              onFocus={() => {
                rolesValidationColors("#80bdff");
              }}
              placeholder={"Please Select a Role"}
            />
            <Form.Control.Feedback
              id={"_roles"}
              className={"text-left"}
              type="invalid"
            >
              A role must be selected
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
                Register
              </Button>
            </div>
          </Row>
        </footer>
      </Form>
    </Jumbotron>
  );
};

export default Register;
