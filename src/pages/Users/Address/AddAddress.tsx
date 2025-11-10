import React, { useState } from "react";
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface ReceiverDetail {
  id: string;
  name: string;
  phone_number: string;
}

const AddAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    apt_name_or_number: "",
    street: "",
    landmark: "",
    zip: "",
    city: "",
    state: "",
    user: "",
    type: "",
  });

  const [receiverDetails, setReceiverDetails] = useState<ReceiverDetail[]>([]);

  const addReceiverDetail = () => {
    const newDetail = {
      id: Date.now().toString(),
      name: "",
      phone_number: "",
    };
    setReceiverDetails([...receiverDetails, newDetail]);
  };

  const removeReceiverDetail = (id: string) => {
    setReceiverDetails(receiverDetails.filter((detail) => detail.id !== id));
  };

  const handleReceiverDetailChange = (
    id: string,
    field: keyof ReceiverDetail,
    value: string
  ) => {
    setReceiverDetails(
      receiverDetails.map((detail) =>
        detail.id === id ? { ...detail, [field]: value } : detail
      )
    );
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(receiverDetails);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setReceiverDetails(items);
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
            title="Address"
            breadcrumbItem={isEdit ? "Edit Address" : "Add Address"}
          />
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    {/* Basic Address Fields */}
                    <FormGroup>
                      <Label>Address Line 1</Label>
                      <Input
                        type="text"
                        value={formData.address_line_1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address_line_1: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Address Line 2</Label>
                      <Input
                        type="text"
                        value={formData.address_line_2}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address_line_2: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Apartment Name/Number</Label>
                      <Input
                        type="text"
                        value={formData.apt_name_or_number}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            apt_name_or_number: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Street</Label>
                      <Input
                        type="text"
                        value={formData.street}
                        onChange={(e) =>
                          setFormData({ ...formData, street: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Landmark</Label>
                      <Input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) =>
                          setFormData({ ...formData, landmark: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label>ZIP Code</Label>
                          <Input
                            type="text"
                            value={formData.zip}
                            onChange={(e) =>
                              setFormData({ ...formData, zip: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>City</Label>
                          <Input
                            type="text"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>State</Label>
                          <Input
                            type="text"
                            value={formData.state}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                state: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {/* Receiver Details Section */}
                    <div className="mt-4">
                      <h5>Receiver Details</h5>
                      {receiverDetails.length === 0 ? (
                        <div className="text-muted mb-3">
                          No entry yet. Click on the button below to add one.
                        </div>
                      ) : (
                        <DragDropContext onDragEnd={onDragEnd}>
                          <Droppable droppableId="receiver-details">
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {receiverDetails.map((detail, index) => (
                                  <Draggable
                                    key={detail.id}
                                    draggableId={detail.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="border p-3 mb-3 rounded"
                                      >
                                        <Row>
                                          <Col md={5}>
                                            <FormGroup>
                                              <Label>Name</Label>
                                              <Input
                                                type="text"
                                                value={detail.name}
                                                onChange={(e) =>
                                                  handleReceiverDetailChange(
                                                    detail.id,
                                                    "name",
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </FormGroup>
                                          </Col>
                                          <Col md={5}>
                                            <FormGroup>
                                              <Label>Phone Number</Label>
                                              <Input
                                                type="text"
                                                value={detail.phone_number}
                                                onChange={(e) =>
                                                  handleReceiverDetailChange(
                                                    detail.id,
                                                    "phone_number",
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </FormGroup>
                                          </Col>
                                          <Col
                                            md={2}
                                            className="d-flex align-items-center"
                                          >
                                            <Button
                                              color="danger"
                                              size="sm"
                                              onClick={() =>
                                                removeReceiverDetail(detail.id)
                                              }
                                            >
                                              <i className="bx bx-trash"></i>
                                            </Button>
                                          </Col>
                                        </Row>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>
                      )}
                      <Button color="secondary" onClick={addReceiverDetail}>
                        Add Receiver Detail
                      </Button>

                      {/* Add User and Type fields */}
                      <Row className="mt-4">
                        <Col md={6}>
                          <FormGroup>
                            <Label>User</Label>
                            <Input
                              type="select"
                              value={formData.user}
                              onChange={(e) =>
                                setFormData({ ...formData, user: e.target.value })
                              }
                            >
                              <option value="">Select User</option>
                              <option value="1">User 1</option>
                              <option value="2">User 2</option>
                              <option value="3">User 3</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Type</Label>
                            <Input
                              type="select"
                              value={formData.type}
                              onChange={(e) =>
                                setFormData({ ...formData, type: e.target.value })
                              }
                            >
                              <option value="">Select Type</option>
                              <option value="home">Home</option>
                              <option value="work">Work</option>
                              <option value="other">Other</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <div className="mt-4">
                      <Button color="primary" type="submit">
                        {isEdit ? "Update" : "Save"} Address
                      </Button>
                      <Button
                        color="secondary"
                        className="ms-2"
                        onClick={() => navigate("/address")}
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

export default AddAddress;
