import * as React from "react";
import {useEffect, useState} from "react";
import SignOut from "../modal/SignOut";
import {Link, RouteComponentProps} from "react-router-dom";

import Nav from "react-bootstrap/Nav";

interface LinksProps extends RouteComponentProps<any> {
  size_obj: boolean;
}

const MyLinks: React.FC<LinksProps> = (props) => {
  const [click1, setClick1] = useState<boolean>(false);
  const [click2, setClick2] = useState<boolean>(false);
  const [click3, setClick3] = useState<boolean>(false);
  const [click4, setClick4] = useState<boolean>(false);
  const [click5, setClick5] = useState<boolean>(false);
  const [click6, setClick6] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    switch (props.location.pathname) {
      case "/about":
        setClick1(false);
        setClick2(true);
        setClick3(false);
        setClick4(false);
        setClick5(false);
        setClick6(false);
        break;
      case "/login":
        setClick1(false);
        setClick2(false);
        setClick3(true);
        setClick4(false);
        setClick5(false);
        setClick6(false);
        break;
      case "/admin":
        setClick1(false);
        setClick2(false);
        setClick3(true);
        setClick4(false);
        setClick5(false);
        setClick6(false);
        break;
      case "/register":
        setClick1(false);
        setClick2(false);
        setClick3(false);
        setClick4(true);
        setClick5(false);
        setClick6(false);
        break;
      case "/donations":
        setClick1(false);
        setClick2(false);
        setClick3(false);
        setClick4(false);
        setClick5(true);
        setClick6(false);
        break;
      case "/contact":
        setClick1(false);
        setClick2(false);
        setClick3(false);
        setClick4(false);
        setClick5(false);
        setClick6(true);
        break;
      default:
        setClick1(true);
        setClick2(false);
        setClick3(false);
        setClick4(false);
        setClick5(false);
        setClick6(false);
        break;
    }
  }, []);
  return (
    <>
      <Nav.Link
        as={Link}
        to={{ pathname: "/", state: { prevPath: props.location.pathname } }}
        className={
          props.size_obj
            ? click1
              ? "nav-active-color small"
              : "nav-color small"
            : click1
            ? "nav-active-color border border-white mx-3 my-3"
            : "nav-color border border-white mx-3 my-3"
        }
        eventKey="1"
      >
        Home
      </Nav.Link>

      <Nav.Link
        as={Link}
        to={{
          pathname: "/about",
          state: { prevPath: props.location.pathname },
        }}
        eventKey="2"
        className={
          props.size_obj
            ? click2
              ? "nav-active-color small"
              : "nav-color small"
            : click2
            ? "nav-active-color border border-white mx-3 my-3"
            : "nav-color border border-white mx-3 my-3"
        }
      >
        About
      </Nav.Link>
      <Nav.Link
          as={Link}
          to={{
            pathname: "/contact",
            state: { prevPath: props.location.pathname },
          }}
          eventKey="6"
          className={
            props.size_obj
                ? click6
                ? "nav-active-color small"
                : "nav-color small"
                : click6
                ? "nav-active-color border border-white mx-3 my-3"
                : "nav-color border border-white mx-3 my-3"
          }
      >
        Contact
      </Nav.Link>
      <Nav.Link
          as={Link}
          to={{ pathname: "/donations", state: { prevPath: props.location.pathname } }}
          className={
            props.size_obj
                ? click5
                ? "nav-active-color small"
                : "nav-color small"
                : click5
                ? "nav-active-color border border-white mx-3 my-3"
                : "nav-color border border-white mx-3 my-3"
          }
          eventKey="5"
      >
        Donations
      </Nav.Link>

      {localStorage.getItem("token") !== null ? (
        localStorage.getItem("role") === "member" ? null : (
          <Nav.Link
            as={Link}
            className={
              props.size_obj
                ? click3
                  ? "nav-active-color small"
                  : "nav-color small"
                : click3
                ? "nav-active-color border border-white mx-3 my-3"
                : "nav-color border border-white mx-3 my-3"
            }
            to={{
              pathname: "/admin",
              state: { prevPath: props.location.pathname },
            }}
            eventKey="3"
          >
            Admin Management
          </Nav.Link>
        )
      ) : (
        <Nav.Link
          as={Link}
          className={
            props.size_obj
              ? click3
                ? "nav-active-color small"
                : "nav-color small"
              : click3
              ? "nav-active-color border border-white mx-3 my-3"
              : "nav-color border border-white mx-3 my-3"
          }
          to={{
            pathname: "/login",
            state: { prevPath: props.location.pathname },
          }}
          eventKey="3"
        >
          Login
        </Nav.Link>
      )}
      {localStorage.getItem("token") !== null ? (
        <Nav.Link
          as={Link}
          className={
            props.size_obj
              ? "nav-color"
              : "nav-color border border-white mx-3 my-3"
          }
          to={{ pathname: props.location.pathname, state: {} }}
          onClick={handleShow}
          eventKey="4"
        >
          Sign Out
        </Nav.Link>
      ) : (
        <Nav.Link
          as={Link}
          className={
            props.size_obj
              ? click4
                ? "nav-active-color small"
                : "nav-color small"
              : click4
              ? "nav-active-color border border-white mx-3 my-3"
              : "nav-color border border-white mx-3 my-3"
          }
          to={{
            pathname: "/register",
            state: { prevPath: props.location.pathname },
          }}
          eventKey="4"
        >
          Register
        </Nav.Link>
      )}

      <SignOut
        open_mod={show}
        close_func={handleClose}
        show_func={handleShow}
        location={props.location}
        match={props.match}
        history={props.history}
      />
    </>
  );
};

export default MyLinks;
