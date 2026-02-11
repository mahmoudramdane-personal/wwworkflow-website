import { createContext, useState } from 'react'

const CartContext = createContext()

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  function addToCart(newItem) {
    setCartOpen(true)

    if(cart.length === 0) {
      setCart([newItem])
    } else {
      let newCart = []
      let added = false
      
      cart.map(item => {
        if (item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
          added = true
        } 
      })

      if(!added) {
        newCart = [...cart, newItem]
      }

      setCart(newCart)
    }
  }

  function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter(item => item.id !== itemToRemove)
    setCart(updatedCart)

    if (cart.length === 1) {
      setCartOpen(false)
    }
  }

  return (
    <CartContext.Provider value={{ 
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      removeCartItem
    }}>
      {children}
    </CartContext.Provider>
  )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }