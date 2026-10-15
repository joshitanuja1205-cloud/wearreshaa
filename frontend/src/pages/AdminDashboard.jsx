
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const response = await api.get("/admin/orders");

        if (!response.data?.success) {
          throw new Error("Could not load dashboard data.");
        }

        if (active) {
          setOrders(response.data.orders || []);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load dashboard data."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const orderValue = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0
  );

  const stats = [
    { label: "Total orders", value: orders.length },
    { label: "Pending orders", value: pendingOrders },
    { label: "Delivered orders", value: deliveredOrders },
    { label: "Total order value", value: formatCurrency(orderValue) },
  ];

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 py-8 text-[#25251f] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gray-500">
              RESHAA · Store management
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome to your store overview.
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="inline-flex w-fit items-center rounded-full bg-[#25251f] px-5 py-3 text-sm text-white transition hover:opacity-90"
          >
            Manage orders →
          </Link>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-gray-600">
            Loading store overview...
          </p>
        ) : !error ? (
          <>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
                >
                  <p className="text-sm text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 break-words text-3xl font-semibold">
                    {stat.value}
                  </p>
                </article>
              ))}
            </section>

            <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-gray-200 p-5">
                <div>
                  <h2 className="font-semibold">Recent orders</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Latest orders placed in your store.
                  </p>
                </div>
                <Link
                  to="/admin/orders"
                  className="shrink-0 text-sm underline underline-offset-4"
                >
                  View all
                </Link>
              </div>

              {orders.length === 0 ? (
                <p className="p-8 text-center text-sm text-gray-500">
                  No orders yet.
                </p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {orders.slice(0, 5).map((order) => (
                    <article
                      key={order._id}
                      className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="break-all text-xs text-gray-500">
                          Order #{order._id}
                        </p>
                        <p className="mt-1 font-medium">
                          {order.shippingAddress?.name ||
                            order.user?.name ||
                            "Customer"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-IN")
                            : "Date unavailable"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-left sm:text-right">
                          <p className="font-medium">
                            {formatCurrency(order.totalAmount)}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {order.orderStatus}
                          </p>
                        </div>

                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="shrink-0 text-sm underline underline-offset-4"
                        >
                          Details
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default AdminDashboard;
