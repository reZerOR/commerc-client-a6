import { TProduct } from '@/hooks/product.hook';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem extends TProduct {
  userQuantity: number;
}

interface CartStore {
  items: CartItem[];
  userEmail: string | null;
  addItem: (item: TProduct) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setUserEmail: (email: string) => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      userEmail: null,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i._id === item._id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i._id === item._id ? { ...i, userQuantity: i.userQuantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, userQuantity: 1 }] };
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== itemId),
        })),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i._id === itemId ? { ...i, userQuantity:quantity } : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      setUserEmail: (email) => set({ userEmail: email }),
    }),
    {
      name: 'cart_storage',
      partialize: (state) => ({ items: state.items, userEmail: state.userEmail }),
    }
  )
)

export default useCartStore

