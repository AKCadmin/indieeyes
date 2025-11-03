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
                <span>{props.t("Dashboards")}</span>
              </Link>
            </li>

            {/* New Menu Items */}
            <li>
              <Link to="/about"><i className="bx bx-info-circle"></i> About</Link>
            </li>
            <li>
              <Link to="/address"><i className="bx bx-map"></i> Address</Link>
            </li>
            <li>
              <Link to="/banner"><i className="bx bx-image"></i> Banner</Link>
            </li>
            <li>
              <Link to="/cart"><i className="bx bx-cart"></i> Cart</Link>
            </li>
            <li>
              <Link to="/colors"><i className="bx bx-palette"></i> Colors</Link>
            </li>
            <li>
              <Link to="/contact-us"><i className="bx bx-envelope"></i> Contact Us</Link>
            </li>
            <li>
              <Link to="/coupon"><i className="bx bx-gift"></i> Coupon</Link>
            </li>
            <li>
              <Link to="/dimension"><i className="bx bx-cube"></i> Dimension</Link>
            </li>
            <li>
              <Link to="/frame-width"><i className="bx bx-ruler"></i> Frame Width</Link>
            </li>
            <li>
              <Link to="/gender"><i className="bx bx-male-female"></i> Gender</Link>
            </li>
            <li>
              <Link to="/lens-material"><i className="bx bx-glasses-alt"></i> Lens Material</Link>
            </li>
            <li>
              <Link to="/lens-pack"><i className="bx bx-package"></i> Lens Pack</Link>
            </li>
            <li>
              <Link to="/lens-tint"><i className="bx bx-paint"></i> Lens Tint</Link>
            </li>
            <li>
              <Link to="/lens-type"><i className="bx bx-glasses"></i> Lens Type</Link>
            </li>
            <li>
              <Link to="/material"><i className="bx bx-layer"></i> Material</Link>
            </li>
            <li>
              <Link to="/membership"><i className="bx bx-id-card"></i> Membership</Link>
            </li>
            <li>
              <Link to="/membership-plan"><i className="bx bx-list-plus"></i> Membership Plan</Link>
            </li>
            <li>
              <Link to="/order"><i className="bx bx-shopping-bag"></i> Order</Link>
            </li>
            <li>
              <Link to="/payment"><i className="bx bx-money"></i> Payment</Link>
            </li>
            <li>
              <Link to="/power"><i className="bx bx-bulb"></i> Power</Link>
            </li>
            <li>
              <Link to="/prescription-type"><i className="bx bx-file"></i> Prescription Type</Link>
            </li>
            <li>
              <Link to="/privacy-policy"><i className="bx bx-lock"></i> Privacy Policy</Link>
            </li>
            <li>
              <Link to="/product"><i className="bx bx-store"></i> Product</Link>
            </li>
            <li>
              <Link to="/product-type"><i className="bx bx-purchase-tag"></i> Product Type</Link>
            </li>
            <li>
              <Link to="/rating-review"><i className="bx bx-star"></i> Rating-Review</Link>
            </li>
            <li>
              <Link to="/return-policy"><i className="bx bx-revision"></i> Return Policy</Link>
            </li>
            <li>
              <Link to="/shape"><i className="bx bx-shape-circle"></i> Shape</Link>
            </li>
            <li>
              <Link to="/shiprocket"><i className="bx bx-rocket"></i> Shiprocket</Link>
            </li>
            <li>
              <Link to="/term"><i className="bx bx-file-blank"></i> Term</Link>
            </li>
            <li>
              <Link to="/user"><i className="bx bx-user"></i> User</Link>
            </li>
            <li>
              <Link to="/weight-group"><i className="bx bx-dumbbell"></i> Weight Group</Link>
            </li>
            <li>
              <Link to="/wishlist"><i className="bx bx-heart"></i> Wishlist</Link>
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
