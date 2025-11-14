import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "../../components/Common/withRouter";

import { Badge, Button, Card, CardBody } from "reactstrap";
import EcommerceOrdersModal from "../Orders/Orders/AddOrders";

import TableContainer from "../../components/Common/TableContainer";
import { latestTransaction } from "../../common/data/dashboard";
import { Link } from "react-router-dom";

const RefundOrders = () => {
  const [modal1, setModal1] = useState(false);
  const [transaction, setTransaction] = useState("");

  // Filter only refund transactions
  const refundTransactions = latestTransaction.filter(
    (transaction) => transaction.paymentStatus === "Refund"
  );

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

  return (
    <React.Fragment>
      <EcommerceOrdersModal
        isOpen={modal1}
        toggle={toggleViewModal}
        transaction={transaction}
      />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">Refund Orders</div>
          <TableContainer
            columns={columns}
            data={refundTransactions}
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
