// @ts-nocheck
import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
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
import { apiClient1, apiHandler } from "../../utils/api-handler";
import { DASHBOARD_API, ORDERS_API, ORDERS_EXPORT_API } from "../../utils/url-helper";
import { toast } from "react-toastify";

const OrderList = ({ filterType }) => {
  // const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [isExporting, setIsExporting] = useState(false);
  const [statsData, setStatsData] = useState({
    total_orders: 0,
    delivered: 0,
    processing: 0,
    total_revenue: "0.00",
  });

  const navigate = useNavigate();

  const handleCreateShipment = async (orderId: number) => {
    try {
      const response = await fetch("http://localhost:5000/api/shipments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`Shipment created successfully! ID: ${data.shipmentId || ""}`);
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to create shipment");
      }
    } catch (error) {
      console.error("Error creating shipment:", error);
      toast.error("Error creating shipment");
    }
  };

  const handleShipNow = async (shipmentId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/shipments/${shipmentId}/ship-now`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Shipment shipped successfully!");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to ship");
      }
    } catch (error) {
      console.error("Error shipping:", error);
      toast.error("Error shipping order");
    }
  };

  // Fetch stats data - REMOVED as we calculate from orders now
  /*
  useEffect(() => {
    const statsDataFunction = async () => {
      try {
        const response = await apiHandler.get(apiClient1, DASHBOARD_API);

        if (response.success && response.data?.summary) {
          setStatsData(response.data.summary);
        } else {
          throw new Error(response.message || "Invalid stats data format");
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        toast.error("Error fetching stats: " + err.message);
      }
    };
    statsDataFunction();
  }, []);
  */

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiHandler.get(apiClient1, ORDERS_API);

        if (response.success && Array.isArray(response.data)) {
          const formattedOrders = response.data.map((order) => ({
            orderId: order.order_id,
            id: order.id,
            customer:
              `${order.first_name || ""} ${order.last_name || ""}`.trim() ||
              "Unknown",
            orderDate: order.order_date,
            total: `₹${order.total}`,
            status: order.status,
            paymentStatus: order.payment_status,
          }));
          setOrders(formattedOrders);
        } else {
          throw new Error(response.message || "Invalid orders data format");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Error fetching orders: " + err.message);
      }
    };
    fetchOrders();
  }, []);

  // Filter data based on time period
  const getFilteredData = () => {
    const currentDate = new Date();
    let filtered = [...orders];

    switch (filterType) {
      case "week":
        const weekAgo = new Date();
        weekAgo.setDate(currentDate.getDate() - 7);
        filtered = filtered.filter(
          (order) => new Date(order.orderDate) >= weekAgo
        );
        break;
      case "month":
        const monthAgo = new Date();
        monthAgo.setMonth(currentDate.getMonth() - 1);
        filtered = filtered.filter(
          (order) => new Date(order.orderDate) >= monthAgo
        );
        break;
      case "year":
        const yearAgo = new Date();
        yearAgo.setFullYear(currentDate.getFullYear() - 1);
        filtered = filtered.filter(
          (order) => new Date(order.orderDate) >= yearAgo
        );
        break;
      default:
        break;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    if (!status) return "warning";
    const statusLower = status.toLowerCase();
    if (
      statusLower.includes("confirmed") ||
      statusLower.includes("delivered")
    ) {
      return "success";
    } else if (statusLower.includes("processing")) {
      return "info";
    } else if (statusLower.includes("shipped")) {
      return "primary";
    } else if (
      statusLower.includes("cancelled") ||
      statusLower.includes("refunded")
    ) {
      return "danger";
    }
    return "warning";
  };

  const getPaymentColor = (status) => {
    if (!status) return "danger";
    const statusLower = status.toLowerCase();
    if (statusLower.includes("success")) {
      return "success";
    } else if (statusLower.includes("pending")) {
      return "warning";
    } else if (statusLower.includes("refunded")) {
      return "secondary";
    }
    return "danger";
  };

  const handleColumnSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await apiHandler.get(apiClient1, ORDERS_EXPORT_API, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.success("Orders exported successfully");
    } catch (err) {
      console.error("Error exporting orders:", err);
      toast.error("Error exporting orders");
    } finally {
      setIsExporting(false);
    }
  };

  const getSortedData = () => {
    let data = getFilteredData();

    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      // Handle numeric and string comparisons
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  const getSortIndicator = (column) => {
    if (sortColumn !== column) return "";
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  const stats = useMemo(() => {
    const filteredOrders = getFilteredData();
    const totalOrders = filteredOrders.length;
    const deliveredOrders = filteredOrders.filter((order) =>
      order.status?.toLowerCase().includes("delivered")
    ).length;
    const processingOrders = filteredOrders.filter((order) =>
      order.status?.toLowerCase().includes("processing")
    ).length;
    const totalRevenue = filteredOrders.reduce((acc, order) => {
      const amount = parseFloat(order.total.replace(/[^0-9.-]+/g, ""));
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    return {
      total: totalOrders,
      delivered: deliveredOrders,
      processing: processingOrders,
      revenue: totalRevenue,
    };
  }, [orders, filterType, searchTerm]);

  const sortedData = getSortedData();

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
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                  </li>
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
                    <h4 className="mb-0">₹{stats.revenue.toFixed(2)}</h4>
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
                  <Button
                    color="success"
                    className="btn-rounded waves-effect waves-light"
                    onClick={handleExport}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                        Exporting...
                      </>
                    ) : (
                      <>
                        <i className="bx bx-export font-size-16 align-middle me-2"></i>
                        Export CSV
                      </>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>

            <div className="table-responsive">
              <Table className="table table-hover table-nowrap table-centered mb-0">
                <thead className="table-light">
                  <tr>
                    <th
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleColumnSort("orderId")}
                    >
                      Order ID{getSortIndicator("orderId")}
                    </th>
                    <th
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleColumnSort("customer")}
                    >
                      Customer{getSortIndicator("customer")}
                    </th>
                    <th
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleColumnSort("orderDate")}
                    >
                      Order Date{getSortIndicator("orderDate")}
                    </th>
                    <th
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleColumnSort("total")}
                    >
                      Total{getSortIndicator("total")}
                    </th>
                    <th
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleColumnSort("status")}
                    >
                      Status{getSortIndicator("status")}
                    </th>
                    <th
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => handleColumnSort("paymentStatus")}
                    >
                      Payment{getSortIndicator("paymentStatus")}
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.length > 0 ? (
                    sortedData.map((order, index) => (
                      <tr key={index}>
                        <td>
                          <Link to="#" className="text-body fw-bold">
                            {order.orderId}
                          </Link>
                        </td>
                        <td>{order.customer}</td>
                        <td>
                          {new Date(order.orderDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="fw-semibold">{order.total}</td>
                        <td>
                          <Badge
                            className={`font-size-11 badge-soft-${getStatusColor(
                              order.status
                            )}`}
                            color={getStatusColor(order.status)}
                            pill
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            className={`font-size-11 badge-soft-${getPaymentColor(
                              order.paymentStatus
                            )}`}
                            color={getPaymentColor(order.paymentStatus)}
                            pill
                          >
                            {order.paymentStatus}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            {order.status && order.status.toLowerCase().includes("confirmed") && (
                              <Button
                                size="sm"
                                color="info"
                                outline
                                onClick={() => handleCreateShipment(order.id)}
                                title="Create Shipment"
                              >
                                <i className="bx bx-box me-1"></i>
                                Create
                              </Button>
                            )}
                            {order.status && order.status.toLowerCase().includes("processing") && (
                              <Button
                                size="sm"
                                color="warning"
                                outline
                                onClick={() => handleShipNow(order.id)}
                                title="Ship Now"
                              >
                                <i className="bx bx-send me-1"></i>
                                Ship Now
                              </Button>
                            )}
                            <Button
                              size="sm"
                              color="primary"
                              outline
                              onClick={() => navigate(`/order/${order.id}`)}
                            >
                              <i className="bx bx-show me-1"></i>
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        <div className="text-muted">
                          <i className="bx bx-package display-4 d-block mb-3"></i>
                          <h5 className="mb-1">No orders found</h5>
                          <p className="mb-0">
                            Try adjusting your filters or search terms
                          </p>
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
  filterType: PropTypes.string,
};

export default OrderList;
