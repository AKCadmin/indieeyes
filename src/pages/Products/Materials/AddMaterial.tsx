import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const AddMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement save functionality
    console.log("Save material");
    navigate("/material");
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
            title="Materials"
            breadcrumbItem={isEdit ? "Edit Material" : "Add Material"}
          />

          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="materialName">Name</Label>
                      <Input
                        type="text"
                        id="materialName"
                        placeholder="Enter material name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="features">Features</Label>
                      <Input
                        type="textarea"
                        id="features"
                        placeholder="Enter material features"
                        rows={4}
                      />
                    </FormGroup>

                    <div className="d-flex gap-3">
                      <Button type="submit" color="primary">
                        {isEdit ? "Update" : "Save"}
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => navigate("/material")}
                      >
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

export default AddMaterial;
