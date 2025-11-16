import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "../../components/Common/withRouter";

import { Badge, Button, Card, CardBody, ButtonGroup, Row, Col } from "reactstrap";
import EcommerceOrdersModal from "../Orders/Orders/AddOrders";
import { apiClient1, apiHandler } from "../../utils/api-handler";
import { REFUNDS_API } from "../../utils/url-helper";
import { toast } from "react-toastify";

import TableContainer from "../../components/Common/TableContainer";
import { Link } from "react-router-dom";

const RefundOrders = () => {
  const [modal1, setModal1] = useState(false);
  const [transaction, setTransaction] = useState("");
  const [refunds, setRefunds] = useState([]);
  const [filterType, setFilterType] = useState("all");

  // Fetch refunds data
  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await apiHandler.get(apiClient1, REFUNDS_API);

        if (response.success && Array.isArray(response.data)) {
          const formattedRefunds = response.data.map((refund) => ({
            id: refund.id,
            orderId: refund.order_id || refund.refund_id,
            billingName: `${refund.first_name || ""} ${refund.last_name || ""}`.trim() || "Unknown",
            orderDate: new Date(refund.refund_date || refund.created_at).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            ),
            orderDate_raw: new Date(refund.refund_date || refund.created_at),
            total: `₹${parseFloat(refund.amount).toFixed(2)}`,
            paymentStatus: "Refund",
            paymentMethod: refund.payment_method || "N/A",
          }));
          setRefunds(formattedRefunds);
        } else {
          throw new Error(response.message || "Invalid refunds data format");
        }
      } catch (err: any) {
        console.error("Error fetching refunds:", err);
        toast.error("Error fetching refunds: " + err.message);
      }
    };
    fetchRefunds();
  }, []);

  // Filter data based on time period
  const getFilteredData = () => {
    const currentDate = new Date();
    let filtered = [...refunds];

    switch (filterType) {
      case "week":
        const weekAgo = new Date();
        weekAgo.setDate(currentDate.getDate() - 7);
        filtered = filtered.filter(
          (refund) => refund.orderDate_raw >= weekAgo
        );
        break;
      case "month":
        const monthAgo = new Date();
        monthAgo.setMonth(currentDate.getMonth() - 1);
        filtered = filtered.filter(
          (refund) => refund.orderDate_raw >= monthAgo
        );
        break;
      case "year":
        const yearAgo = new Date();
        yearAgo.setFullYear(currentDate.getFullYear() - 1);
        filtered = filtered.filter(
          (refund) => refund.orderDate_raw >= yearAgo
        );
        break;
      default:
        break;
    }

    return filtered;
  };

  const columns = useMemo(
    () => [
      {
        header: () => <input type="checkbox" className="form-check-input" />,
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return <input type="checkbox" className="form-check-input" />;
        },
      },
      {
        header: "Refund ID",
        accessorKey: "orderId",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <Link to="#" className="text-body fw-bold">
              {cellProps.row.original.orderId}
            </Link>
          );
        },
      },
      {
        header: "Customer Name",
        accessorKey: "billingName",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Refund Date",
        accessorKey: "orderDate",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Refund Amount",
        accessorKey: "total",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Status",
        accessorKey: "paymentStatus",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <Badge color="warning" className="font-size-11">
              {cellProps.row.original.paymentStatus}
            </Badge>
          );
        },
      },
      {
        header: "Original Payment",
        accessorKey: "paymentMethod",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <span>
              <i
                className={
                  (cellProps.row.original.paymentMethod === "Paypal"
                    ? "fab fa-cc-paypal me-1"
                    : "" ||
                      cellProps.row.original.paymentMethod === "Mastercard"
                    ? "fab fa-cc-mastercard me-1"
                    : "" ||
                      cellProps.row.original.paymentMethod === "Visa"
                    ? "fab fa-cc-visa me-1"
                    : "")
                }
              />{" "}
              {cellProps.row.original.paymentMethod}
            </span>
          );
        },
      },
      {
        header: "View Details",
        enableColumnFilter: false,
        enableSorting: true,
        accessorKey: "view",
        cell: (cellProps) => {
          return (
            <Button
              type="button"
              color="warning"
              className="btn-sm btn-rounded"
              onClick={() => {
                toggleViewModal();
                setTransaction(cellProps.row.original);
              }}
            >
              View Refund
            </Button>
          );
        },
      },
    ],
    []
  );

  const toggleViewModal = () => setModal1(!modal1);
  const filteredData = getFilteredData();

  return (
    <React.Fragment>
      <EcommerceOrdersModal
        isOpen={modal1}
        toggle={toggleViewModal}
        transaction={transaction}
      />
      <Card>
        <CardBody>
          <Row className="mb-4">
            <Col md={6}>
              <div className="h4 card-title mb-0">Refund Orders</div>
            </Col>
            <Col md={6}>
              <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                <ButtonGroup>
                  <Button
                    color={filterType === "all" ? "primary" : "dark"}
                    onClick={() => setFilterType("all")}
                    outline={filterType !== "all"}
                    size="sm"
                  >
                    <i className="bx bx-globe me-1"></i>
                    All Time
                  </Button>
                  <Button
                    color={filterType === "week" ? "primary" : "dark"}
                    onClick={() => setFilterType("week")}
                    outline={filterType !== "week"}
                    size="sm"
                  >
                    <i className="bx bx-calendar me-1"></i>
                    Week
                  </Button>
                  <Button
                    color={filterType === "month" ? "primary" : "dark"}
                    onClick={() => setFilterType("month")}
                    outline={filterType !== "month"}
                    size="sm"
                  >
                    <i className="bx bx-calendar-check me-1"></i>
                    Month
                  </Button>
                  <Button
                    color={filterType === "year" ? "primary" : "dark"}
                    onClick={() => setFilterType("year")}
                    outline={filterType !== "year"}
                    size="sm"
                  >
                    <i className="bx bx-calendar-event me-1"></i>
                    Year
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
          <TableContainer
            columns={columns}
            data={filteredData}
            isGlobalFilter={true}
            tableClass="align-middle table-nowrap mb-0"
            theadClass="table-light"
            SearchPlaceholder="Search refunds..."
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

RefundOrders.propTypes = {
  latestTransaction: PropTypes.array,
};

export default withRouter(RefundOrders);
