import React, { useMemo } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";

const Address = () => {
  const data = [
    {
      id: 1,
      address_line_1: "123 Main St",
      address_line_2: "Near Park",
      apt_name_or_number: "Apt 4B",
    },
    {
      id: 2,
      address_line_1: "456 Oak Ave",
      address_line_2: "Business District",
      apt_name_or_number: "Suite 101",
    }
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
        header: "Address Line 1",
        accessorKey: "address_line_1",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Address Line 2",
        accessorKey: "address_line_2",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Apt Name/Number",
        accessorKey: "apt_name_or_number",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell) => (
          <div className="d-flex gap-3">
            <Link to={`/edit-address/${cell.row.original.id}`} className="text-success">
              <i className="mdi mdi-pencil font-size-18"></i>
            </Link>
            <a href="#" className="text-danger" onClick={() => handleDelete(cell.row.original.id)}>
              <i className="mdi mdi-delete font-size-18"></i>
            </a>
          </div>
        ),
      },
    ],
    []
  );

  const handleDelete = (id: number) => {
    console.log("Delete address", id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Users" breadcrumbItem="Addresses" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-end mb-4">
                    <Link to="/add-address">
                      <Button color="primary">Add New Address</Button>
                    </Link>
                  </div>

                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isPagination={true}
                    SearchPlaceholder="Search addresses..."
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

export default Address;
