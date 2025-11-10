import React, { useMemo } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";

const Dimension = () => {
  const data = [
    {
      id: 1,
      size: "Medium",
      image: "dimension1.jpg",
      lensWidth: "52mm",
      bridgeWidth: "18mm",
      templeLength: "140mm",
      lensHeight: "43mm",
    },
    {
      id: 2,
      size: "Low",
      image: "dimension.jpg",
      lensWidth: "5mm",
      bridgeWidth: "1mm",
      templeLength: "10mm",
      lensHeight: "4mm",
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
        header: "Size",
        accessorKey: "size",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Image",
        accessorKey: "image",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell) => (
          <img 
            src={cell.getValue()} 
            alt="Dimension"
            style={{ height: "40px" }}
          />
        ),
      },
      {
        header: "Lens Width",
        accessorKey: "lensWidth",
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
            <Link to={`/edit-dimension/${cell.row.original.id}`} className="text-success">
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
    console.log("Delete dimension", id);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Products" breadcrumbItem="Dimensions" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-end mb-4">
                    <Link to="/add-dimension">
                      <Button color="primary">Add New Dimension</Button>
                    </Link>
                  </div>

                  <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isPagination={true}
                    SearchPlaceholder="Search dimensions..."
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

export default Dimension;
