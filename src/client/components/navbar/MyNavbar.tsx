import * as React from "react";
import {useLayoutEffect, useState} from "react";
import * as $ from "jquery";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import MyLinks from "./MyLinks";
import {RouteComponentProps} from "react-router-dom";

interface NavbarProps extends RouteComponentProps<any> {}

const MyNavbar: React.FC<NavbarProps> = (props) => {
  const MAX_WIDTH: number = 991.98;
  const [size, setSize] = useState<boolean | undefined>();

  useLayoutEffect(() => {
    if (window.innerWidth >= MAX_WIDTH) setSize(true);
    else setSize(false);
  }, []);

  $(document).ready(function () {
    $(window).resize(function () {
      if ($(this).width() >= MAX_WIDTH) setSize(true);
      else setSize(false);
    });
  });

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand>Blog Away</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            id="main-nav"
            className={
              size
                ? localStorage.getItem("token") !== null
                  ? localStorage.getItem("role") === "admin"
                    ? "ml-auto nav-width d-flex justify-content-between"
                    : "ml-auto w-75 d-flex justify-content-between"
                  : "ml-auto nav-width d-flex justify-content-between"
                : "mx-auto w-100 text-center mx-5 my-3  border border-white rounded mb-2"
            }
          >
            <MyLinks
              size_obj={size}
              history={props.history}
              location={props.location}
              match={props.match}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;
