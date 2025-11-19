import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
} from "reactstrap"
// import img7 from "../../../assets/images/product/img-7.png"
// import img4 from "../../../assets/images/product/img-4.png"

const EcommerceOrdersModal = (props) => {
  const { isOpen, toggle, transaction } = props;
  // Debug: log incoming transaction to help trace empty modal issues
  // eslint-disable-next-line no-console
  console.log("EcommerceOrdersModal transaction:", transaction);

  const orderId = transaction?.orderId || transaction?.order_id || "#SKXXXX";
  const billingName = transaction?.billingName || `${transaction?.first_name || ""} ${transaction?.last_name || ""}`.trim() || "Unknown Customer";
  const orderDate = transaction?.orderDate || transaction?.order_date || transaction?.created_at || "-";
  const status = transaction?.paymentStatus || transaction?.status || transaction?.order_status || "pending";
  const paymentStatus = transaction?.paymentStatus || transaction?.payment_status || transaction?.payment_status_text || "pending";
  const total = transaction?.total || transaction?.amount || 0;

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="lg"
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div>
              <h5 className="mb-0">Order ID: <span className="text-primary">{orderId}</span></h5>
              <small className="text-muted">{orderDate}</small>
            </div>
            <div>
              <Badge color={status === "confirmed" || status === "paid" ? "success" : status === "refunded" ? "warning" : "danger"} className="me-2">
                {status}
              </Badge>
              <Badge color={paymentStatus === "success" || paymentStatus === "paid" ? "success" : "warning"}>{paymentStatus}</Badge>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={8}>
              <Card className="mb-3">
                <CardBody>
                  <h6 className="mb-3">Order Item</h6>
                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Product Name</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* If transaction.items exists, render them, otherwise show a single line from transaction */}
                        {Array.isArray(transaction?.items) && transaction.items.length ? (
                          transaction.items.map((it, idx) => (
                            <tr key={idx}>
                              <th scope="row">
                                <div>
                                  <img src={it.image || img7} alt="" className="avatar-sm" />
                                </div>
                              </th>
                              <td>
                                <div>
                                  <h5 className="text-truncate font-size-14">{it.name || it.product_name}</h5>
                                  <p className="text-muted mb-0">{it.qty || it.quantity || 1} x {it.price || it.unit_price || '0'}</p>
                                </div>
                              </td>
                              <td>{it.total || (it.price || it.unit_price) * (it.qty || it.quantity || 1) || 0}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <th scope="row">
                              <div>
                                <img src={img7} alt="" className="avatar-sm" />
                              </div>
                            </th>
                            <td>
                              <div>
                                <h5 className="text-truncate font-size-14">{transaction?.product_name || transaction?.item_name || "Product"}</h5>
                                <p className="text-muted mb-0">{transaction?.quantity || transaction?.qty || 1} x {transaction?.price || transaction?.unit_price || "0"}</p>
                              </div>
                            </td>
                            <td>{transaction?.total || transaction?.price || 0}</td>
                          </tr>
                        )}

                        <tr>
                          <td colSpan="2">
                            <h6 className="m-0 text-right">Sub Total:</h6>
                          </td>
                          <td>$ {transaction?.subtotal || total}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <h6 className="m-0 text-right">Shipping:</h6>
                          </td>
                          <td>{transaction?.shipping_fee ? `$ ${transaction.shipping_fee}` : "Free"}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <h6 className="m-0 text-right">Total:</h6>
                          </td>
                          <td>$ {total}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <Card className="mb-3">
                <CardBody>
                  <h6 className="mb-3">Order Summary</h6>
                  <p><strong>Subtotal:</strong> $ {transaction?.subtotal || total}</p>
                  <p><strong>Discount:</strong> {transaction?.discount ? `$ ${transaction.discount}` : "$0"}</p>
                  <p><strong>Shipping:</strong> {transaction?.shipping_fee ? `$ ${transaction.shipping_fee}` : "Free"}</p>
                  <p><strong>Total:</strong> <span className="fw-bold">$ {total}</span></p>
                  <p><strong>Payment:</strong> <Badge color={paymentStatus === "success" || paymentStatus === "paid" ? "success" : "warning"}>{paymentStatus}</Badge></p>
                </CardBody>
              </Card>

              <Card className="mb-3">
                <CardBody>
                  <h6 className="mb-3">Timeline</h6>
                  <p>{transaction?.timeline || "Order placed, awaiting updates..."}</p>
                </CardBody>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="mb-3">
                <CardBody>
                  <h6 className="mb-3">Customer</h6>
                  <p className="mb-1">{billingName}</p>
                  <p className="text-muted mb-1">{transaction?.email || transaction?.customer_email || ""}</p>
                  <p><Badge color="info">{transaction?.customer_type || "Regular"}</Badge></p>
                </CardBody>
              </Card>

              <Card className="mb-3">
                <CardBody>
                  <h6 className="mb-3">Contact Information</h6>
                  <p>{transaction?.contact_phone || transaction?.phone || "N/A"}</p>
                  <p className="text-muted">{transaction?.email || transaction?.customer_email || ""}</p>
                </CardBody>
              </Card>

              <Card className="mb-3">
                <CardBody>
                  <h6 className="mb-3">Shipping Address</h6>
                  <p>{transaction?.shipping_address || "N/A"}</p>
                </CardBody>
              </Card>

              <Card className="mb-3">
                <CardBody>
                  <h6 className="mb-3">Billing Address</h6>
                  <p>{transaction?.billing_address || transaction?.shipping_address || "N/A"}</p>
                </CardBody>
              </Card>

              <Card className="mb-3">
                <CardBody>
                  <h6 className="mb-3">Notes</h6>
                  <p>{transaction?.notes || "No notes for this order."}</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

EcommerceOrdersModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default EcommerceOrdersModal
