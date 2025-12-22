import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { apiClient1, apiHandler } from "../../../utils/api-handler";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";

interface Product {
  id: number;
  product_id: string;
  name: string;
  price: string;
  original_price: string;
  description: string;
  brand_name: string;
  warranty: string;
  style: string;
  is_visible: boolean;
  similar_product: string | null;
  inventory: string | null;
  tags: string | null;
  hsn_code: string;
  gst: string;
  discount: string;
  size: string;
  return_policy: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ProductResponse {
  success: boolean;
  data: Product[];
  pagination: PaginationMeta;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [modal, setModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await apiHandler.get<ProductResponse>(
          apiClient1,
          `/products/strapi-list?page=${pagination.page}&limit=${pagination.limit}`
        );

        if (response?.success) {
          setProducts(response.data || []);

          if (response.pagination) {
            const serverPagination = response.pagination;
            // Keep the user-selected limit; some APIs always echo default limit=10.
            const selectedLimit = pagination.limit;
            const derivedTotalPages =
              serverPagination.totalPages ||
              Math.max(1, Math.ceil((serverPagination.total || 0) / selectedLimit));

            setPagination((prev) => ({
              ...prev,
              total: serverPagination.total,
              page: serverPagination.page || prev.page,
              limit: selectedLimit,
              totalPages: derivedTotalPages,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [pagination.page, pagination.limit]);

  const totalPages = useMemo(
    () => pagination.totalPages || Math.max(1, Math.ceil((pagination.total || 0) / (pagination.limit || 1))),
    [pagination.totalPages, pagination.total, pagination.limit]
  );

  const handlePageChange = (pageNumber: number) => {
    setPagination((prev) => {
      const clampedPage = Math.min(Math.max(pageNumber, 1), totalPages);
      if (clampedPage === prev.page) return prev;
      return { ...prev, page: clampedPage };
    });
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = Number(event.target.value) || 10;
    setPagination((prev) => ({
      ...prev,
      limit: selectedLimit,
      page: 1,
    }));
  };

  const startEntry = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endEntry = Math.min(pagination.page * pagination.limit, pagination.total);

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => cell.getValue(),
      },
      {
        header: "Product ID",
        accessorKey: "product_id",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Brand",
        accessorKey: "brand_name",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Price",
        accessorKey: "price",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => `₹${parseFloat(cell.getValue()).toFixed(2)}`,
      },
      {
        header: "Original Price",
        accessorKey: "original_price",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => `₹${parseFloat(cell.getValue()).toFixed(2)}`,
      },
      {
        header: "Discount",
        accessorKey: "discount",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => `${cell.getValue()}%`,
      },
      {
        header: "Size",
        accessorKey: "size",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Visible",
        accessorKey: "is_visible",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <span className={`badge ${cell.getValue() ? 'bg-success' : 'bg-danger'}`}>
            {cell.getValue() ? 'Yes' : 'No'}
          </span>
        ),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => (
          <Button color="primary" size="sm" onClick={() => { setSelectedProductId(cell.row.original.id); setModal(true); }}>Add Stock</Button>
        ),
      },
    ],
    []
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: "",
      warehouseId: 1,
      remarks: "",
    },
    validationSchema: Yup.object({
      quantity: Yup.number().required("Quantity is required").integer("Must be an integer"),
      warehouseId: Yup.number().required("Warehouse ID is required").integer("Must be an integer"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await apiHandler.post(apiClient1, "/inventory/add-stock", {
          strapiId: selectedProductId,
          quantity: parseInt(values.quantity),
          warehouseId: values.warehouseId,
          remarks: values.remarks,
        });
        if (response.success) {
          toast.success("Stock added successfully", { autoClose: 2000 });
          toast.info(`Current stock of the product is ${response.currentStock}`, { autoClose: 3000 });
          setModal(false);
          validation.resetForm();
        } else {
          toast.error(response.error || "Failed to add stock", { autoClose: 2000 });
        }
      } catch (error) {
        toast.error("Failed to add stock", { autoClose: 2000 });
      }
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Products" breadcrumbItem="Product" />
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                    <div className="d-flex align-items-center gap-2">
                      <label className="mb-0 text-muted">Show</label>
                      <select
                        className="form-select w-auto"
                        value={pagination.limit}
                        onChange={handlePageSizeChange}
                      >
                        {[10, 20, 30, 40, 50].map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      <span className="mb-0 text-muted">per page</span>
                    </div>

                    {/* <Link to="/add-product">
                      <Button color="primary">
                        Add New Product
                      </Button>
                    </Link> */}
                  </div>

                  {isLoading ? (
                    <Spinners setLoading={setIsLoading} />
                  ) : (
                    <TableContainer
                      columns={columns}
                      data={products || []}
                      isGlobalFilter={true}
                      isAddButton={false}
                      isCustomPageSize={false}
                      isPagination={false}
                      SearchPlaceholder="Search products..."
                      tableClass="align-middle table-nowrap dt-responsive nowrap w-100 table-check dataTable no-footer dtr-inline"
                      theadClass="table-light"
                      pagination="pagination"
                      paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                    />
                  )}

                  {!isLoading && (
                    <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mt-3 gap-2">
                      <div className="text-muted">
                        Showing <span className="fw-semibold">{startEntry}</span>-
                        <span className="fw-semibold">{endEntry}</span> of
                        <span className="fw-semibold"> {pagination.total}</span> entries
                      </div>
                      <nav>
                        <ul className="pagination pagination-rounded mb-0">
                          <li className={`page-item ${pagination.page <= 1 ? "disabled" : ""}`}>
                            <Link className="page-link" to="#" onClick={() => handlePageChange(pagination.page - 1)}>
                              <i className="mdi mdi-chevron-left"></i>
                            </Link>
                          </li>
                          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
                            <li key={pageNumber} className={`page-item ${pagination.page === pageNumber ? "active" : ""}`}>
                              <Link className="page-link" to="#" onClick={() => handlePageChange(pageNumber)}>
                                {pageNumber}
                              </Link>
                            </li>
                          ))}
                          <li className={`page-item ${pagination.page >= totalPages ? "disabled" : ""}`}>
                            <Link className="page-link" to="#" onClick={() => handlePageChange(pagination.page + 1)}>
                              <i className="mdi mdi-chevron-right"></i>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Add Stock</ModalHeader>
        <ModalBody>
          <Form onSubmit={validation.handleSubmit}>
            <FormGroup>
              <Label for="quantity">Quantity <span className="text-danger">*</span></Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={validation.values.quantity}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={!!(validation.touched.quantity && validation.errors.quantity)}
              />
              {validation.touched.quantity && validation.errors.quantity && (
                <FormFeedback>{validation.errors.quantity}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="warehouseId">Warehouse ID <span className="text-danger">*</span></Label>
              <Input
                type="number"
                id="warehouseId"
                name="warehouseId"
                value={validation.values.warehouseId}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={!!(validation.touched.warehouseId && validation.errors.warehouseId)}
              />
              {validation.touched.warehouseId && validation.errors.warehouseId && (
                <FormFeedback>{validation.errors.warehouseId}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="remarks">Remarks</Label>
              <Input
                type="textarea"
                id="remarks"
                name="remarks"
                value={validation.values.remarks}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
            </FormGroup>
            <Button type="submit" color="primary">Save</Button>
            <Button onClick={() => setModal(false)} className="ms-2">Cancel</Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Product;
