import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { apiClient1, apiHandler } from "../../../utils/api-handler";
import moment from "moment";

interface StockLedgerItem {
  id: number;
  transaction_type: string;
  quantity: number;
  remarks: string;
  reference_id: string;
  created_at: string;
  product_name: string;
  sku: string;
  global_inventory_snapshot: number;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

interface StockLedgerResponse {
  success: boolean;
  data: StockLedgerItem[];
  pagination?: PaginationMeta;
  meta?: PaginationMeta;
}

const StockLedger = () => {
  const [ledgers, setLedgers] = useState<StockLedgerItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchStockLedger = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching stock ledger from:", `/inventory/stock-ledgers?page=${pagination.page}&limit=${pagination.limit}`);
        const response = await apiHandler.get<StockLedgerResponse>(
          apiClient1,
          `/inventory/stock-ledgers?page=${pagination.page}&limit=${pagination.limit}`
        );

        console.log("Stock ledger response:", response);

        if (response?.success) {
          console.log("Setting ledgers with data:", response.data);
          setLedgers(response.data || []);

          // Handle pagination - check for pagination, meta, or calculate from data length
          const serverPagination = response.pagination || response.meta;
          if (serverPagination) {
            const selectedLimit = pagination.limit;
            const derivedTotalPages =
              serverPagination.totalPages ||
              Math.max(1, Math.ceil((serverPagination.total || 0) / selectedLimit));

            console.log("Setting pagination:", {
              total: serverPagination.total,
              page: serverPagination.page || pagination.page,
              limit: selectedLimit,
              totalPages: derivedTotalPages,
            });

            setPagination((prev) => ({
              ...prev,
              total: serverPagination.total,
              page: serverPagination.page || prev.page,
              limit: selectedLimit,
              totalPages: derivedTotalPages,
            }));
          } else {
            // If no pagination info in response, calculate based on data length
            const dataLength = (response.data || []).length;
            console.log("No pagination in response, setting based on data length:", dataLength);
            setPagination((prev) => ({
              ...prev,
              total: dataLength,
              totalPages: 1,
            }));
          }
        } else {
          console.warn("API returned success: false or no success field");
        }
      } catch (error) {
        console.error("Error fetching stock ledger:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockLedger();
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

  const getTransactionTypeBadge = (type: string) => {
    const badgeMap: { [key: string]: string } = {
      IN_PURCHASE: "success",
      IN_RETURN: "info",
      IN_ADJUSTMENT: "warning",
      OUT_ORDER: "danger",
      OUT_DAMAGE: "secondary",
      OUT_ADJUSTMENT: "warning",
    };
    return badgeMap[type] || "primary";
  };

  const columns = useMemo(
    () => [
      {
        header: "Product Name",
        accessorKey: "product_name",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "SKU",
        accessorKey: "sku",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Transaction Type",
        accessorKey: "transaction_type",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <span className={`badge badge-${getTransactionTypeBadge(cell.row.original.transaction_type)}`}>
            {cell.row.original.transaction_type}
          </span>
        ),
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Remarks",
        accessorKey: "remarks",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "Reference ID",
        accessorKey: "reference_id",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Snapshot Qty",
        accessorKey: "global_inventory_snapshot",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Date",
        accessorKey: "created_at",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <span>{moment(cell.row.original.created_at).format("DD/MM/YYYY HH:mm")}</span>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Stock Ledger" breadcrumbItem="Stock Ledger" />

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
                      data={ledgers || []}
                      isGlobalFilter={true}
                      isAddButton={false}
                      isCustomPageSize={false}
                      isPagination={false}
                      SearchPlaceholder="Search stock ledger..."
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
                            <Link className="page-link" to="#" onClick={(e) => { e.preventDefault(); handlePageChange(pagination.page - 1); }}>
                              <i className="mdi mdi-chevron-left"></i>
                            </Link>
                          </li>
                          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
                            <li key={pageNumber} className={`page-item ${pagination.page === pageNumber ? "active" : ""}`}>
                              <Link className="page-link" to="#" onClick={(e) => { e.preventDefault(); handlePageChange(pageNumber); }}>
                                {pageNumber}
                              </Link>
                            </li>
                          ))}
                          <li className={`page-item ${pagination.page >= totalPages ? "disabled" : ""}`}>
                            <Link className="page-link" to="#" onClick={(e) => { e.preventDefault(); handlePageChange(pagination.page + 1); }}>
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
    </React.Fragment>
  );
};

export default StockLedger;
