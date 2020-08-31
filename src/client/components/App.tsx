import * as React from "react";

import MyNavbar from "./navbar/MyNavbar";
import Footer from "./footer/Footer";
import NewBlog from "./blog_maker/NewBlog";
import AllBlogs from "./blog_maker/AllBlogs";
import ViewBlog from "./view_blog/ViewBlog";
import Login from "./login/Login";
import Register from "./register/Register";
import Container from "react-bootstrap/Container";
import {Elements, StripeProvider} from "react-stripe-elements";
import Row from "react-bootstrap/Row";

import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import About from "./special_pages/About";
import Contact from './contact/Contact';
import PageNotFound from "./special_pages/PageNotFound";
import Donation from "./donation/Donation";

export interface AppProps {}

export interface Blog {
  id: string;
  title: string;
  img_src: string;
  content: string;
  authorid: string;
  name: string;
  tags: [{ label: string; value: string }];
  _created: string;
}

const App: React.FC<AppProps> = (props) => {
  return (
    <>
      <Router>
        <Switch>
          {["/"].map((path: string) => (
            <Route
              exact
              path={path}
              key={path}
              render={(props) => (
                <>
                  <MyNavbar
                    history={props.history}
                    location={props.location}
                    match={props.match}
                  />
                  <AllBlogs
                    history={props.history}
                    location={props.location}
                    match={props.match}
                  />
                  <Footer />
                </>
              )}
            />
          ))}
          {["/:id/view", "/login"].map((path: string) => (
            <Route
              exact
              path={path}
              key={path}
              render={(props) => (
                <>
                  <MyNavbar
                    history={props.history}
                    location={props.location}
                    match={props.match}
                  />
                  <Container
                    className={
                      "d-flex justify-content-center px-1 mt-5 min-vh-100"
                    }
                    fluid
                  >
                    {path.includes("/login") ? (
                      localStorage.getItem("token") === null ? (
                        <Login
                          key={path}
                          history={props.history}
                          location={props.location}
                          match={props.match}
                        />
                      ) : (
                        <Redirect
                          to={{ pathname: "/", state: { rendered: true } }}
                        />
                      )
                    ) : (
                      <ViewBlog
                        key={path}
                        history={props.history}
                        location={props.location}
                        match={props.match}
                      />
                    )}
                  </Container>
                  <Footer />
                </>
              )}
            />
          ))}
          {["/about"].map((path: string) => (
            <Route
              exact
              path={path}
              key={path}
              render={(props) => (
                <>
                  <MyNavbar
                    history={props.history}
                    location={props.location}
                    match={props.match}
                  />
                  <Container
                    className={
                      "d-flex justify-content-center align-items-center px-5 text-center min-vh-100"
                    }
                    fluid
                  >
                    <div>
                      <About
                        history={props.history}
                        location={props.location}
                        match={props.match}
                      />
                    </div>
                  </Container>
                  <Footer />
                </>
              )}
            />
          ))}
            <Route
                exact
                path={"/donations"}
                key={"/donations"}
                render={(props) => (
                            <>
                                <MyNavbar
                                    history={props.history}
                                    location={props.location}
                                    match={props.match}
                                />
                                <Container
                                    className={
                                        "d-flex justify-content-center px-1 mt-5 min-vh-100"
                                    }
                                    fluid
                                >
                                    <StripeProvider apiKey={process.env.STRIPE_PUB}>
                                        <Elements>
                                   <Donation
                                       history={props.history}
                                       location={props.location}
                                       match={props.match}
                                   />
                                        </Elements>
                                    </StripeProvider>
                                </Container>
                                <Footer />
                            </>

                )}
            />
          <Route
            exact
            path={"/register"}
            key={"/register"}
            render={(props) => (
              <>
                {localStorage.getItem("token") === null ? (
                  <>
                    <MyNavbar
                      history={props.history}
                      location={props.location}
                      match={props.match}
                    />
                    <Container
                      className={
                        "d-flex justify-content-center px-1 mt-5 min-vh-100"
                      }
                      fluid
                    >
                      <Register
                        key={"/register"}
                        history={props.history}
                        location={props.location}
                        match={props.match}
                      />
                    </Container>
                    <Footer />
                  </>
                ) : (
                  <Redirect to={{ pathname: "/", state: { rendered: true } }} />
                )}
              </>
            )}
          />
            <Route
                exact
                path={"/contact"}
                key={"/contact"}
                render={(props) => (
                    <>

                                    <MyNavbar
                                        history={props.history}
                                        location={props.location}
                                        match={props.match}
                                    />
                                    <Container
                                        className={
                                            "d-flex justify-content-center px-1 mt-5 min-vh-100"
                                        }
                                        fluid
                                    >
                                        <Contact
                                            key={"/contact"}
                                            history={props.history}
                                            location={props.location}
                                            match={props.match}
                                        />
                                    </Container>
                                    <Footer />
                                </>
                    )}
                            />
          {["/admin", "/:id/edit"].map((path) => (
            <Route
              exact
              path={path}
              key={path}
              render={(props) => (
                <>
                  <MyNavbar
                    history={props.history}
                    location={props.location}
                    match={props.match}
                  />
                  {localStorage.getItem("token") !== null ? (
                    <Container
                      className={
                        "d-flex justify-content-center px-1 min-vh-100"
                      }
                      fluid
                    >
                      <Row
                        className={
                          "justify-content-center align-self-center px-0 w-100 row-size py-5 mt-5"
                        }
                      >
                        <NewBlog
                          history={props.history}
                          location={props.location}
                          match={props.match}
                        />
                      </Row>
                    </Container>
                  ) : (
                    <Redirect
                      to={{
                        pathname: `/login`,
                        state: { prevPath: location.pathname },
                      }}
                    />
                  )}
                  <Footer />
                </>
              )}
            />
          ))}
          <Route
            key={"pgnotfound"}
            render={(props) => (
              <>
                <MyNavbar
                  history={props.history}
                  location={props.location}
                  match={props.match}
                />
                <Container
                  className={
                    "d-flex justify-content-center align-items-center px-5 text-center min-vh-100"
                  }
                  fluid
                >
                  <div>
                    <PageNotFound
                      history={props.history}
                      location={props.location}
                      match={props.match}
                    />
                  </div>
                </Container>
                <Footer />
              </>
            )}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
