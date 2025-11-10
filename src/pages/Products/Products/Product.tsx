import React, { useMemo } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";

const Product = () => {
  // Sample data - replace with actual data fetch
  const data = [
    {
      id: 1,
      name: "Sample Product 1",
      price: 299,
      originalPrice: 399,
    },
    {
      id: 2,
      name: "Sample Product 2",
      price: 399,
      originalPrice: 499,
    },
    // ...more products
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
        header: "Price",
        accessorKey: "price",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => `$${cell.getValue()}`,
      },
      {
        header: "Original Price",
        accessorKey: "originalPrice",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => `$${cell.getValue()}`,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell) => (
          <div className="d-flex gap-3">
            <Link to={`/edit-product/${cell.row.original.id}`} className="text-success">
              <i className="mdi mdi-pencil font-size-18"></i>
            </Link>
            <a href="#" className="text-primary" onClick={() => handleDuplicate(cell.row.original.id)}>
              <i className="mdi mdi-content-copy font-size-18"></i>
            </a>
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
    console.log("Delete product", id);
  };

  const handleDuplicate = (id: number) => {
    console.log("Duplicate product", id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Products" breadcrumbItem="Product" />
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-end mb-4">
                    <Link to="/add-product">
                      <Button color="primary">
                        Add New Product
                      </Button>
                    </Link>
                  </div>

                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isPagination={true}
                    SearchPlaceholder="Search products..."
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

export default Product;
