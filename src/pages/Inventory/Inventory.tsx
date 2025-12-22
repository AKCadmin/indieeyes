import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "../../components/Common/TableContainer";
import Spinners from "../../components/Common/Spinner";
import { apiClient1, apiHandler } from "../../utils/api-handler";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";

interface InventoryItem {
  id: number;
  variant_id: number;
  warehouse_id: number;
  quantity: number;
  reserved_quantity: number;
  damaged_quantity: number;
  product_id?: number;
  product_name?: string;
  ProductVariant?: {
    id: number;
    // variant_sku: string;
    // color: string | null;
    // size: string | null;
    // mrp: string;
    // cost_price: string;
    product_id: number;
    Product?: {
      id: number;
      strapi_product_id?: number;
      sku: string;
      type: string;
      status: string;
    };
  };
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

interface InventoryResponse {
  success: boolean;
  data: InventoryItem[];
  pagination: PaginationMeta;
}

const Inventory = () => {
  const [inventories, setInventories] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [modal, setModal] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedInventory, setSelectedInventory] = useState<InventoryItem | null>(null);
  // const [deleteModal, setDeleteModal] = useState(false);
  // const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const response = await apiHandler.get<InventoryResponse>(
          apiClient1,
          `/inventory?page=${pagination.page}&limit=${pagination.limit}`
        );

        if (response?.success) {
          const normalizedInventory = (response.data || []).map((item: any) => {
            const derivedId =
              item?.id ??
              item?.inventory_stock_id ??
              item?.inventory_id ??
              item?.inventoryId ??
              item?._id ??
              item?.variant_id ??
              item?.product_id;
            const productId =
              item?.product_id ??
              item?.ProductVariant?.product_id ??
              item?.ProductVariant?.Product?.id ??
              item?.ProductVariant?.Product?.strapi_product_id;
            const productName =
              item?.product_name ??
              item?.ProductVariant?.Product?.sku ??
              item?.ProductVariant?.Product?.type ??
              "";

            const numericId = Number(derivedId);

            return {
              ...item,
              id: Number.isFinite(numericId) ? numericId : Number.NaN,
              product_id: productId !== undefined ? Number(productId) : undefined,
              product_name: productName,
            } as InventoryItem;
          });

          setInventories(normalizedInventory);

          if (response.pagination) {
            const serverPagination = response.pagination;
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
        console.error("Error fetching inventory:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
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

  const currencyFormatter = (value?: string) => {
    if (!value) return "₹0.00";
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return value;
    return `₹${numeric.toFixed(2)}`;
  };

  const columns = useMemo(
    () => [
      {
        header: "Product ID",
        accessorKey: "product_id",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Product Name",
        accessorKey: "product_name",
        enableColumnFilter: false,
        enableSorting: true,
      },
      
      {
        header: "Quantity",
        accessorKey: "quantity",
        enableColumnFilter: false,
        enableSorting: true,
      },
      
      {
        header: "Actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cell: any) => (
          <div className="d-flex gap-3">
            <span
              className="text-success"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const selectedId =
                  cell.row.original?.id ??
                  cell.row.original?.inventory_stock_id ??
                  cell.row.original?.inventory_id ??
                  cell.row.original?.inventoryId ??
                  cell.row.original?._id ??
                  cell.row.original?.variant_id ??
                  cell.row.original?.product_id;

                const productId = cell.row.original?.product_id;

                setSelectedInventoryId(Number.isFinite(Number(selectedId)) ? Number(selectedId) : null);
                setSelectedProductId(Number.isFinite(Number(productId)) ? Number(productId) : null);
                setSelectedInventory(cell.row.original);
                setModal(true);
              }}
            >
              <i className="mdi mdi-pencil font-size-18"></i>
            </span>
            {/* <a
              href="#"
              className="text-danger"
              onClick={() => {
                setDeleteId(cell.row.original.id);
                setDeleteModal(true);
              }}
            >
              <i className="mdi mdi-delete font-size-18"></i>
            </a> */}
          </div>
        ),
      },
    ],
    []
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: selectedInventory?.quantity || 0,
      remarks: "",
    },
    validationSchema: Yup.object({
      quantity: Yup.number().required("Quantity is required").integer("Must be an integer").min(0, "Quantity cannot be negative"),
    }),
    onSubmit: async (values) => {
      if (selectedProductId === null || Number.isNaN(Number(selectedProductId))) {
        toast.error("Missing product identifier", { autoClose: 2000 });
        return;
      }
      try {
        const response = await apiHandler.put(apiClient1, `/inventory/${selectedProductId}`, {
          quantity: parseInt(values.quantity.toString()),
          remarks: values.remarks,
        });
        if (response.success) {
          toast.success(response.message || "Stock updated successfully", { autoClose: 2000 });
          // Update the inventory list
          setInventories((prev) =>
            prev.map((item) =>
              item.id === selectedInventoryId ? { ...item, quantity: parseInt(values.quantity.toString()) } : item
            )
          );
          setModal(false);
          validation.resetForm();
        } else {
          toast.error(response.message || "Failed to update stock", { autoClose: 2000 });
        }
      } catch (error) {
        toast.error("Failed to update stock", { autoClose: 2000 });
      }
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Inventory" breadcrumbItem="Inventory" />

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
                  </div>

                  {isLoading ? (
                    <Spinners setLoading={setIsLoading} />
                  ) : (
                    <TableContainer
                      columns={columns}
                      data={inventories || []}
                      isGlobalFilter={true}
                      isAddButton={false}
                      isCustomPageSize={false}
                      isPagination={false}
                      SearchPlaceholder="Search inventory..."
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
        <ModalHeader toggle={() => setModal(!modal)}>Update Stock</ModalHeader>
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
            <Button type="submit" color="primary">Update</Button>
            <Button onClick={() => setModal(false)} className="ms-2">Cancel</Button>
          </Form>
        </ModalBody>
      </Modal>

      {/* <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
        <ModalHeader toggle={() => setDeleteModal(!deleteModal)}>Confirm Delete</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this inventory item?</p>
          <Button color="danger" onClick={handleDelete}>Delete</Button>
          <Button onClick={() => setDeleteModal(false)} className="ms-2">Cancel</Button>
        </ModalBody>
      </Modal> */}
    </React.Fragment>
  );
};

export default Inventory;
