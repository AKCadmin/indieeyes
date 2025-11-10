import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const AddDimension = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    size: "",
    image: null,
    lensWidth: "",
    bridgeWidth: "",
    templeLength: "",
    lensHeight: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/dimension");
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
            title="Dimension"
            breadcrumbItem={isEdit ? "Edit Dimension" : "Add Dimension"}
          />

          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="size">Size</Label>
                      <Input
                        type="text"
                        id="size"
                        value={formData.size}
                        onChange={(e) => setFormData({...formData, size: e.target.value})}
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

                    <FormGroup>
                      <Label htmlFor="lensWidth">Lens Width</Label>
                      <Input
                        type="text"
                        id="lensWidth"
                        value={formData.lensWidth}
                        onChange={(e) => setFormData({...formData, lensWidth: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="bridgeWidth">Bridge Width</Label>
                      <Input
                        type="text"
                        id="bridgeWidth"
                        value={formData.bridgeWidth}
                        onChange={(e) => setFormData({...formData, bridgeWidth: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="templeLength">Temple Length</Label>
                      <Input
                        type="text"
                        id="templeLength"
                        value={formData.templeLength}
                        onChange={(e) => setFormData({...formData, templeLength: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="lensHeight">Lens Height</Label>
                      <Input
                        type="text"
                        id="lensHeight"
                        value={formData.lensHeight}
                        onChange={(e) => setFormData({...formData, lensHeight: e.target.value})}
                      />
                    </FormGroup>

                    <div className="d-flex gap-3">
                      <Button type="submit" color="primary">
                        {isEdit ? "Update" : "Save"}
                      </Button>
                      <Button type="button" color="secondary" onClick={() => navigate("/dimension")}>
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

export default AddDimension;
