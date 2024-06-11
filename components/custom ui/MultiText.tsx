"use client";

import { useState } from "react";

import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextForTagProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export const MultiTextForTag: React.FC<MultiTextForTagProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1 text-white">
            {item}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-1"
              onClick={() => onRemove(item)}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

interface MultiTextProps {
  placeholder: string;
  value: { label: string; quantity: number }[];
  onChange: (item: { label: string; quantity: number }) => void;
  onRemove: (label: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [quantityValue, setQuantityValue] = useState<number>(0);

  const addValue = (item: string, quantity: number) => {
    if (item.trim() && !value.some((v) => v.label === item)) {
      onChange({ label: item, quantity });
    }
    setInputValue("");
    setQuantityValue(0);
  };

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue(inputValue, quantityValue);
            }
          }}
        />
        <Input
          placeholder="Quantity"
          type="number"
          value={quantityValue}
          onChange={(e) => setQuantityValue(Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue(inputValue, quantityValue);
            }
          }}
        />
      </div>

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className="bg-grey-1 text-white">
            {item.label} - {item.quantity}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-1"
              onClick={() => onRemove(item.label)}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

// interface MultiTextForSytleProps {
//   placeholder: string;
//   value: { label: string; quantity: number;price: number }[];
//   onChange: (item: { label: string; quantity: number;price: number }) => void;
//   onRemove: (label: string) => void;
// }

// export const MultiTextForStyle: React.FC<MultiTextForSytleProps> = ({
//   placeholder,
//   value,
//   onChange,
//   onRemove,
// }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [quantityValue, setQuantityValue] = useState<number>(0);
//   const [priceValue, setPriceValue] = useState<number>(0);

//   const addValue = (item: string, quantity: number,price:number) => {
//     if (item.trim() && !value.some((v) => v.label === item)) {
//       onChange({ label: item, quantity,price });
//     }
//     setInputValue("");
//     setQuantityValue(0);
//     setPriceValue(0);
//   };

//   return (
//     <>
//       <div className="flex gap-2 relative tooltip" data-tooltip={"Style - Quantity - Price"}>
//         <Input
//           placeholder={placeholder}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               addValue(inputValue, quantityValue,priceValue);
//             }
//           }}
//           />
//         <Input
//           placeholder="Quantity"
//           type="number"
//           value={quantityValue}
//           onChange={(e) => setQuantityValue(Number(e.target.value))}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               addValue(inputValue, quantityValue,priceValue);
//             }
//           }}
//           />
//           <Input
//           placeholder="Price"
//           type="number"
//           value={priceValue}
//           onChange={(e) => setPriceValue(Number(e.target.value))}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               addValue(inputValue, quantityValue,priceValue);
//             }
//           }}
//         />
//       </div>

//       <div className="flex gap-1 flex-wrap mt-4">
//         {value.map((item, index) => (
//           <Badge key={index} className="bg-grey-1 text-white">
//             {item.label} - {item.quantity} - {item.price}
//             <button
//               className="ml-1 rounded-full outline-none hover:bg-red-1"
//               onClick={() => onRemove(item.label)}
//               type="button"
//             >
//               <X className="h-3 w-3" />
//             </button>
//           </Badge>
//         ))}
//       </div>
//     </>
//   );
// };

export default MultiText;
