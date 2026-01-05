"use client"

import { useState, useEffect, useRef } from "react"
import { Product, CartItem, Cart } from "@/lib/types"

const CART_STORAGE_KEY = "terpenos-cart"

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  })
  const isInitialized = useRef(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        // Validate the parsed cart structure
        if (parsed && typeof parsed === 'object' && Array.isArray(parsed.items)) {
          setCart(parsed)
        }
      }
      isInitialized.current = true
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      // Clear invalid data
      localStorage.removeItem(CART_STORAGE_KEY)
      isInitialized.current = true
    }
  }, [])

  // Save cart to localStorage whenever it changes (but skip initial empty state)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isInitialized.current) return // Don't save until we've loaded from localStorage
    
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [cart])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id)
      
      if (existingItem) {
        // Update existing item quantity
        const updatedItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        
        return calculateCartTotals(updatedItems)
      } else {
        // Add new item
        const newItem: CartItem = { product, quantity }
        const updatedItems = [...prevCart.items, newItem]
        
        return calculateCartTotals(updatedItems)
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.product.id !== productId)
      return calculateCartTotals(updatedItems)
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
      
      return calculateCartTotals(updatedItems)
    })
  }

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0
    })
  }

  const calculateCartTotals = (items: CartItem[]): Cart => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    
    return {
      items,
      total: Math.round(total * 100) / 100, // Round to 2 decimal places
      itemCount
    }
  }

  const getItemQuantity = (productId: string): number => {
    const item = cart.items.find(item => item.product.id === productId)
    return item ? item.quantity : 0
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity
  }
} 