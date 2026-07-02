// Runtime type validators (no TypeScript, just plain JS)

export function isValidProduct(product) {
  return (
    product &&
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.inStock === 'boolean' &&
    Array.isArray(product.sizes) &&
    Array.isArray(product.colors) &&
    Array.isArray(product.images)
  )
}

export function isValidCartItem(item) {
  return (
    item &&
    isValidProduct(item.product) &&
    typeof item.size === 'string' &&
    typeof item.color === 'string' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  )
}

export function isValidUser(user) {
  return (
    user &&
    typeof user.id === 'string' &&
    typeof user.email === 'string' &&
    typeof user.firstName === 'string' &&
    typeof user.isAdmin === 'boolean'
  )
}

export function isValidOrder(order) {
  return (
    order &&
    typeof order.id === 'string' &&
    typeof order.userId === 'string' &&
    Array.isArray(order.items) &&
    typeof order.total === 'number' &&
    ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(order.status) &&
    order.shippingAddress &&
    typeof order.shippingAddress.fullName === 'string' &&
    typeof order.paymentMethod === 'string'
  )
}

// Default export for convenience
export default {
  isValidProduct,
  isValidCartItem,
  isValidUser,
  isValidOrder,
}