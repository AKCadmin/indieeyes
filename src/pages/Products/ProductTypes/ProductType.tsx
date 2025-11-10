import React, { useMemo } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";

const ProductType = () => {
  const data = [
    {
      id: 1,
      name: "Sunglasses",
      isTint: true,
      image: "sunglasses.jpg",
    },
    {
      id: 2,
      name: "Square",
      isTint: false,
      image: "square.jpg",
    }
  ];

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell) => cell.getValue(),
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Is Tint",
        accessorKey: "isTint",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell) => cell.getValue() ? "Yes" : "No",
      },
      {
        header: "Image",
        accessorKey: "image",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell) => (
          <img 
            src={cell.getValue()} 
            alt="Product Type"
            style={{ height: "40px" }}
          />
        ),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell) => (
          <div className="d-flex gap-3">
            <Link to={`/edit-product-type/${cell.row.original.id}`} className="text-success">
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
    console.log("Delete product type", id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Products" breadcrumbItem="Product Types" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-end mb-4">
                    <Link to="/add-product-type">
                      <Button color="primary">Add New Product Type</Button>
                    </Link>
                  </div>

                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isPagination={true}
                    SearchPlaceholder="Search product types..."
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

export default ProductType;
