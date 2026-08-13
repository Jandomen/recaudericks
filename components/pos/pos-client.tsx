"use client";

import { useState } from "react";
import { Cart } from "@/components/pos/cart";
import {
  PaymentDialog,
  type PaymentResult,
} from "@/components/pos/payment-dialog";
import { ProductGrid } from "@/components/pos/product-grid";
import { ProductSearch } from "@/components/pos/product-search";
import { Receipt, type ReceiptData } from "@/components/pos/receipt";
import { usePos } from "@/hooks/use-pos";
import type { Category, Product } from "@/types/product";

export function PosClient({
  products,
  categories,
  cashierName,
}: {
  products: Product[];
  categories: Category[];
  cashierName: string;
}) {
  const {
    cart,
    search,
    setSearch,
    categoryId,
    setCategoryId,
    filteredProducts,
  } = usePos(products);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState(0);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  function handleComplete(result: PaymentResult) {
    setPaymentOpen(false);
    setReceipt({
      saleId: result.saleId,
      items: cart.items.map((item) => ({
        name: item.name,
        unit: item.unit,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
      subtotal: cart.subtotal,
      total: cart.subtotal,
      paymentMethod: result.paymentMethod,
      amountReceived: result.amountReceived,
      change: result.change,
      sellerName: cashierName,
    });
    cart.clear();
  }

  if (receipt) {
    return (
      <div className="py-8">
        <Receipt receipt={receipt} onNewSale={() => setReceipt(null)} />
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        <ProductSearch
          search={search}
          onSearchChange={setSearch}
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
          categories={categories}
        />
        <ProductGrid products={filteredProducts} onAdd={cart.addItem} />
      </div>

      <div className="lg:sticky lg:top-4 lg:h-[calc(100svh-9rem)]">
        <Cart
          items={cart.items}
          subtotal={cart.subtotal}
          itemCount={cart.itemCount}
          onSetQuantity={cart.setQuantity}
          onRemove={cart.removeItem}
          onCheckout={() => {
            setCheckoutId((current) => current + 1);
            setPaymentOpen(true);
          }}
          onClear={cart.clear}
        />
      </div>

      <PaymentDialog
        key={checkoutId}
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        total={cart.subtotal}
        items={cart.items}
        onComplete={handleComplete}
      />
    </div>
  );
}
