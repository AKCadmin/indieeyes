import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Editor } from "@tinymce/tinymce-react";

const AddMembershipPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    renewal_price: "",
    duration: "",
    discounted_price: "",
    discounted_renewal_price: "",
    is_active: true,
    terms_and_condition: "",
    benefit: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/membership-plan");
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
            title="Membership Plan"
            breadcrumbItem={isEdit ? "Edit Membership Plan" : "Add Membership Plan"}
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="duration">Duration (in months)</Label>
                          <Input
                            type="number"
                            id="duration"
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="price">Price</Label>
                          <Input
                            type="number"
                            id="price"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="renewal_price">Renewal Price</Label>
                          <Input
                            type="number"
                            id="renewal_price"
                            value={formData.renewal_price}
                            onChange={(e) => setFormData({...formData, renewal_price: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="discounted_price">Discounted Price</Label>
                          <Input
                            type="number"
                            id="discounted_price"
                            value={formData.discounted_price}
                            onChange={(e) => setFormData({...formData, discounted_price: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="discounted_renewal_price">Discounted Renewal Price</Label>
                          <Input
                            type="number"
                            id="discounted_renewal_price"
                            value={formData.discounted_renewal_price}
                            onChange={(e) => setFormData({...formData, discounted_renewal_price: e.target.value})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <div className="form-check form-switch form-switch-lg mb-3">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="is_active"
                          checked={formData.is_active}
                          onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                        />
                        <Label className="form-check-label" htmlFor="is_active">
                          Active Status
                        </Label>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label>Terms and Conditions</Label>
                      <Editor
                        initialValue={formData.terms_and_condition}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: ["lists", "link", "code"],
                          toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                        }}
                        onEditorChange={(content) => setFormData({...formData, terms_and_condition: content})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Benefits</Label>
                      <Editor
                        initialValue={formData.benefit}
                        init={{
                          height: 200,
                          menubar: false,
                          plugins: ["lists", "link", "code"],
                          toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist",
                        }}
                        onEditorChange={(content) => setFormData({...formData, benefit: content})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        type="textarea"
                        id="description"
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </FormGroup>

                    <div className="d-flex gap-3">
                      <Button type="submit" color="primary">
                        {isEdit ? "Update" : "Save"}
                      </Button>
                      <Button type="button" color="secondary" onClick={() => navigate("/membership-plan")}>
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

export default AddMembershipPlan;
