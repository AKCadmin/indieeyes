import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useNavigate } from "react-router-dom";

const AddShape = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        image: acceptedFiles[0]
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission
    console.log("Form data:", formData);
    navigate("/shape");
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
          <Breadcrumbs title="Products" breadcrumbItem="Add Shape" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="textarea"
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Image</Label>
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <div className="dz-message needsclick">
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                          </div>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                      {formData.image && (
                        <div className="mt-2">
                          <p>Selected file: {formData.image.name}</p>
                        </div>
                      )}
                    </FormGroup>

                    <div className="text-center mt-4">
                      <Button type="submit" color="primary">
                        Save Shape
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

export default AddShape;
