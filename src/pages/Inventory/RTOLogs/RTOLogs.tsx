import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { apiClient1, apiHandler } from "../../../utils/api-handler";
import moment from "moment";

interface RTOLogItem {
  id: number;
  rto_awb: string;
  reason: string;
  rto_status: string;
  rto_date: string;
  original_awb: string;
  courier: string;
  order_number: string;
  order_status: string;
  customer_name: string;
}

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}

interface RTOLogsResponse {
  success: boolean;
  data: RTOLogItem[];
  pagination?: PaginationMeta;
  meta?: PaginationMeta;
}

const RTOLogs = () => {
  const [rtologs, setRTOLogs] = useState<RTOLogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchRTOLogs = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching RTO logs from:", `/shipments/rto-logs?page=${pagination.page}&limit=${pagination.limit}`);
        const response = await apiHandler.get<RTOLogsResponse>(
          apiClient1,
          `/shipments/rto-logs?page=${pagination.page}&limit=${pagination.limit}`
        );

        console.log("RTO logs response:", response);

        if (response?.success) {
          console.log("Setting RTO logs with data:", response.data);
          setRTOLogs(response.data || []);

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
        console.error("Error fetching RTO logs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRTOLogs();
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

  const getRTOStatusBadge = (status: string) => {
    const badgeMap: { [key: string]: string } = {
      QC_PASSED_RESTOCKED: "success",
      QC_FAILED: "danger",
      IN_QC: "warning",
      IN_TRANSIT: "info",
      RECEIVED: "primary",
    };
    return badgeMap[status] || "secondary";
  };

  const getOrderStatusBadge = (status: string) => {
    const badgeMap: { [key: string]: string } = {
      processing: "info",
      "admin cancelled": "danger",
      completed: "success",
      pending: "warning",
      cancelled: "danger",
    };
    return badgeMap[status] || "secondary";
  };

  const columns = useMemo(
    () => [
      {
        header: "Order Number",
        accessorKey: "order_number",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Customer Name",
        accessorKey: "customer_name",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Original AWB",
        accessorKey: "original_awb",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "RTO AWB",
        accessorKey: "rto_awb",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Courier",
        accessorKey: "courier",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Reason",
        accessorKey: "reason",
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        header: "RTO Status",
        accessorKey: "rto_status",
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const badgeTone = getRTOStatusBadge(status);
          return (
            <span className={`badge text-bg-${badgeTone}`}>
              {status?.replace(/_/g, " ") || "—"}
            </span>
          );
        },
      },
      {
        header: "Order Status",
        accessorKey: "order_status",
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ getValue }) => {
          const status = getValue() as string;
          const badgeTone = getOrderStatusBadge(status);
          return (
            <span className={`badge text-bg-${badgeTone}`}>
              {status || "—"}
            </span>
          );
        },
      },
      {
        header: "RTO Date",
        accessorKey: "rto_date",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell: any) => (
          <span>{moment(cell.row.original.rto_date).format("DD/MM/YYYY HH:mm")}</span>
        ),
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="RTO Logs" breadcrumbItem="RTO Logs" />

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
                      data={rtologs || []}
                      isGlobalFilter={true}
                      isAddButton={false}
                      isCustomPageSize={false}
                      isPagination={false}
                      SearchPlaceholder="Search RTO logs..."
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

export default RTOLogs;
