import React from 'react'
import EditProducts from './EditProducts'
import AddProduct from './AddProduct'
import EditUsers from './EditUsers'

const AdminPage = () => (
  <div className="admin-page">
    <div className="edit-products">
      <AddProduct />
      <EditProducts />
    </div>
    <EditUsers />
  </div>
)

export default AdminPage
