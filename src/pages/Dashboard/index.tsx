import PropTypes from "prop-types";
import React from "react";
import { Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";

//redux
import ProductList from "./ProductList";
import CustomerList from "./CustomerList";
import OrderList from "./OrderList";
import RefundOrderList from "./RefundOrderList";

const Dashboard = (props) => {
  //meta title
  document.title = "Dashboard | Skote - Vite React Admin & Dashboard Template";

  const [filterType, setFilterType] = React.useState("all");

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col lg="12">
              <div className="d-flex flex-wrap gap-2 justify-content-md-end mb-3">
                <div className="btn-group">
                  <button
                    type="button"
                    className={`btn ${
                      filterType === "all" ? "btn-primary" : "btn-dark"
                    }`}
                    onClick={() => setFilterType("all")}
                  >
                    <i className="bx bx-globe me-1"></i>
                    All Time
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      filterType === "week" ? "btn-primary" : "btn-dark"
                    }`}
                    onClick={() => setFilterType("week")}
                  >
                    <i className="bx bx-calendar me-1"></i>
                    Week
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      filterType === "month" ? "btn-primary" : "btn-dark"
                    }`}
                    onClick={() => setFilterType("month")}
                  >
                    <i className="bx bx-calendar-check me-1"></i>
                    Month
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      filterType === "year" ? "btn-primary" : "btn-dark"
                    }`}
                    onClick={() => setFilterType("year")}
                  >
                    <i className="bx bx-calendar-event me-1"></i>
                    Year
                  </button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <OrderList filterType={filterType} />
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <ProductList filterType={filterType} />
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <CustomerList filterType={filterType} />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <RefundOrderList filterType={filterType} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
   
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
