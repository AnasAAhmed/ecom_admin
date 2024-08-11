// "use client"

// import { useState } from "react";
// import { Loader, Trash } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "../ui/button";
// import toast from "react-hot-toast";

// interface DeleteProps {
//   item: string;
//   id: string;
// }

// const Delete: React.FC<DeleteProps> = ({ item, id }) => {
//   const [loading, setLoading] = useState(false);

//   const onDelete = async () => {
//     try {
//       setLoading(true)
//       const itemType = item === "product" ? "products" : "collections"
//       const res = await fetch(`/api/${itemType}/${id}`, {
//         method: "DELETE",
//       })

//       if (res.ok) {
//         setLoading(false)
//         window.location.href = (`/${itemType}`)
//         toast.success(`${item} deleted`)
//       }
//     } catch (err) {
//         setLoading(false)
//         console.log(err)
//       toast.error("Something went wrong! Please try again.")
//     }
//   }
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger>
//         <Button className="bg-red-1 text-white">
//           <Trash className="h-4 w-4" />
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="bg-white text-grey-1">
//         <AlertDialogHeader>
//           <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete your {item}.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>{loading?<Loader/>:"Delete"}</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default Delete;

"use client";

import { useState } from "react";
import { Loader, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // State to manage modal visibility

  const onDelete = async () => {
    try {
      setLoading(true);
      const itemType = item === "product" ? "products" :item === "order"?"orders": "collections";
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.href = `/${itemType}`;
        setLoading(false);
        setOpen(false); // Close the modal
        toast.success(`${item} deleted`);
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (err) {
      setLoading(false);
      setOpen(false); // Close the modal
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-red-1 hover:border-none hover:text-white border border-gray-300" onClick={() => setOpen(true)}>
          {/* <Trash className="h-4 w-4" /> */}
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
          <Button disabled={loading} className="bg-red-1 disabled:opacity-35 text-white" onClick={onDelete}>
            {loading ? <Loader className="animate-spin mx-[0.8rem]" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
