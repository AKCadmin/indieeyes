import React, { useMemo, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { apiClient1, apiHandler } from "../../utils/api-handler";
import { CUSTOMERS_API } from "../../utils/url-helper";
import { toast } from "react-toastify";
import { ButtonGroup, Button, Row, Col } from "reactstrap";
import TableContainer from '../../components/Common/TableContainer';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [filterType, setFilterType] = useState("all");

    const columns = useMemo(
        () => [
            {
                header: 'Customer Name',
                accessorKey: 'name',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Email',
                accessorKey: 'email',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Location',
                accessorKey: 'location',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Join Date',
                accessorKey: 'join_date',
                enableColumnFilter: false,
                enableSorting: true,
            },
        ],
        []
    );

    // Fetch customers data
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await apiHandler.get(apiClient1, CUSTOMERS_API);

                if (response.success && Array.isArray(response.data)) {
                    const formattedCustomers = response.data.map((customer) => ({
                        id: customer.id,
                        name: customer.name,
                        email: customer.email,
                        location: customer.location || "N/A",
                        join_date: new Date(customer.join_date).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            }
                        ),
                        join_date_raw: new Date(customer.join_date),
                    }));
                    setCustomers(formattedCustomers);
                } else {
                    throw new Error(response.message || "Invalid customers data format");
                }
            } catch (err: any) {
                console.error("Error fetching customers:", err);
                toast.error("Error fetching customers: " + err.message);
            }
        };
        fetchCustomers();
    }, []);

    // Filter data based on time period
    const getFilteredData = () => {
        const currentDate = new Date();
        let filtered = [...customers];

        switch (filterType) {
            case "week":
                const weekAgo = new Date();
                weekAgo.setDate(currentDate.getDate() - 7);
                filtered = filtered.filter(
                    (customer) => customer.join_date_raw >= weekAgo
                );
                break;
            case "month":
                const monthAgo = new Date();
                monthAgo.setMonth(currentDate.getMonth() - 1);
                filtered = filtered.filter(
                    (customer) => customer.join_date_raw >= monthAgo
                );
                break;
            case "year":
                const yearAgo = new Date();
                yearAgo.setFullYear(currentDate.getFullYear() - 1);
                filtered = filtered.filter(
                    (customer) => customer.join_date_raw >= yearAgo
                );
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredData = getFilteredData();

    return (
        <div className="card">
            <div className="card-body">
                <Row className="mb-4">
                    <Col md={6}>
                        <h4 className="card-title mb-0">Customer List</h4>
                    </Col>
                    <Col md={6}>
                        <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                            <ButtonGroup>
                                <Button
                                    color={filterType === "all" ? "primary" : "dark"}
                                    onClick={() => setFilterType("all")}
                                    outline={filterType !== "all"}
                                    size="sm"
                                >
                                    <i className="bx bx-globe me-1"></i>
                                    All Time
                                </Button>
                                <Button
                                    color={filterType === "week" ? "primary" : "dark"}
                                    onClick={() => setFilterType("week")}
                                    outline={filterType !== "week"}
                                    size="sm"
                                >
                                    <i className="bx bx-calendar me-1"></i>
                                    Week
                                </Button>
                                <Button
                                    color={filterType === "month" ? "primary" : "dark"}
                                    onClick={() => setFilterType("month")}
                                    outline={filterType !== "month"}
                                    size="sm"
                                >
                                    <i className="bx bx-calendar-check me-1"></i>
                                    Month
                                </Button>
                                <Button
                                    color={filterType === "year" ? "primary" : "dark"}
                                    onClick={() => setFilterType("year")}
                                    outline={filterType !== "year"}
                                    size="sm"
                                >
                                    <i className="bx bx-calendar-event me-1"></i>
                                    Year
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
                <TableContainer
                    columns={columns}
                    data={filteredData || []}
                    isGlobalFilter={true}
                    isPagination={true}
                    SearchPlaceholder="Search customers..."
                    pagination="pagination"
                    paginationWrapper='dataTables_paginate paging_simple_numbers'
                    tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                />
            </div>
        </div>
    );
}

CustomerList.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

export default CustomerList;
