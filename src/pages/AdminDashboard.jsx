import { useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { 
  LayoutDashboard, Package, ShoppingCart, TrendingUp, 
  Plus, Edit2, Trash2, AlertCircle, CheckCircle, XCircle,
  Upload, Link, Image, X, Camera, GripVertical
} from 'lucide-react'
import { formatPrice, formatDate } from '../lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminDashboard() {
  const { isAdmin, products, orders, updateProduct, addProduct, deleteProduct, declareSoldOut, updateOrderStatus } = useStore()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    lowStock: products.filter(p => p.stockCount < 10 && p.inStock).length,
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-bando-gold rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-bando-black" />
          </div>
          <div>
            <h1 className="heading-display text-2xl">Admin Dashboard</h1>
            <p className="text-bando-ash text-sm">Manage your store</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-blue-400' },
            { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-green-400' },
            { label: 'Revenue', value: formatPrice(stats.totalRevenue), icon: TrendingUp, color: 'text-bando-gold' },
            { label: 'Low Stock', value: stats.lowStock, icon: AlertCircle, color: 'text-red-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-bando-ash text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-bando-graphite/50 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-bando-gold text-bando-black'
                  : 'text-bando-ash hover:text-bando-white hover:bg-bando-charcoal'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6">
              <h2 className="font-display text-xl font-semibold mb-4">Recent Orders</h2>
              {orders.length === 0 ? (
                <p className="text-bando-ash text-center py-8">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-bando-ash text-sm border-b border-bando-graphite">
                        <th className="pb-3 pr-4">Order ID</th>
                        <th className="pb-3 pr-4">Date</th>
                        <th className="pb-3 pr-4">Total</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3">Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="border-b border-bando-graphite/30">
                          <td className="py-3 pr-4 font-mono text-sm">{order.id.slice(0, 8)}</td>
                          <td className="py-3 pr-4 text-sm text-bando-ash">{formatDate(order.createdAt)}</td>
                          <td className="py-3 pr-4 font-semibold">{formatPrice(order.total)}</td>
                          <td className="py-3 pr-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-bando-ash">{order.items.length} items</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">All Products</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>

            {/* Add/Edit Form */}
            <AnimatePresence>
              {(showAddForm || editingProduct) && (
                <ProductForm
                  product={editingProduct}
                  onSave={(productData) => {
                    if (editingProduct) {
                      // CRITICAL FIX: Pass the ORIGINAL editingProduct.id
                      // The form data may have a different or missing id
                      updateProduct(editingProduct.id, productData)
                    } else {
                      addProduct(productData)
                    }
                    setEditingProduct(null)
                    setShowAddForm(false)
                  }}
                  onCancel={() => {
                    setEditingProduct(null)
                    setShowAddForm(false)
                  }}
                />
              )}
            </AnimatePresence>

            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-bando-ash text-sm border-b border-bando-graphite bg-bando-black/30">
                      <th className="p-4">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Category</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-bando-graphite/30 hover:bg-bando-black/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                            <div>
                              <p className="font-medium text-sm">{product.name}</p>
                              {product.isGeorgeStinney && (
                                <span className="text-xs text-bando-gold">George Stinney</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold">{formatPrice(product.price)}</td>
                        <td className="p-4">
                          <span className={product.stockCount < 10 ? 'text-red-400' : 'text-bando-ash'}>
                            {product.stockCount}
                          </span>
                        </td>
                        <td className="p-4">
                          {product.inStock ? (
                            <span className="flex items-center gap-1 text-green-400 text-sm">
                              <CheckCircle className="w-4 h-4" /> In Stock
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-400 text-sm">
                              <XCircle className="w-4 h-4" /> Sold Out
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-bando-ash capitalize">{product.category}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-2 hover:bg-bando-graphite rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4 text-bando-ash" />
                            </button>
                            {product.inStock && (
                              <button
                                onClick={() => {
                                  if (confirm(`Declare "${product.name}" as sold out?`)) {
                                    declareSoldOut(product.id)
                                  }
                                }}
                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Mark Sold Out"
                              >
                                <AlertCircle className="w-4 h-4 text-yellow-400" />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${product.name}"?`)) {
                                  deleteProduct(product.id)
                                }
                              }}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="font-display text-xl font-semibold">All Orders</h2>
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-bando-ash text-sm border-b border-bando-graphite bg-bando-black/30">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-bando-graphite/30 hover:bg-bando-black/20 transition-colors">
                        <td className="p-4 font-mono text-sm">{order.id.slice(0, 12)}</td>
                        <td className="p-4 text-sm text-bando-ash">{formatDate(order.createdAt)}</td>
                        <td className="p-4 text-sm">{order.shippingAddress?.fullName || 'Guest'}</td>
                        <td className="p-4 font-semibold">{formatPrice(order.total)}</td>
                        <td className="p-4 text-sm text-bando-ash capitalize">{order.paymentMethod || 'N/A'}</td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-bando-black border border-bando-graphite rounded px-2 py-1 text-sm focus:border-bando-gold outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <button className="text-sm text-bando-gold hover:text-bando-gold-light">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {orders.length === 0 && (
                <p className="text-bando-ash text-center py-12">No orders yet</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ============================================
// Product Form Component with Image Upload
// ============================================
function ProductForm({ product, onSave, onCancel }) {
  const fileInputRef = useRef(null)
  const [imageMode, setImageMode] = useState('url')
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [previewImages, setPreviewImages] = useState(product?.images || [])
  
  const [newColorName, setNewColorName] = useState('')
  const [newColorHex, setNewColorHex] = useState('#0a0a0a')
  const [newSize, setNewSize] = useState('')
  const [newDetail, setNewDetail] = useState('')
  const [newCareItem, setNewCareItem] = useState('')
  
  const [formData, setFormData] = useState(
    product || {
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: 'tshirts',
      images: [],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Black', hex: '#0a0a0a' }],
      inStock: true,
      stockCount: 50,
      isNew: true,
      isBestseller: false,
      isGeorgeStinney: false,
      material: '',
      details: [],
      care: [],
    }
  )

  // ==================== IMAGE HANDLERS ====================
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setPreviewImages((prev) => [...prev, base64String])
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, base64String],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const handleAddUrlImage = () => {
    if (!imageUrlInput.trim()) return
    setPreviewImages((prev) => [...prev, imageUrlInput.trim()])
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrlInput.trim()],
    }))
    setImageUrlInput('')
  }

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  // ==================== COLOR HANDLERS ====================
  
  const handleAddColor = () => {
    if (!newColorName.trim()) return
    const colorExists = formData.colors.some(
      (c) => c.name.toLowerCase() === newColorName.toLowerCase()
    )
    if (colorExists) {
      alert('Color already exists!')
      return
    }
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }],
    }))
    setNewColorName('')
    setNewColorHex('#0a0a0a')
  }

  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }))
  }

  const handleUpdateColorHex = (index, newHex) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) => (i === index ? { ...c, hex: newHex } : c)),
    }))
  }

  // ==================== SIZE HANDLERS ====================
  
  const handleAddSize = () => {
    if (!newSize.trim()) return
    const sizeExists = formData.sizes.some(
      (s) => s.toLowerCase() === newSize.trim().toLowerCase()
    )
    if (sizeExists) {
      alert('Size already exists!')
      return
    }
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, newSize.trim().toUpperCase()],
    }))
    setNewSize('')
  }

  const handleRemoveSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }))
  }

  const handleMoveSize = (index, direction) => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === formData.sizes.length - 1) return
    
    const newSizes = [...formData.sizes]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newSizes[index], newSizes[targetIndex]] = [newSizes[targetIndex], newSizes[index]]
    
    setFormData((prev) => ({ ...prev, sizes: newSizes }))
  }

  // ==================== DETAILS HANDLERS ====================
  
  const handleAddDetail = () => {
    if (!newDetail.trim()) return
    setFormData((prev) => ({
      ...prev,
      details: [...(prev.details || []), newDetail.trim()],
    }))
    setNewDetail('')
  }

  const handleRemoveDetail = (index) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }))
  }

  const handleUpdateDetail = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details.map((d, i) => (i === index ? value : d)),
    }))
  }

  // ==================== CARE HANDLERS ====================
  
  const handleAddCareItem = () => {
    if (!newCareItem.trim()) return
    setFormData((prev) => ({
      ...prev,
      care: [...(prev.care || []), newCareItem.trim()],
    }))
    setNewCareItem('')
  }

  const handleRemoveCareItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      care: prev.care.filter((_, i) => i !== index),
    }))
  }

  const handleUpdateCareItem = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      care: prev.care.map((c, i) => (i === index ? value : c)),
    }))
  }

  // ==================== SUBMIT ====================
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.images.length === 0) {
      alert('Please add at least one product image')
      return
    }
    if (formData.colors.length === 0) {
      alert('Please add at least one color')
      return
    }
    if (formData.sizes.length === 0) {
      alert('Please add at least one size')
      return
    }
    onSave(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6"
    >
      <h3 className="font-display text-lg font-semibold mb-6">
        {product ? 'Edit Product' : 'Add New Product'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* ==================== IMAGE UPLOAD SECTION ==================== */}
        <div className="bg-bando-black/30 border border-bando-graphite/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-bando-gold" />
            <h4 className="font-semibold">Product Images</h4>
            <span className="text-xs text-bando-ash ml-auto">{previewImages.length} image(s)</span>
          </div>

          {previewImages.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-4">
              {previewImages.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                  <img 
                    src={img} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setImageMode('url')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                imageMode === 'url'
                  ? 'bg-bando-gold text-bando-black'
                  : 'bg-bando-graphite text-bando-ash hover:text-bando-white'
              }`}
            >
              <Link className="w-4 h-4" /> Image URL
            </button>
            <button
              type="button"
              onClick={() => setImageMode('file')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                imageMode === 'file'
                  ? 'bg-bando-gold text-bando-black'
                  : 'bg-bando-graphite text-bando-ash hover:text-bando-white'
              }`}
            >
              <Upload className="w-4 h-4" /> Upload File
            </button>
          </div>

          {imageMode === 'url' && (
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Paste image URL here..."
                className="flex-1 bg-bando-black border border-bando-graphite rounded-lg px-4 py-2 text-bando-white focus:border-bando-gold outline-none text-sm"
              />
              <button
                type="button"
                onClick={handleAddUrlImage}
                disabled={!imageUrlInput.trim()}
                className="btn-primary text-sm px-4"
              >
                Add
              </button>
            </div>
          )}

          {imageMode === 'file' && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-bando-graphite rounded-lg flex flex-col items-center gap-2 hover:border-bando-gold hover:bg-bando-gold/5 transition-all"
              >
                <Image className="w-8 h-8 text-bando-ash" />
                <p className="text-sm text-bando-ash">Click to browse or drag images here</p>
                <p className="text-xs text-bando-graphite">Supports JPG, PNG, WEBP</p>
              </button>
            </div>
          )}
        </div>

        {/* ==================== BASIC INFO ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              required
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., BANDO Classic Tee"
              className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2 text-bando-white focus:border-bando-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              value={formData.category || 'tshirts'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2 text-bando-white focus:border-bando-gold outline-none"
            >
              <option value="tshirts">T-Shirts</option>
              <option value="polos">Polos</option>
              <option value="jackets">Jackets</option>
              <option value="accessories">Accessories</option>
              <option value="george-stinney">George Stinney</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price (₦) *</label>
            <input
              required
              type="number"
              min="0"
              value={formData.price || 0}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2 text-bando-white focus:border-bando-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Original Price (₦) <span className="text-bando-graphite text-xs">(for sales)</span></label>
            <input
              type="number"
              min="0"
              value={formData.originalPrice || 0}
              onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) || 0 })}
              placeholder="Leave 0 if not on sale"
              className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2 text-bando-white focus:border-bando-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Stock Count *</label>
            <input
              required
              type="number"
              min="0"
              value={formData.stockCount || 0}
              onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
              className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2 text-bando-white focus:border-bando-gold outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Material</label>
            <input
              type="text"
              value={formData.material || ''}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              placeholder="e.g., 100% Premium Cotton"
              className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2 text-bando-white focus:border-bando-gold outline-none"
            />
          </div>
        </div>

        {/* ==================== DESCRIPTION ==================== */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the product..."
            rows={3}
            className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-2 text-bando-white focus:border-bando-gold outline-none"
          />
        </div>

        {/* ==================== COLORS EDITOR ==================== */}
        <div className="bg-bando-black/30 border border-bando-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-bando-graphite inline-block" />
              Colors
            </h4>
            <span className="text-xs text-bando-ash">{formData.colors?.length || 0} color(s)</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <AnimatePresence>
              {formData.colors?.map((color, index) => (
                <motion.div
                  key={`${color.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative">
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => handleUpdateColorHex(index, e.target.value)}
                        className="w-12 h-12 rounded-full border-2 border-bando-graphite cursor-pointer overflow-hidden p-0"
                        title="Click to change color"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-2.5 h-2.5 text-white" />
                      </button>
                    </div>
                    <span className="text-xs text-bando-ash">{color.name}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs text-bando-ash mb-1">Color Name</label>
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="e.g., Midnight Black"
                className="w-full bg-bando-black border border-bando-graphite rounded-lg px-3 py-2 text-sm text-bando-white focus:border-bando-gold outline-none"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
              />
            </div>
            <div>
              <label className="block text-xs text-bando-ash mb-1">Hex</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newColorHex}
                  onChange={(e) => setNewColorHex(e.target.value)}
                  className="w-10 h-10 rounded border border-bando-graphite cursor-pointer"
                />
                <span className="text-xs font-mono text-bando-ash">{newColorHex}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddColor}
              disabled={!newColorName.trim()}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-1 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* ==================== SIZES EDITOR ==================== */}
        <div className="bg-bando-black/30 border border-bando-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold flex items-center gap-2">
              <span className="text-sm">📏</span> Sizes
            </h4>
            <span className="text-xs text-bando-ash">{formData.sizes?.length || 0} size(s)</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <AnimatePresence>
              {formData.sizes?.map((size, index) => (
                <motion.div
                  key={`${size}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group flex items-center gap-1 bg-bando-charcoal border border-bando-graphite rounded-lg px-3 py-2"
                >
                  <button
                    type="button"
                    onClick={() => handleMoveSize(index, 'up')}
                    className="p-0.5 hover:text-bando-gold opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={index === 0}
                  >
                    <GripVertical className="w-3 h-3 rotate-90" />
                  </button>
                  <span className="text-sm font-medium min-w-[2rem] text-center">{size}</span>
                  <button
                    type="button"
                    onClick={() => handleMoveSize(index, 'down')}
                    className="p-0.5 hover:text-bando-gold opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={index === formData.sizes.length - 1}
                  >
                    <GripVertical className="w-3 h-3 -rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(index)}
                    className="ml-1 p-0.5 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <X className="w-3 h-3 text-red-400" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder="e.g., XXL, One Size, 30"
              className="flex-1 bg-bando-black border border-bando-graphite rounded-lg px-3 py-2 text-sm text-bando-white focus:border-bando-gold outline-none"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
            />
            <button
              type="button"
              onClick={handleAddSize}
              disabled={!newSize.trim()}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-1 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Add Size
            </button>
          </div>
          <p className="text-xs text-bando-graphite mt-2">Tip: Sizes are displayed in this order on the product page</p>
        </div>

        {/* ==================== PRODUCT DETAILS LIST ==================== */}
        <div className="bg-bando-black/30 border border-bando-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Product Details</h4>
            <span className="text-xs text-bando-ash">{formData.details?.length || 0} item(s)</span>
          </div>

          {formData.details?.length > 0 && (
            <div className="space-y-2 mb-4">
              <AnimatePresence>
                {formData.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-bando-gold text-xs">✓</span>
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleUpdateDetail(index, e.target.value)}
                      className="flex-1 bg-bando-black border border-bando-graphite rounded-lg px-3 py-1.5 text-sm text-bando-white focus:border-bando-gold outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDetail(index)}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
              placeholder="e.g., Premium heavyweight cotton fabric"
              className="flex-1 bg-bando-black border border-bando-graphite rounded-lg px-3 py-2 text-sm text-bando-white focus:border-bando-gold outline-none"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDetail())}
            />
            <button
              type="button"
              onClick={handleAddDetail}
              disabled={!newDetail.trim()}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-1 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* ==================== CARE INSTRUCTIONS ==================== */}
        <div className="bg-bando-black/30 border border-bando-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Care Instructions</h4>
            <span className="text-xs text-bando-ash">{formData.care?.length || 0} item(s)</span>
          </div>

          {formData.care?.length > 0 && (
            <div className="space-y-2 mb-4">
              <AnimatePresence>
                {formData.care.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-bando-ash text-xs">•</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleUpdateCareItem(index, e.target.value)}
                      className="flex-1 bg-bando-black border border-bando-graphite rounded-lg px-3 py-1.5 text-sm text-bando-white focus:border-bando-gold outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCareItem(index)}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={newCareItem}
              onChange={(e) => setNewCareItem(e.target.value)}
              placeholder="e.g., Machine wash cold, tumble dry low"
              className="flex-1 bg-bando-black border border-bando-graphite rounded-lg px-3 py-2 text-sm text-bando-white focus:border-bando-gold outline-none"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCareItem())}
            />
            <button
              type="button"
              onClick={handleAddCareItem}
              disabled={!newCareItem.trim()}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-1 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* ==================== TOGGLES ==================== */}
        <div className="bg-bando-black/30 border border-bando-graphite/50 rounded-xl p-6">
          <h4 className="font-semibold mb-4">Product Flags</h4>
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="rounded border-bando-graphite bg-bando-black text-bando-gold w-4 h-4"
              />
              <span className="text-sm">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="rounded border-bando-graphite bg-bando-black text-bando-gold w-4 h-4"
              />
              <span className="text-sm">New Arrival</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isGeorgeStinney}
                onChange={(e) => setFormData({ ...formData, isGeorgeStinney: e.target.checked })}
                className="rounded border-bando-graphite bg-bando-black text-bando-gold w-4 h-4"
              />
              <span className="text-sm">George Stinney Collection</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestseller}
                onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                className="rounded border-bando-graphite bg-bando-black text-bando-gold w-4 h-4"
              />
              <span className="text-sm">Bestseller</span>
            </label>
          </div>
        </div>

        {/* ==================== ACTION BUTTONS ==================== */}
        <div className="flex gap-3 pt-4 border-t border-bando-graphite/50">
          <button type="submit" className="btn-primary">
            {product ? 'Update Product' : 'Add Product'}
          </button>
          <button type="button" onClick={onCancel} className="btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}