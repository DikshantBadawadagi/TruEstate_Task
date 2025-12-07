import React from 'react';
import '../styles/SalesTable.css';

const SalesTable = ({ sales }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Region</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Final Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.transactionId}</td>
              <td>{formatDate(sale.date)}</td>
              <td className="customer-cell">
                <div className="customer-name">{sale.customerName}</div>
                <div className="customer-meta">{sale.gender}, {sale.age}</div>
              </td>
              <td>{sale.phoneNumber}</td>
              <td>{sale.customerRegion}</td>
              <td className="product-cell">
                <div className="product-name">{sale.productName}</div>
                <div className="product-brand">{sale.brand}</div>
              </td>
              <td>
                <span className="category-badge">{sale.productCategory}</span>
              </td>
              <td className="quantity-cell">{sale.quantity}</td>
              <td>{formatCurrency(sale.totalAmount)}</td>
              <td className="final-amount-cell">{formatCurrency(sale.finalAmount)}</td>
              <td>{sale.paymentMethod}</td>
              <td>
                <span className={`status-badge status-${sale.orderStatus.toLowerCase()}`}>
                  {sale.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;