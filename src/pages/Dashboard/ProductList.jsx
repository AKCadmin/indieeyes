import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import TableContainer from '../../components/Common/TableContainer';

const ProductList = () => {
    const columns = useMemo(
        () => [
            {
                header: 'Product Name',
                accessorKey: 'name',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Category',
                accessorKey: 'position',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Price',
                accessorKey: 'salary',
                enableColumnFilter: false,
                enableSorting: true,
            },
            {
                header: 'Stock',
                accessorKey: 'age',
                enableColumnFilter: false,
                enableSorting: true,
            },
        ],
        []
    );

    const data = [
        {
            name: "Laptop Pro X1",
            position: "Electronics",
            age: 45,
            salary: "$1,200"
        },
        {
            name: "Wireless Mouse",
            position: "Accessories",
            age: 120,
            salary: "$25"
        },
        // Add more product data as needed
    ];

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title mb-4">Product List</h4>
                <TableContainer
                    columns={columns}
                    data={data || []}
                    isGlobalFilter={true}
                    isPagination={true}
                    SearchPlaceholder="Search products..."
                    pagination="pagination"
                    paginationWrapper='dataTables_paginate paging_simple_numbers'
                    tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                />
            </div>
        </div>
    );
}

ProductList.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

export default ProductList;
