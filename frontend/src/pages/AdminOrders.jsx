
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const STATUSES = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [filter, setFilter] = useState("All");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/orders");

      if (!response.data?.success) {
        throw new Error("Could not load orders.");
      }

      setOrders(response.data.orders || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load orders. Please sign in with an admin account."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (orderId, orderStatus) => {
    try {
      setUpdatingId(orderId);
      setError("");

      const response = await api.patch(
        `/admin/orders/${orderId}/status`,
        { orderStatus }
      );

      if (!response.data?.success) {
        throw new Error("Status update failed.");
      }

      setOrders((current) =>
        current.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus }
            : order
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not update the order status."
      );
    } finally {
      setUpdatingId("");
    }
  };

  const visibleOrders =
    filter === "All"
      ? orders
      : orders.filter(
          (order) => order.orderStatus === filter
        );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f6f1] px-5 py-12">
        <p className="text-gray-600">Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 py-8 text-[#25251f] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gray-500">
              RESHAA · Store management
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Orders
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              View customer orders and manage their status.
            </p>
          </div>

          <button
            onClick={loadOrders}
            className="rounded-full border border-gray-300 px-5 py-2.5 text-sm hover:bg-white"
          >
            Refresh orders
          </button>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Total orders</p>
            <p className="mt-2 text-3xl font-semibold">
              {orders.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-semibold">
              {
                orders.filter(
                  (order) => order.orderStatus === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-gray-200 bg-white p-5 sm:col-span-1">
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="mt-2 text-3xl font-semibold">
              {
                orders.filter(
                  (order) => order.orderStatus === "Delivered"
                ).length
              }
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <h2 className="font-semibold">All orders</h2>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
              aria-label="Filter orders by status"
            >
              <option value="All">All statuses</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {visibleOrders.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-500">
              No orders found for this filter.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {visibleOrders.map((order) => (
                <article
                  key={order._id}
                  className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_1fr_auto]"
                >
                  <div className="min-w-0">
                    <p className="break-all text-xs text-gray-500">
                      Order ID: {order._id}
                    </p>
                    <p className="mt-2 font-medium">
                      {order.shippingAddress?.name ||
                        order.user?.name ||
                        "Customer"}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {order.shippingAddress?.phone ||
                        order.user?.phone ||
                        "No phone"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">
                      ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {order.items?.length || 0} item type(s) ·{" "}
                      {order.paymentMethod}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Payment: {order.paymentStatus}
                    </p>
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="mt-2 inline-block text-sm underline underline-offset-4"
                    >
                      View details
                    </Link>
                  </div>

                  <div className="lg:w-40">
                    <label className="mb-1 block text-xs text-gray-500">
                      Order status
                    </label>
                    <select
                      value={order.orderStatus}
                      disabled={updatingId === order._id}
                      onChange={(event) =>
                        updateStatus(order._id, event.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {updatingId === order._id && (
                      <p className="mt-1 text-xs text-gray-500">
                        Saving...
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
