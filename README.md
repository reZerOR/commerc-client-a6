# Full-Stack E-commerce Platform

A comprehensive e-commerce platform with user and admin dashboards.

## Project Description

A full-stack web application that enables users to browse, purchase products, and manage orders with a robust admin interface for complete store management. Features separate dashboards for users and administrators, secure payment processing, and inventory management.

## Features

### User Features
- Product browsing and searching
- Category-based filtering
- Shopping cart management
- Secure checkout with payment gateway integration
- Personal dashboard for order management
- Order history tracking

### Admin Features
- User management (CRUD operations)
- Product management system
- Category management
- Order oversight
- Payment tracking
- Inventory management

## Technology Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React Query
- ShadcnUI
- justand

### Backend
- Node.js/Express.js
- MongoDB
- JWT Authentication
- TypeScript
- Mongoose ODM

## Installation Guidelines

### Prerequisites
- Node.js (v16 or higher)
- npm/yarn
- MongoDB (local or Atlas URI)

### Installation Steps

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies and run project
```bash
# Frontend dependencies
cd [repository]
npm install --force
npm run dev
```

3. Set up environment variables:
Create `.env` files in both frontend and backend directories:

Frontend `.env`:
```env
SERVER_BASE_API=http://localhost:5000
NEXT_PUBLIC_SERVER_BASE_API=http://localhost:5000
```

4. Access the application at `http://localhost:3000`

### For server check this repository https://github.com/reZerOR/ecommerce-server-a6.git

## Core Pages

### User Interface
- Landing Page with product showcase
- Product listing/details pages
- Shopping cart
- Checkout system
- User dashboard
- Order tracking
- Authentication pages

### Admin Interface
- Admin dashboard
- User management
- Product management
- Category management
- Order management
- Payment tracking

## Additional Features
- Responsive design
- Custom error pages
- Scroll to top functionality
- Pagination
- Toast notifications for error handling
- Image upload capability
- Real-time inventory tracking
- Search functionality
- Filter and sort capabilities