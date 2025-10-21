import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import TableContainer from '../../components/Common/TableContainer';

const CustomerList = () => {
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
                accessorKey: 'office',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Join Date',
                accessorKey: 'startDate',
                enableColumnFilter: false,
                enableSorting: true,
            },
        ],
        []
    );

    const data = [
        {
            name: "Jennifer Chang",
            email: "jennifer@example.com",
            office: "Singapore",
            startDate: "2010/11/14"
        },
        {
            name: "Gavin Joyce",
            email: "gavin@example.com",
            office: "Edinburgh",
            startDate: "2010/12/22"
        },
        // Add more customer data as needed
    ];

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4">Customer List</h4>
                <TableContainer
                    columns={columns}
                    data={data || []}
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
