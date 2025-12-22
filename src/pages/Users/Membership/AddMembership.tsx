import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const AddMembership = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    user: "",
    start_date: "",
    end_date: "",
    auto_renew: false,
    membership_plan: "",
    amount_paid: "",
    comments: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/membership");
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
          <Breadcrumbs
            title="Membership"
            breadcrumbItem={isEdit ? "Edit Membership" : "Add Membership"}
          />

          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="user">User</Label>
                      <Input
                        type="select"
                        id="user"
                        value={formData.user}
                        onChange={(e) => setFormData({...formData, user: e.target.value})}
                      >
                        <option value="">Select User</option>
                        <option value="1">John Doe</option>
                        <option value="2">Jane Smith</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input
                        type="date"
                        id="start_date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="end_date">End Date</Label>
                      <Input
                        type="date"
                        id="end_date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup check className="mb-3">
                      <Input
                        type="checkbox"
                        id="auto_renew"
                        checked={formData.auto_renew}
                        onChange={(e) => setFormData({...formData, auto_renew: e.target.checked})}
                      />
                      <Label check htmlFor="auto_renew">Auto Renew</Label>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="membership_plan">Membership Plan</Label>
                      <Input
                        type="select"
                        id="membership_plan"
                        value={formData.membership_plan}
                        onChange={(e) => setFormData({...formData, membership_plan: e.target.value})}
                      >
                        <option value="">Select Plan</option>
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="amount_paid">Amount Paid</Label>
                      <Input
                        type="number"
                        id="amount_paid"
                        value={formData.amount_paid}
                        onChange={(e) => setFormData({...formData, amount_paid: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="comments">Comments</Label>
                      <Input
                        type="textarea"
                        id="comments"
                        value={formData.comments}
                        onChange={(e) => setFormData({...formData, comments: e.target.value})}
                      />
                    </FormGroup>

                    <div className="d-flex gap-3">
                      <Button type="submit" color="primary">
                        {isEdit ? "Update" : "Save"}
                      </Button>
                      <Button type="button" color="secondary" onClick={() => navigate("/membership")}>
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

export default AddMembership;
