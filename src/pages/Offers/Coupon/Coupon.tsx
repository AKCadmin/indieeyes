import React, { useMemo } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";

const Coupon = () => {
  const data = [
    {
      id: 1,
      code: "FIRST50",
      amount: 50,
      active: true,
      min_order_value: 500,
    },
    {
      id: 2,
      code: "SAVE20",
      amount: 20,
      active: false,
      min_order_value: 200,
    },
  ];

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Code",
        accessorKey: "code",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell) => `₹${cell.getValue()}`,
      },
      {
        header: "Active",
        accessorKey: "active",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell) => (
          <span className={`badge bg-${cell.getValue() ? "success" : "danger"}`}>
            {cell.getValue() ? "Yes" : "No"}
          </span>
        ),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell) => (
          <div className="d-flex gap-3">
            <Link to={`/edit-coupon/${cell.row.original.id}`} className="text-success">
              <i className="mdi mdi-pencil font-size-18" />
            </Link>
            <Link to="#" className="text-danger" onClick={() => handleDelete(cell.row.original.id)}>
              <i className="mdi mdi-delete font-size-18" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const handleDelete = (id: number) => {
    console.log("Delete coupon", id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Offers" breadcrumbItem="Coupons" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-end mb-4">
                    <Link to="/add-coupon">
                      <Button color="primary">Add New Coupon</Button>
                    </Link>
                  </div>

                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isPagination={true}
                    SearchPlaceholder="Search coupons..."
                    pagination="pagination"
                    paginationWrapper="dataTables_paginate paging_simple_numbers"
                    tableClass="table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Coupon;
