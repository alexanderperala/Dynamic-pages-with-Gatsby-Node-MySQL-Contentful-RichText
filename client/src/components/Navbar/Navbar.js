import React from "react";
import { Link } from "gatsby";
import * as styles from "./navbar.module.css";
import { GatsbyImage } from "gatsby-plugin-image";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

const Navigationbar = ({ data }) => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
            <GatsbyImage
              className={styles.navbarLogo}
              image={data.logoType.gatsbyImageData} target
              alt="logotype"
            />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto align-items-center">
              <Link className={styles.menuItem} to={`/`}>
                Hem
              </Link>
              {data.navbarItems.map(menuItem => (
                <div key={menuItem.contentful_id}>
                  {!menuItem.subMenuObjects ? (
                    <Link
                      className={styles.menuItem}
                      to={`/${menuItem.page.slug}`}
                      key={menuItem.contentful_id}
                    >
                      {menuItem.label}
                    </Link>
                  ) : (
                    <NavDropdown
                      className={styles.menuItem}
                      title={menuItem.label}
                      id="basic-nav-dropdown"
                    >
                      {menuItem.subMenuObjects?.map((subMenuItem, index) => (
                        <Link
                          className={`${styles.menuItem} ${styles.subItem}`}
                          to={`/${subMenuItem.page.slug}`}
                          key={index}
                        >
                          {subMenuItem.label}
                        </Link>
                      ))}
                    </NavDropdown>
                  )}
                </div>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
