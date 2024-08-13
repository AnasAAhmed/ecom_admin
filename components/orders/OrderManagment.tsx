'use client';

import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { LoaderIcon, Trash2 } from 'lucide-react';
import Delete from '../custom ui/Delete';
import { DropSearch } from '../custom ui/DataTable';
import CopyText from '../custom ui/CopyText';
type OrderManageProps = {
  orderId: string;
  currentStatus: string;
};

const OrderManagement = ({ orderId, currentStatus }: OrderManageProps) => {
  const [loadingUp, setLoadingUp] = useState(false);
  const [newStatus, setNewStatus] = useState(currentStatus);


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
        toast.error(`Internal server error ${res.statusText}`);
        setLoadingUp(false);
      }
    } catch (err) {
      setLoadingUp(false);
      console.error(err);
      toast.error(`Internal server error ${err}`);
    }
  };

  const statusOptions = ["Delivered", "Canceled", "Shipped", "Processing", "Shipped(COD)", "Canceled(COD)", "Delivered(COD)", "Processing(COD)"];

  return (
    <div className="flex flex-wrap gap-3 items-center py-5">
      <DropSearch currentValue={newStatus} setSearchValue={setNewStatus} values={statusOptions} />
      <Delete item={"order"} id={orderId} />
      {newStatus!==currentStatus&&<Button className="bg-blue-1 hover:opacity-55 text-white" onClick={handleSubmit}>
        {loadingUp ? <LoaderIcon className='mx-[7px] animate-spin' /> : "Save"}
      </Button>}
    </div>
  );
};

export default OrderManagement;
