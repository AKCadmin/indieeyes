// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Badge,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import { apiClient1, apiHandler } from "../../utils/api-handler";
import { toast } from "react-toastify";

interface ReturnProduct {
  rto_id: number;
  rto_awb: string;
  status: string;
  created_at: string;
  order_number: string;
  customer_name: string;
}

interface ReturnProductResponse {
  success: boolean;
  data: ReturnProduct[];
}

const ReturnProductsList = () => {
  const [returnProducts, setReturnProducts] = useState<ReturnProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch return products data
  useEffect(() => {
    const fetchReturnProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/qc/pending", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data: ReturnProductResponse = await response.json();
          if (data.success && Array.isArray(data.data)) {
            setReturnProducts(data.data);
          } else {
            toast.error("Invalid response format");
          }
        } else {
          toast.error("Failed to fetch return products");
        }
      } catch (err) {
        console.error("Error fetching return products:", err);
        toast.error("Error fetching return products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReturnProducts();
  }, []);

  const getStatusColor = (status: string) => {
    if (!status) return "warning";
    const statusLower = status.toLowerCase();
    if (statusLower.includes("delivered")) {
      return "success";
    } else if (statusLower.includes("pending")) {
      return "warning";
    } else if (statusLower.includes("in-transit")) {
      return "info";
    } else if (statusLower.includes("failed") || statusLower.includes("rejected")) {
      return "danger";
    }
    return "secondary";
  };

  const filteredProducts = returnProducts.filter(
    (product) =>
      product.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.rto_awb.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardBody>
        <Row className="mb-3">
          <Col md={6}>
            <h4 className="card-title mb-3">Return Products (QC Pending)</h4>
            <div className="input-group" style={{ maxWidth: "400px" }}>
              <span className="input-group-text">
                <i className="bx bx-search-alt"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by order, customer or AWB..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table className="table table-hover table-nowrap table-centered mb-0">
            <thead className="table-light">
              <tr>
                <th>RTO ID</th>
                <th>AWB Number</th>
                <th>Order Number</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.rto_id}>
                    <td className="fw-semibold">
                      <Link to="#" className="text-body">
                        #{product.rto_id}
                      </Link>
                    </td>
                    <td>
                      <code className="text-primary">{product.rto_awb}</code>
                    </td>
                    <td>
                      <Link to="#" className="text-body fw-bold">
                        {product.order_number}
                      </Link>
                    </td>
                    <td>{product.customer_name}</td>
                    <td>
                      <Badge
                        className={`font-size-11 badge-soft-${getStatusColor(
                          product.status
                        )}`}
                        color={getStatusColor(product.status)}
                        pill
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td>
                      {new Date(product.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="text-muted">
                      <i className="bx bx-inbox display-4 d-block mb-3"></i>
                      <h5 className="mb-1">No return products found</h5>
                      <p className="mb-0">
                        All QC checks are complete or no returns pending
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {!isLoading && (
          <div className="mt-3 text-muted text-end">
            <small>Total: {filteredProducts.length} return products</small>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ReturnProductsList;
