
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartPie, faCog, faFileAlt, faClipboardList, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox, faRocket, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/ubec_new.png";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center border-0">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
      noBgOnHover = false, 
    } = props;
  
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };
  
    const hoverClass = noBgOnHover ? "no-bg-hover" : "";
  
    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={`${classNames} border-0 ${hoverClass}`}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={30} height={30} className="sidebar-icon svg-icon" /> : null}
            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };
  

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="white" className=" bg-tertiary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
        <FontAwesomeIcon icon={faGripLines} />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-tertiary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src='https://www.google.com/imgres?q=man%20face&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fclose-up-upset-american-black-person_23-2148749582.jpg%3Fsemt%3Dais_hybrid%26w%3D740&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fafrican-man-face&docid=cinjPinuHW-klM&tbnid=8RrSPdDEdlaEtM&vet=12ahUKEwjrqNKxh8SNAxVqLPsDHf5xBv4QM3oECGkQAA..i&w=740&h=1110&hcb=2&ved=2ahUKEwjrqNKxh8SNAxVqLPsDHf5xBv4QM3oECGkQAA' className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, sanni</h6>
                  
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="UBEC" noBgOnHover link={'#'} image="https://ubec.gov.ng/wp-content/uploads/2021/06/ubec_new.png" />

              <NavItem title="Dashboard" link={Routes.DashboardOverview.path} icon={faChartPie} />
              <NavItem title="Projects" icon={faClipboardList} link={Routes.Transactions.path} />
              <NavItem title="Add Project" icon={faPlusSquare} link={Routes.Settings.path} />

              <CollapsableNavItem eventKey="examples/" title="Authentication" icon={faFileAlt}>
                <NavItem title=" Add User" link={Routes.Signup.path} />

              </CollapsableNavItem>
              <NavItem title="Log Out" icon={faPlusSquare} link={Routes.Signin.path} />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
