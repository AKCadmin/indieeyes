// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Row, Col, Spinner, Badge } from "reactstrap";
import { apiClient1, apiHandler } from "../../../utils/api-handler";
import { ORDERS_API } from "../../../utils/url-helper";
import { toast } from "react-toastify";

// Helper Component for display sections
const DetailBlock = ({ title, children }) => (
  <Card className="mb-3">
    <CardBody>
      <h5 className="mb-3">{title}</h5>
      {children}
    </CardBody>
  </Card>
);

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        if (!orderId) {
          throw new Error("Missing order id");
        }
        // Fetch ALL orders, then search for the one needed
        const response = await apiHandler.get(apiClient1, ORDERS_API);

        if (response && response.success && Array.isArray(response.data)) {
          // Find the order with matching order_id
          const found = response.data.find(o => o.order_id === orderId);
          if (found) {
            setOrder(found);
          } else {
            setOrder(null);
            throw new Error("Order not found");
          }
        } else {
          throw new Error(response && response.message ? response.message : "Order not found");
        }
      } catch (err) {
        const e = err;
        const serverMessage = e?.response?.data?.message || e?.response?.data || e?.message;
        const status = e?.response?.status;
        console.error("Failed fetching order details", e);
        toast.error(`Unable to load order details${status ? ' (' + status + ')' : ''}: ${serverMessage}`);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="page-content">
        <div className="container-fluid text-center py-5">
          <Spinner color="primary" />
          <h4 className="mt-3">Loading order details...</h4>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page-content">
        <div className="container-fluid text-center py-5">
          <h4>Order not found</h4>
          <Link to="/dashboard" className="btn btn-outline-dark">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  // MAIN RENDER: adjust fields to your API response
  return (
    <div className="page-content">
      <div className="container-fluid">
        {/* Header / Summary */}
        <Card className="mb-4">
          <CardBody>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="mb-1">Order ID: {order.order_id || order.id}</h3>
                <Badge color={
                  order.status === "confirmed" ? "success" :
                  order.status === "refunded" ? "warning" :
                  order.status === "processing" ? "info" :
                  order.status === "cancelled" ? "danger" :
                  "secondary"
                }>
                  {order.status || "unknown"}
                </Badge>
                <span className="mx-3 text-muted">{order.order_date}</span>
              </div>
              <Link to="/dashboard" className="btn btn-outline-dark">Back to Dashboard</Link>
            </div>
          </CardBody>
        </Card>

        <Row>
          {/* Left - Order core info */}
          <Col md={8}>
            <DetailBlock title="Order Item">
              <p><strong>Product:</strong> {order.product_name || order.product || "N/A"}</p>
              <p><strong>Quantity:</strong> {order.quantity || 1}</p>
              <p><strong>Price:</strong> ₹{order.total}</p>
              {order.product_image && (
                <img src={order.product_image} alt="product" style={{ maxWidth: 80, borderRadius: 6 }} />
              )}
            </DetailBlock>

            <DetailBlock title="Order Summary">
              <p><strong>Subtotal:</strong> ₹{order.subtotal || order.total}</p>
              <p><strong>Discount:</strong> {order.discount || "₹0"}</p>
              <p><strong>Shipping:</strong> {order.shipping_fee || "Free"}</p>
              <p>
                <strong>Total:</strong> <span className="fw-bold">₹{order.total}</span>
              </p>
              <p>
                <strong>Payment:</strong>
                <Badge color={
                  order.payment_status === "success" ? "success" :
                  order.payment_status === "failed" ? "danger" :
                  "warning"
                } className="ms-2">
                  {order.payment_status || "N/A"}
                </Badge>
              </p>
            </DetailBlock>

            <DetailBlock title="Timeline">
              <p>{order.timeline || "Order placed, awaiting updates..."}</p>
            </DetailBlock>
          </Col>

          {/* Right - Customer/contact/shipping/billing */}
          <Col md={4}>
            <DetailBlock title="Customer">
              <p>{order.first_name} {order.last_name}</p>
              <p>{order.email}</p>
              <p><Badge color="info">{order.customer_type || "Regular"}</Badge></p>
            </DetailBlock>

            <DetailBlock title="Contact Information">
              <p>{order.contact_phone || "N/A"}</p>
              <p>{order.email}</p>
            </DetailBlock>

            <DetailBlock title="Shipping Address">
              <p>{order.shipping_address || "N/A"}</p>
            </DetailBlock>

            <DetailBlock title="Billing Address">
              <p>{order.billing_address || order.shipping_address || "N/A"}</p>
            </DetailBlock>

            <DetailBlock title="Notes">
              <p>{order.notes || "No notes for this order."}</p>
            </DetailBlock>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderDetails;