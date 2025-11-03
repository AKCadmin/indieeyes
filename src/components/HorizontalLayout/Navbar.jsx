import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../Common/withRouter";
import classname from "classnames";

//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";

const Navbar = (props) => {
  const [dashboard, setdashboard] = useState(false);
  const [ui, setui] = useState(false);
  const [app, setapp] = useState(false);
  const [email, setemail] = useState(false);
  const [ecommerce, setecommerce] = useState(false);
  const [crypto, setcrypto] = useState(false);
  const [project, setproject] = useState(false);
  const [task, settask] = useState(false);
  const [contact, setcontact] = useState(false);
  const [blog, setBlog] = useState(false);
  const [job, setJob] = useState(false);
  const [candidate, setCandidate] = useState(false);
  const [component, setcomponent] = useState(false);
  const [form, setform] = useState(false);
  const [table, settable] = useState(false);
  const [chart, setchart] = useState(false);
  const [icon, seticon] = useState(false);
  const [map, setmap] = useState(false);
  const [extra, setextra] = useState(false);
  const [invoice, setinvoice] = useState(false);
  const [auth, setauth] = useState(false);
  const [utility, setutility] = useState(false);

  useEffect(() => {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (window.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link  arrow-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setdashboard(!dashboard);
                    }}
                    to="/dashboard"
                  >
                    <i className="bx bx-home-circle me-2"></i>
                    {props.t("Dashboard")} {props.menuOpen}
                    <div className="arrow-down"></div>
                  </Link>
                </li>

                {/* New Menu Items */}
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                  <Link to="/address" className="nav-link">Address</Link>
                </li>
                <li className="nav-item">
                  <Link to="/banner" className="nav-link">Banner</Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link to="/colors" className="nav-link">Colors</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact-us" className="nav-link">Contact Us</Link>
                </li>
                <li className="nav-item">
                  <Link to="/coupon" className="nav-link">Coupon</Link>
                </li>
                <li className="nav-item">
                  <Link to="/dimension" className="nav-link">Dimension</Link>
                </li>
                <li className="nav-item">
                  <Link to="/frame-width" className="nav-link">Frame Width</Link>
                </li>
                <li className="nav-item">
                  <Link to="/gender" className="nav-link">Gender</Link>
                </li>
                <li className="nav-item">
                  <Link to="/lens-material" className="nav-link">Lens Material</Link>
                </li>
                <li className="nav-item">
                  <Link to="/lens-pack" className="nav-link">Lens Pack</Link>
                </li>
                <li className="nav-item">
                  <Link to="/lens-tint" className="nav-link">Lens Tint</Link>
                </li>
                <li className="nav-item">
                  <Link to="/lens-type" className="nav-link">Lens Type</Link>
                </li>
                <li className="nav-item">
                  <Link to="/material" className="nav-link">Material</Link>
                </li>
                <li className="nav-item">
                  <Link to="/membership" className="nav-link">Membership</Link>
                </li>
                <li className="nav-item">
                  <Link to="/membership-plan" className="nav-link">Membership Plan</Link>
                </li>
                <li className="nav-item">
                  <Link to="/order" className="nav-link">Order</Link>
                </li>
                <li className="nav-item">
                  <Link to="/payment" className="nav-link">Payment</Link>
                </li>
                <li className="nav-item">
                  <Link to="/power" className="nav-link">Power</Link>
                </li>
                <li className="nav-item">
                  <Link to="/prescription-type" className="nav-link">Prescription Type</Link>
                </li>
                <li className="nav-item">
                  <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
                </li>
                <li className="nav-item">
                  <Link to="/product" className="nav-link">Product</Link>
                </li>
                <li className="nav-item">
                  <Link to="/product-type" className="nav-link">Product Type</Link>
                </li>
                <li className="nav-item">
                  <Link to="/rating-review" className="nav-link">Rating-Review</Link>
                </li>
                <li className="nav-item">
                  <Link to="/return-policy" className="nav-link">Return Policy</Link>
                </li>
                <li className="nav-item">
                  <Link to="/shape" className="nav-link">Shape</Link>
                </li>
                <li className="nav-item">
                  <Link to="/shiprocket" className="nav-link">Shiprocket</Link>
                </li>
                <li className="nav-item">
                  <Link to="/term" className="nav-link">Term</Link>
                </li>
                <li className="nav-item">
                  <Link to="/user" className="nav-link">User</Link>
                </li>
                <li className="nav-item">
                  <Link to="/weight-group" className="nav-link">Weight Group</Link>
                </li>
                <li className="nav-item">
                  <Link to="/wishlist" className="nav-link">Wishlist</Link>
                </li>
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
);
