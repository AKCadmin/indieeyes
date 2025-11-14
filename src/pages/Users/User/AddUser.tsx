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
import { useDropzone } from "react-dropzone";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const AddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmed: false,
    blocked: false,
    role: "",
    otp: "",
    first_name: "",
    last_name: "",
    gender: "",
    age: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isEmailVerified: false,
    isMobileVerified: false,
    accountActive: false,
    referralCode: "",
    referredBy: "",
    profile_picture: null,
    phone_number: "",
    title: "",
    membership_id: "",
  });

  const roleOptions = ["Admin", "User", "Manager"];
  const genderOptions = ["Male", "Female", "Other"];
  const titleOptions = ["Mr", "Mrs", "Ms", "Dr"];
  const membershipOptions = ["Silver", "Gold", "Platinum"];
  const referredByOptions = ["User1", "User2", "User3"]; // This should be populated from API

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        profile_picture: acceptedFiles[0],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    navigate("/user");
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
            title="Users"
            breadcrumbItem={isEdit ? "Edit User" : "Add User"}
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="username">
                            Username* (min. 3 characters)
                          </Label>
                          <Input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                username: e.target.value,
                              })
                            }
                            minLength={3}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="email">
                            Email* (min. 6 characters)
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            minLength={6}
                            required
                          />
                        </FormGroup>
                      </Col>
                      {!isEdit && (
                        <Col md={6}>
                          <FormGroup>
                            <Label htmlFor="password">
                              Password (min. 6 characters)
                            </Label>
                            <Input
                              type="password"
                              id="password"
                              value={formData.password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                })
                              }
                              minLength={6}
                            />
                          </FormGroup>
                        </Col>
                      )}
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="role">Role</Label>
                          <Input
                            type="select"
                            id="role"
                            value={formData.role}
                            onChange={(e) =>
                              setFormData({ ...formData, role: e.target.value })
                            }
                          >
                            <option value="">Select Role</option>
                            {roleOptions.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="otp">OTP</Label>
                          <Input
                            type="text"
                            id="otp"
                            value={formData.otp}
                            onChange={(e) =>
                              setFormData({ ...formData, otp: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <FormGroup className="mb-3">
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="confirmed"
                              checked={formData.confirmed}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  confirmed: e.target.checked,
                                })
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="confirmed"
                            >
                              Confirmed
                            </Label>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup className="mb-3">
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="blocked"
                              checked={formData.blocked}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  blocked: e.target.checked,
                                })
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="blocked"
                            >
                              Blocked
                            </Label>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="first_name">First Name</Label>
                          <Input
                            type="text"
                            id="first_name"
                            value={formData.first_name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                first_name: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input
                            type="text"
                            id="last_name"
                            value={formData.last_name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                last_name: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="gender">Gender</Label>
                          <Input
                            type="select"
                            id="gender"
                            value={formData.gender}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                gender: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Gender</option>
                            {genderOptions.map((gender) => (
                              <option key={gender} value={gender}>
                                {gender}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            type="number"
                            id="age"
                            value={formData.age}
                            onChange={(e) =>
                              setFormData({ ...formData, age: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        type="textarea"
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </FormGroup>

                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label htmlFor="city">City</Label>
                          <Input
                            type="text"
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label htmlFor="state">State</Label>
                          <Input
                            type="text"
                            id="state"
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
                      <Col md={4}>
                        <FormGroup>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input
                            type="text"
                            id="zip"
                            value={formData.zip}
                            onChange={(e) =>
                              setFormData({ ...formData, zip: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <FormGroup className="mb-3">
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="isEmailVerified"
                              checked={formData.isEmailVerified}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  isEmailVerified: e.target.checked,
                                })
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="isEmailVerified"
                            >
                              Email Verified
                            </Label>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup className="mb-3">
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="isMobileVerified"
                              checked={formData.isMobileVerified}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  isMobileVerified: e.target.checked,
                                })
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="isMobileVerified"
                            >
                              Mobile Verified
                            </Label>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup className="mb-3">
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="accountActive"
                              checked={formData.accountActive}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  accountActive: e.target.checked,
                                })
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="accountActive"
                            >
                              Account Active
                            </Label>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="referralCode">Referral Code</Label>
                          <Input
                            type="text"
                            id="referralCode"
                            value={formData.referralCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                referralCode: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="referredBy">Referred By</Label>
                          <Input
                            type="select"
                            id="referredBy"
                            value={formData.referredBy}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                referredBy: e.target.value,
                              })
                            }
                          >
                            <option value="">Select User</option>
                            {referredByOptions.map((user) => (
                              <option key={user} value={user}>
                                {user}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup>
                      <Label>Profile Picture</Label>
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <div className="dz-message needsclick">
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                          </div>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                      {formData.profile_picture && (
                        <div className="mt-2">
                          <p>Selected file: {formData.profile_picture.name}</p>
                        </div>
                      )}
                    </FormGroup>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label htmlFor="phone_number">Phone Number</Label>
                          <Input
                            type="tel"
                            id="phone_number"
                            value={formData.phone_number}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone_number: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            type="select"
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Title</option>
                            {titleOptions.map((title) => (
                              <option key={title} value={title}>
                                {title}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label htmlFor="membership_id">Membership</Label>
                          <Input
                            type="select"
                            id="membership_id"
                            value={formData.membership_id}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                membership_id: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Membership</option>
                            {membershipOptions.map((membership) => (
                              <option key={membership} value={membership}>
                                {membership}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className="d-flex gap-3">
                      <Button type="submit" color="primary">
                        {isEdit ? "Update" : "Save"}
                      </Button>
                      <Button
                        type="button"
                        color="secondary"
                        onClick={() => navigate("/user")}
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

export default AddUser;
