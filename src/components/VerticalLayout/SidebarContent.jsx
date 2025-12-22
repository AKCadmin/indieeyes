import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { Link, useLocation } from "react-router-dom";
import withRouter from "../Common/withRouter";

//i18n
import { withTranslation } from "react-i18next";
import { useCallback } from "react";

const SidebarContent = (props) => {
  const ref = useRef();
  const path = useLocation();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  // useEffect(() => {
  //   new MetisMenu("#side-menu");
  //   activeMenu();
  // }, []);
  useEffect(() => {
    const metisMenu = new MetisMenu("#side-menu");
    activeMenu();

    // Cleanup on component unmount
    return () => {
      metisMenu.dispose();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>{props.t("Products")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/product-type">Product Types</Link></li>
                <li><Link to="/colors">Colors</Link></li>
                <li><Link to="/material">Materials</Link></li>
                <li><Link to="/shape">Shapes</Link></li>
                <li><Link to="/frame-width">Frame Width</Link></li>
                <li><Link to="/dimension">Dimensions</Link></li>
                <li><Link to="/weight-group">Weight Groups</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/inventory">
                <i className="bx bx-package"></i>
                <span>{props.t("Inventory")}</span>
              </Link>
            </li>

            <li>
              <Link to="/" className="has-arrow">
                <i className="bx bx-glasses"></i>
                <span>{props.t("Lens")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/lens-material">Lens Material</Link></li>
                <li><Link to="/lens-pack">Lens Pack</Link></li>
                <li><Link to="/lens-tint">Lens Tint</Link></li>
                <li><Link to="/lens-type">Lens Type</Link></li>
                <li><Link to="/power">Power</Link></li>
                <li><Link to="/prescription-type">Prescription Type</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/" className="has-arrow">
                <i className="bx bx-shopping-bag"></i>
                <span>{props.t("Orders")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/order">Orders</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/payment">Payments</Link></li>
                <li><Link to="/shiprocket">Shiprocket</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/" className="has-arrow">
                <i className="bx bx-user-circle"></i>
                <span>{props.t("Users")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/user">Users</Link></li>
                <li><Link to="/address">Addresses</Link></li>
                <li><Link to="/membership">Membership</Link></li>
                <li><Link to="/membership-plan">Membership Plans</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/" className="has-arrow">
                <i className="bx bx-file"></i>
                <span>{props.t("Content")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/banner">Banners</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/return-policy">Return Policy</Link></li>
                <li><Link to="/term">Terms</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/" className="has-arrow">
                <i className="bx bx-gift"></i>
                <span>{props.t("Offers")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li><Link to="/coupon">Coupons</Link></li>
                <li><Link to="/rating-review">Ratings & Reviews</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
