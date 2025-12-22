// @ts-nocheck
import React from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import ReturnProductsList from "./ReturnProductsList";

const ReturnProducts = () => {
  document.title = "Return Products (QC Pending) | Dashboard";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs 
            title="Return Products" 
            breadcrumbItem="Return Products" 
          />

          <Row>
            <Col lg="12">
              <ReturnProductsList />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReturnProducts;
