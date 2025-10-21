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
              <OrderList />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <ProductList />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <CustomerList />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <RefundOrderList />
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
