import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const AddRatingReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    product_id: "",
    rating: "0",
    review: "",
    images: [],
    user: "",
    approval_status: "pending"
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        images: acceptedFiles
      });
    }
  });

  const products = [
    { id: "PRD001", name: "Product 1" },
    { id: "PRD002", name: "Product 2" },
  ];

  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ];

  const approvalStatuses = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/rating-review");
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
          <Breadcrumbs title="Rating & Review" breadcrumbItem={isEdit ? "Edit Rating & Review" : "Add Rating & Review"} />

          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="product_id">Product</Label>
                      <Input
                        type="select"
                        id="product_id"
                        value={formData.product_id}
                        onChange={(e) => setFormData({...formData, product_id: e.target.value})}
                      >
                        <option value="">Select Product</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="rating">Rating (0-5)</Label>
                      <Input
                        type="number"
                        id="rating"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="review">Review</Label>
                      <Input
                        type="textarea"
                        id="review"
                        rows="4"
                        value={formData.review}
                        onChange={(e) => setFormData({...formData, review: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Images</Label>
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <div className="dz-message needsclick">
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                          </div>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                      {formData.images.length > 0 && (
                        <div className="mt-2">
                          <p>Selected files: {formData.images.map(file => file.name).join(", ")}</p>
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="user">User</Label>
                      <Input
                        type="select"
                        id="user"
                        value={formData.user}
                        onChange={(e) => setFormData({...formData, user: e.target.value})}
                      >
                        <option value="">Select User</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="approval_status">Approval Status</Label>
                      <Input
                        type="select"
                        id="approval_status"
                        value={formData.approval_status}
                        onChange={(e) => setFormData({...formData, approval_status: e.target.value})}
                      >
                        {approvalStatuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </Input>
                    </FormGroup>

                    <div className="d-flex gap-3">
                      <Button type="submit" color="primary">
                        {isEdit ? "Update" : "Save"}
                      </Button>
                      <Button type="button" color="secondary" onClick={() => navigate("/rating-review")}>
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

export default AddRatingReview;
