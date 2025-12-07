# Retail Sales Management System

# Hosted URL - https://retail-sales-app.onrender.com/

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing and analyzing retail sales data with advanced search, filtering, sorting, and pagination capabilities.

## Features

### Core Functionality
- **Full-Text Search**: Search across customer names and phone numbers (case-insensitive)
- **Multi-Select Filters**: Filter by region, gender, age range, product category, tags, payment method, and date range
- **Advanced Sorting**: Sort by date, quantity, or customer name (ascending/descending)
- **Pagination**: Navigate through large datasets with 10 items per page
- **State Preservation**: All search, filter, and sort states are preserved during pagination

### Technical Highlights
- Clean, modular architecture with separation of concerns
- Efficient MongoDB indexing for optimal query performance
- RESTful API design
- Responsive React UI with custom hooks
- Debounced search for better performance
- Professional-grade error handling

## Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Helper functions (CSV import)
│   │   └── index.js           # Server entry point
│   ├── scripts/
│   │   └── runImport.js       # CSV import script
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service layer
│   │   ├── styles/            # CSS files
│   │   └── main.jsx           # App entry point
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd retail-sales-management
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/retail_sales" >> .env
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

## Running the Application

### 1. Start MongoDB

```bash
# Using MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Import CSV Data

Place your CSV file in the backend directory, then run:

```bash
cd backend
npm run import path/to/your/sales_data.csv
```

### 3. Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### GET `/api/sales`
Get sales data with filters, search, sort, and pagination

**Query Parameters:**
- `search` - Search term for customer name/phone
- `regions` - Comma-separated regions
- `genders` - Comma-separated genders
- `ageMin` - Minimum age
- `ageMax` - Maximum age
- `categories` - Comma-separated product categories
- `tags` - Comma-separated tags
- `paymentMethods` - Comma-separated payment methods
- `dateFrom` - Start date (YYYY-MM-DD)
- `dateTo` - End date (YYYY-MM-DD)
- `sortBy` - Sort field (date, quantity, customerName)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number
- `limit` - Items per page

**Example:**
```
GET /api/sales?search=john&regions=East,West&sortBy=date&sortOrder=desc&page=1&limit=10
```

### GET `/api/sales/filters`
Get available filter options (distinct values)

**Response:**
```json
{
  "success": true,
  "data": {
    "regions": ["East", "West", "North", "South"],
    "genders": ["Male", "Female"],
    "categories": ["Beauty", "Electronics", ...],
    "tags": ["organic", "premium", ...],
    "paymentMethods": ["UPI", "Credit Card", ...]
  }
}
```

### GET `/api/sales/statistics`
Get sales statistics based on current filters

## Database Schema

### Sale Model
- **Transaction Info**: transactionId, date
- **Customer**: customerId, customerName, phoneNumber, gender, age, customerRegion, customerType
- **Product**: productId, productName, brand, productCategory, tags[]
- **Sales**: quantity, pricePerUnit, discountPercentage, totalAmount, finalAmount
- **Operational**: paymentMethod, orderStatus, deliveryType, storeId, storeLocation, salespersonId, employeeName

### Indexes
- Text index on `customerName` and `phoneNumber` for full-text search
- Single field indexes on frequently filtered fields
- Compound indexes for common query patterns

## Frontend Components

- **SalesDashboard**: Main page container
- **SearchBar**: Debounced search input
- **FilterPanel**: Multi-filter sidebar
- **MultiSelect**: Reusable multi-select dropdown
- **SortControls**: Sort by and order controls
- **SalesTable**: Data table with formatted columns
- **Pagination**: Page navigation with ellipsis

## Performance Optimizations

1. **Database Indexing**: Strategic indexes on all filterable fields
2. **Pagination**: Limits data transfer and rendering overhead
3. **Debounced Search**: Reduces API calls during typing
4. **Batch CSV Import**: Processes large files in chunks
5. **React Hooks**: Memoized callbacks prevent unnecessary re-renders

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for hot reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Uses Vite for instant HMR
```

### Production Build
```bash
# Frontend
cd frontend
npm run build  # Creates optimized production build

# Backend
cd backend
npm start  # Runs production server
```

## Testing

### Manual API Testing with curl

```bash
# Get sales with filters
curl "http://localhost:5000/api/sales?search=john&regions=East&page=1"

# Get filter options
curl "http://localhost:5000/api/sales/filters"

# Get statistics
curl "http://localhost:5000/api/sales/statistics?regions=East,West"
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `backend/.env`
- Verify MongoDB port (default: 27017)

### CSV Import Fails
- Verify CSV file path is correct
- Check CSV format matches expected schema
- Ensure MongoDB has sufficient disk space

### Frontend Can't Connect to Backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Check browser console for CORS errors

## License

MIT

## Contributors

Dikshant Badawadagi