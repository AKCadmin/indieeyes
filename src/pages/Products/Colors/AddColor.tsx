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

const AddColor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement save functionality
    console.log("Save color");
    navigate("/colors");
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
            title="Colors"
            breadcrumbItem={isEdit ? "Edit Color" : "Add Color"}
          />

          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="colorName">Name</Label>
                      <Input
                        type="text"
                        id="colorName"
                        placeholder="Enter color name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="hexCode">Hex Code</Label>
                      <Input
                        type="text"
                        id="hexCode"
                        placeholder="Enter hex code (e.g., #000000)"
                      />
                    </FormGroup>

                    <div className="d-flex gap-3">
                      <Button type="submit" color="primary">
                        {isEdit ? "Update" : "Save"}
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => navigate("/colors")}
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

export default AddColor;
