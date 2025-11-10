import React, { useMemo } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";

const Materials = () => {
  const data = [
    {
      id: 1,
      name: "Acetate",
      features: "Lightweight, Durable, Hypoallergenic",
      createdAt: "2024-01-20",
    },
    {
      id: 2,
      name: "Metal",
      features: "Lightweight, Durable, Premium Feel",
      createdAt: "2024-01-21",
    },
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
        header: "Features",
        accessorKey: "features",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
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
            <Link to={`/edit-material/${cell.row.original.id}`} className="text-success">
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
    console.log("Delete material", id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Products" breadcrumbItem="Materials" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-end mb-4">
                    <Link to="/add-material">
                      <Button color="primary">Add New Material</Button>
                    </Link>
                  </div>

                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isPagination={true}
                    SearchPlaceholder="Search materials..."
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

export default Materials;
