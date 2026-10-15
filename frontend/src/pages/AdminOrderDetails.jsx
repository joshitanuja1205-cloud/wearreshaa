
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
const STATUSES = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];
function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

 function AdminOrderDetails() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [selectedStatus, setSelectedStatus] = useState("Pending");
const [savingStatus, setSavingStatus] = useState(false);
const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    let active = true;

    async function loadOrder() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/admin/orders/${orderId}`
        );

        if (!response.data?.success) {
          throw new Error("Could not load order details.");
        }

        if (active) {
          setOrder(response.data.order);
          setSelectedStatus(
    response.data.order.orderStatus || "Pending"
  );
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load this order."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadOrder();

    return () => {
      active = false;
    };
  }, [orderId]);
  const handleStatusUpdate = async () => {
  try {
    setSavingStatus(true);
    setStatusMessage("");
    setError("");

    const response = await api.patch(
      `/admin/orders/${orderId}/status`,
      { orderStatus: selectedStatus }
    );

    if (!response.data?.success) {
      throw new Error("Could not update order status.");
    }

    setOrder((current) => ({
      ...current,
      orderStatus: selectedStatus,
    }));

    setStatusMessage("Order status updated successfully.");
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Could not update order status."
    );
  } finally {
    setSavingStatus(false);
  }
};

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f6f1] p-8">
        Loading order details...
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#f8f6f1] p-8">
        <p className="text-red-700">
          {error || "Order not found."}
        </p>
        <Link
          to="/admin/orders"
          className="mt-4 inline-block underline"
        >
          Back to orders
        </Link>
      </main>
    );
  }

  const address = order.shippingAddress || {};

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 py-8 text-[#25251f] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/admin/orders"
          className="text-sm underline underline-offset-4"
        >
          ← Back to orders
        </Link>

        <header className="mb-8 mt-5">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            RESHAA · Order management
          </p>
          <h1 className="mt-2 break-all text-2xl font-semibold sm:text-3xl">
            Order #{order._id}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Placed {formatDate(order.createdAt)}
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Customer
            </h2>
            <p className="font-medium">
              {address.name || order.user?.name || "—"}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {order.user?.email || "No email"}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {address.phone || order.user?.phone || "No phone"}
            </p>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Shipping address
            </h2>
            <p>{address.address || "—"}</p>
            <p className="mt-1">
              {[address.city, address.state]
                .filter(Boolean)
                .join(", ") || "—"}
            </p>
            <p className="mt-1">
              PIN: {address.pincode || "—"}
            </p>
          </section>
        </div>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-5 text-lg font-semibold">
            Products
          </h2>

          {!order.items?.length ? (
            <p className="text-sm text-gray-500">
              No product items found.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {order.items.map((item, index) => (
                <div
                  key={item._id || `${item.product?._id || "item"}-${index}`}
                  className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-medium">
                      {item.name ||
                        item.product?.name ||
                        "Product"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Size: {item.size || "—"} · Colour:{" "}
                      {item.color?.name || "—"} · Qty:{" "}
                      {item.quantity || 0}
                    </p>
                  </div>
                  <p className="font-medium">
                    ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 0)
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Payment
            </h2>
            <p>
              Method: {order.paymentMethod || "—"}
            </p>
            <p className="mt-2">
              Status: {order.paymentStatus || "—"}
            </p>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Order total
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-gray-600">Subtotal</span>
                <span>
                  ₹{Number(order.subtotal || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-600">Shipping</span>
                <span>
                  ₹{Number(order.shippingFee || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between gap-3 border-t border-gray-200 pt-3 text-base font-semibold">
                <span>Total</span>
                <span>
                  ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              Order status:{" "}
              <span className="font-medium text-[#25251f]">
                {order.orderStatus || "Pending"}
              </span>
            </p>
          </section>
          <section className="rounded-2xl border border-gray-200 bg-white p-5">
  <h2 className="mb-4 text-lg font-semibold">
    Manage order status
  </h2>

  <label
    htmlFor="orderStatus"
    className="mb-2 block text-sm text-gray-600"
  >
    New status
  </label>

  <select
    id="orderStatus"
    value={selectedStatus}
    onChange={(event) => {
      setSelectedStatus(event.target.value);
      setStatusMessage("");
    }}
    disabled={savingStatus}
    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
  >
    {STATUSES.map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </select>

  <button
    type="button"
    onClick={handleStatusUpdate}
    disabled={
      savingStatus ||
      selectedStatus === order.orderStatus
    }
    className="mt-4 rounded-full bg-[#241f1d] px-5 py-2.5 text-sm text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {savingStatus ? "Saving..." : "Save Status"}
  </button>

  {statusMessage && (
    <p className="mt-3 text-sm text-green-700" role="status">
      {statusMessage}
    </p>
  )}
</section>
        </div>
      </div>
    </main>
  );
}

export default AdminOrderDetails;
