import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  Row,
  Col,
  Badge,
  Input,
  InputGroup,
  InputGroupText,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample order data
  const orderData = [
    {
      orderId: "#SK2541",
      customer: "John Doe",
      orderDate: "2024-10-15",
      total: "$123.45",
      status: "Delivered",
      paymentStatus: "Paid",
    },
    {
      orderId: "#SK2542",
      customer: "Jane Smith",
      orderDate: "2024-10-12",
      total: "$256.80",
      status: "Processing",
      paymentStatus: "Paid",
    },
    {
      orderId: "#SK2543",
      customer: "Bob Johnson",
      orderDate: "2024-10-10",
      total: "$89.99",
      status: "Delivered",
      paymentStatus: "Paid",
    },
    {
      orderId: "#SK2544",
      customer: "Alice Williams",
      orderDate: "2024-10-08",
      total: "$456.20",
      status: "Shipped",
      paymentStatus: "Paid",
    },
    {
      orderId: "#SK2545",
      customer: "Charlie Brown",
      orderDate: "2024-09-28",
      total: "$178.50",
      status: "Delivered",
      paymentStatus: "Pending",
    },
    {
      orderId: "#SK2546",
      customer: "Diana Prince",
      orderDate: "2024-09-15",
      total: "$299.99",
      status: "Cancelled",
      paymentStatus: "Refunded",
    },
  ];

  // Filter data based on time period
  const getFilteredData = () => {
    const currentDate = new Date();
    let filtered = [...orderData];

    switch (filterType) {
      case "week":
        const weekAgo = new Date();
        weekAgo.setDate(currentDate.getDate() - 7);
        filtered = filtered.filter(order => new Date(order.orderDate) >= weekAgo);
        break;
      case "month":
        const monthAgo = new Date();
        monthAgo.setMonth(currentDate.getMonth() - 1);
        filtered = filtered.filter(order => new Date(order.orderDate) >= monthAgo);
        break;
      case "year":
        const yearAgo = new Date();
        yearAgo.setFullYear(currentDate.getFullYear() - 1);
        filtered = filtered.filter(order => new Date(order.orderDate) >= yearAgo);
        break;
      default:
        break;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";
      case "Processing":
        return "info";
      case "Shipped":
        return "primary";
      case "Cancelled":
        return "danger";
      default:
        return "warning";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      case "Refunded":
        return "secondary";
      default:
        return "danger";
    }
  };

  const filteredData = getFilteredData();

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: filteredData.length,
      delivered: filteredData.filter(o => o.status === "Delivered").length,
      processing: filteredData.filter(o => o.status === "Processing" || o.status === "Shipped").length,
      revenue: filteredData.reduce((sum, o) => sum + parseFloat(o.total.replace('$', '')), 0).toFixed(2),
    };
  }, [filteredData]);

  return (
    <div className="page-content">
      <div className="container-fluid">
        {/* Page Title */}
        <Row className="mb-4">
          <Col>
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-0 font-size-18">Order Management</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                  <li className="breadcrumb-item active">Orders</li>
                </ol>
              </div>
            </div>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col xl={3} md={6}>
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <p className="text-muted fw-medium mb-2">Total Orders</p>
                    <h4 className="mb-0">{stats.total}</h4>
                  </div>
                  <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                    <span className="avatar-title rounded-circle bg-primary">
                      <i className="bx bx-package font-size-24"></i>
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={3} md={6}>
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <p className="text-muted fw-medium mb-2">Delivered</p>
                    <h4 className="mb-0">{stats.delivered}</h4>
                  </div>
                  <div className="avatar-sm rounded-circle bg-success align-self-center mini-stat-icon">
                    <span className="avatar-title rounded-circle bg-success">
                      <i className="bx bx-check-circle font-size-24"></i>
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={3} md={6}>
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <p className="text-muted fw-medium mb-2">Processing</p>
                    <h4 className="mb-0">{stats.processing}</h4>
                  </div>
                  <div className="avatar-sm rounded-circle bg-info align-self-center mini-stat-icon">
                    <span className="avatar-title rounded-circle bg-info">
                      <i className="bx bx-hourglass font-size-24"></i>
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={3} md={6}>
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <p className="text-muted fw-medium mb-2">Total Revenue</p>
                    <h4 className="mb-0">${stats.revenue}</h4>
                  </div>
                  <div className="avatar-sm rounded-circle bg-warning align-self-center mini-stat-icon">
                    <span className="avatar-title rounded-circle bg-warning">
                      <i className="bx bx-dollar-circle font-size-24"></i>
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Main Order List Card */}
        <Card>
          <CardBody>
            <Row className="mb-3">
              <Col md={6} className="mb-3 mb-md-0">
                <h4 className="card-title mb-3">Order List</h4>
                <InputGroup className="w-100" style={{ maxWidth: "400px" }}>
                  <InputGroupText>
                    <i className="bx bx-search-alt"></i>
                  </InputGroupText>
                  <Input
                    type="text"
                    placeholder="Search by order ID or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                  <ButtonGroup>
                    <Button
                      color={filterType === "all" ? "primary" : "dark"}
                      onClick={() => setFilterType("all")}
                      outline={filterType !== "all"}
                    >
                      <i className="bx bx-globe me-1"></i>
                      All Time
                    </Button>
                    <Button
                      color={filterType === "week" ? "primary" : "dark"}
                      onClick={() => setFilterType("week")}
                      outline={filterType !== "week"}
                    >
                      <i className="bx bx-calendar me-1"></i>
                      Week
                    </Button>
                    <Button
                      color={filterType === "month" ? "primary" : "dark"}
                      onClick={() => setFilterType("month")}
                      outline={filterType !== "month"}
                    >
                      <i className="bx bx-calendar-check me-1"></i>
                      Month
                    </Button>
                    <Button
                      color={filterType === "year" ? "primary" : "dark"}
                      onClick={() => setFilterType("year")}
                      outline={filterType !== "year"}
                    >
                      <i className="bx bx-calendar-event me-1"></i>
                      Year
                    </Button>
                  </ButtonGroup>
                </div>
              </Col>
            </Row>

            <div className="table-responsive">
              <Table className="table table-hover table-nowrap table-centered mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Order Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((order, index) => (
                      <tr key={index}>
                        <td>
                          <Link to="#" className="text-body fw-bold">
                            {order.orderId}
                          </Link>
                        </td>
                        <td>{order.customer}</td>
                        <td>
                          {new Date(order.orderDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="fw-semibold">{order.total}</td>
                        <td>
                          <Badge
                            className={`font-size-11 badge-soft-${getStatusColor(order.status)}`}
                            color={getStatusColor(order.status)}
                            pill
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            className={`font-size-11 badge-soft-${getPaymentColor(order.paymentStatus)}`}
                            color={getPaymentColor(order.paymentStatus)}
                            pill
                          >
                            {order.paymentStatus}
                          </Badge>
                        </td>
                        <td>
                          <Button size="sm" color="primary" outline>
                            <i className="bx bx-show me-1"></i>
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        <div className="text-muted">
                          <i className="bx bx-package display-4 d-block mb-3"></i>
                          <h5 className="mb-1">No orders found</h5>
                          <p className="mb-0">Try adjusting your filters or search terms</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array,
};

export default OrderList;