"use client"

import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orders/OrderColumns"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RefreshCw } from "lucide-react"

import { useCallback, useEffect, useState } from "react"

const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [refresh, setRefresh] = useState(false);


  const getOrders = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/orders`)
      const data = await res.json()
      setOrders(data)
      setLoading(false)
      } catch (err) {
      setLoading(false)
      console.log("[orders_GET", err)
    }
  }


  useEffect(() => {
    getOrders()
  }, [refresh])
  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable
        setRefresh={setRefresh}
        refresh={refresh}
        columns={columns}
        data={orders}
        loading={loading}
        searchKeys={['_id', 'status', 'totalAmount', 'customerClerkId', 'createdAt']}
      />
    </div>
  )
}

export const dynamic = "force-dynamic";

export default Orders