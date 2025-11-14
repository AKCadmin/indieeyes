import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const AddCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    active: false,
    min_order_value: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/coupon");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <Button color="secondary" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left me-2"></i> Back
              </Button>
            </Col>
          </Row>
          <Breadcrumbs title="Coupons" breadcrumbItem={isEdit ? "Edit Coupon" : "Add Coupon"} />

          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="code">Coupon Code</Label>
                      <Input
                        type="text"
                        id="code"
                        value={formData.code}
                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        type="number"
                        id="amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup check className="mb-3">
                      <Input
                        type="checkbox"
                        id="active"
                        checked={formData.active}
                        onChange={(e) => setFormData({...formData, active: e.target.checked})}
                      />
                      <Label check htmlFor="active">Active</Label>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="min_order_value">Minimum Order Value</Label>
                      <Input
                        type="number"
                        id="min_order_value"
                        value={formData.min_order_value}
                        onChange={(e) => setFormData({...formData, min_order_value: e.target.value})}
                      />
                    </FormGroup>

                    <div className="d-flex gap-3">
                      <Button type="submit" color="primary">
                        {isEdit ? "Update" : "Save"}
                      </Button>
                      <Button type="button" color="secondary" onClick={() => navigate("/coupon")}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddCoupon;
