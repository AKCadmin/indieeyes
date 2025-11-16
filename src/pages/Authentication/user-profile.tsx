import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { apiClient1, apiHandler } from "../../utils/api-handler";
import { PROFILE_API } from "../../utils/url-helper";
import { toast } from "react-toastify";

import avatar from "../../assets/images/users/avatar-1.jpg";

import withRouter from "../../components/Common/withRouter";
import { useNavigate } from "react-router-dom";

const UserProfile = (props) => {
  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template";
  const [email, setemail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [id, setid] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiHandler.get(apiClient1, PROFILE_API);

        if (response.success && response.data) {
          const { id, email, firstname, lastname } = response.data;
          setid(id);
          setemail(email);
          setfirstname(firstname || "");
          setlastname(lastname || "");
        } else {
          throw new Error(response.message || "Failed to fetch profile");
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        toast.error("Error fetching profile: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please enter your first name"),
      lastname: Yup.string().required("Please enter your last name"),
      email: Yup.string()
        .email("Invalid email")
        .required("Please enter your email"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await apiHandler.put(apiClient1, PROFILE_API, {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
        });

        if (response.success) {
          setfirstname(values.firstname);
          setlastname(values.lastname);
          setemail(values.email);
          setSuccess("Profile updated successfully!");
          setError("");
          setTimeout(() => setSuccess(""), 3000);
        } else {
          throw new Error(response.message || "Failed to update profile");
        }
      } catch (err: any) {
        setError("Failed to update profile: " + err.message);
        setSuccess("");
        toast.error("Error updating profile: " + err.message);
      } finally {
        setLoading(false);
      }
    },
  });

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
          {/* Render Breadcrumb */}
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}

              <Card className="profile-card">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img
                        src={avatar}
                        alt="Profile"
                        className="avatar-lg rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <div>
                        <h5 className="mb-1">{`${firstname} ${lastname}`}</h5>
                        <p className="text-muted mb-1">
                          <i className="bx bx-envelope me-2"></i>
                          {email}
                        </p>
                        <p className="text-muted mb-0">
                          <i className="bx bx-user me-2"></i>ID: #{id}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4 mt-4">Update Profile Information</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label className="form-label">First Name</Label>
                      <Input
                        name="firstname"
                        className="form-control"
                        placeholder="Enter first name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.firstname || ""}
                        invalid={
                          validation.touched.firstname &&
                          validation.errors.firstname
                            ? true
                            : false
                        }
                      />
                      {validation.touched.firstname &&
                      validation.errors.firstname ? (
                        <FormFeedback type="invalid">
                          {validation.errors.firstname}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <Label className="form-label">Last Name</Label>
                      <Input
                        name="lastname"
                        className="form-control"
                        placeholder="Enter last name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.lastname || ""}
                        invalid={
                          validation.touched.lastname &&
                          validation.errors.lastname
                            ? true
                            : false
                        }
                      />
                      {validation.touched.lastname &&
                      validation.errors.lastname ? (
                        <FormFeedback type="invalid">
                          {validation.errors.lastname}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <Label className="form-label">Email Address</Label>
                  <Input
                    name="email"
                    className="form-control"
                    placeholder="Enter email address"
                    type="email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email
                        ? true
                        : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">
                      {validation.errors.email}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="text-center mt-4">
                  <Button type="submit" color="primary" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
