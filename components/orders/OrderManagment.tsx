'use client';

import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import Loader from '../custom ui/Loader';
import { Button } from '../ui/button';
import { LoaderIcon, Trash2 } from 'lucide-react';
import Delete from '../custom ui/Delete';
type OrderManageProps = {
  orderId: string;
  currentStatus: string;
};

const OrderManagement = ({ orderId, currentStatus }: OrderManageProps) => {
  const [loadingDel, setLoadingDel] = useState(false);
  const [loadingUp, setLoadingUp] = useState(false);
  const [newStatus, setNewStatus] = useState(currentStatus);

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async () => {
    if (!newStatus) return;

    try {
      setLoadingUp(true);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLoadingUp(false);
        window.location.href = `/orders`;
        toast.success('Order status updated successfully');
      } else {
        throw new Error(`Error updating order: ${res.statusText}`);
      }
    } catch (err) {
      setLoadingUp(false);
      console.error(err);
      toast.error('Internal server error');
    }
  };

  const statusOptions = ["Delivered", "Canceled", "Shipped", "Processing", "Shipped(COD)", "Canceled(COD)", "Delivered(COD)", "Processing(COD)"];

  return (
    <div className="flex flex-wrap gap-3 items-center py-5">
      <select
        value={newStatus}
        onChange={handleStatusChange}
        className="p-2 border border-gray-300 rounded flex items-center space-x-1  focus:outline-none focus:ring focus:border-blue-400 cursor-pointer"
      >
        <option>{currentStatus}</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <Delete item={"order"} id={orderId} />
      <Button className="bg-blue-1 hover:opacity-55 text-white" onClick={handleSubmit}>
        {loadingUp ? <LoaderIcon className='mx-2 animate-spin' /> : "Save"}
      </Button>
    </div>
  );
};

export default OrderManagement;
