
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import Loader from "../custom ui/Loader";
import { MultiTextForTag } from "../custom ui/MultiText";
import { InfoIcon, LoaderIcon } from "lucide-react";
import { Label } from "../ui/label";


const formSchema = z.object({
  title: z.string().min(2).max(25),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()).max(4),
  category: z.string().min(2),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(
    z.object({
      size: z.string(),
      quantity: z.coerce.number().min(0),
    })
  ),
  colors: z.array(
    z.object({
      color: z.string(),
      quantity: z.coerce.number().min(0),
    })
  ),
  // styles: z.array(
  //   z.object({
  //     style: z.string(),
  //     quantity: z.coerce.number().min(0),
  //     price: z.coerce.number().min(0),
  //   })
  // ),
  stock: z.coerce.number().min(1),
  price: z.coerce.number().min(1),
  expense: z.coerce.number().min(1),
});

interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isSubmtting, setIsSubmtting] = useState(false);
  const [routing, setRouting] = useState(true);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const getCollections = async () => {
    try {
      const res = await fetch(`/api/collections`, {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
        ...initialData,
        collections: initialData.collections.map(
          (collection) => collection._id
        ),
        sizes: initialData.sizes.map((size: any) => ({
          size: size.size,
          quantity: size.quantity,
        })),
        colors: initialData.colors.map((color: any) => ({
          color: color.color,
          quantity: color.quantity,
        })),
        // styles: initialData.colors.map((style: any) => ({
        //   style: style.style,
        //   quantity: style.quantity,
        //   price: style.price,
        // })),
      }
      : {
        title: "",
        description: "",
        media: [],
        category: "",
        collections: [],
        tags: [],
        sizes: [],
        colors: [],
        // styles:[],
        stock: 0,
        price: 0,
        expense: 0,
      },
  });
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const handleReset = () => {
    form.reset(initialData
      ? {
        ...initialData,
        collections: initialData.collections.map((collection) => collection._id),
        sizes: initialData.sizes.map((size: any) => ({
          size: size.size,
          quantity: size.quantity,
        })),
        colors: initialData.colors.map((color: any) => ({
          color: color.color,
          quantity: color.quantity,
        })),
      }
      : {
        title: "",
        description: "",
        media: [],
        category: "",
        collections: [],
        tags: [],
        sizes: [],
        colors: [],
        stock: 0,
        price: 0,
        expense: 0,
      });
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmtting(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : `/api/products`;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        { routing && router.push("/products"), handleReset() };
        setIsSubmtting(false);
      }
    } catch (err) {
      setIsSubmtting(false);
      router.push("/products");
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        {initialData ? (
          <>
            <p className="text-heading2-bold">Edit Product</p>
            <Delete id={initialData._id} item="product" />
          </>

        ) : (
          <>
            <p className="text-heading2-bold">Create Product</p>
          </>

        )}
        <div className="flex gap-2 justify-center items-center">
          <Input type="checkBox" className="h-4 w-4 cursor-pointer" onChange={() => setRouting(!routing)} />
          <Label>No-Redirect</Label>
          <div className="relative tooltip" data-tooltip={"it won't redirect you back"}>
            <InfoIcon />
          </div>
        </div>
      </div>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />

          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Expense"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stock"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiTextForTag
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tagToRemove) =>
                        field.onChange([
                          ...field.value.filter((tag) => tag !== tagToRemove),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            {collections.length > 0 && loading ? <LoaderIcon className="animate-spin h-12 w-12 mt-7" /> : (
              <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collections</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Collections"
                        collections={collections}
                        value={field.value}
                        onChange={(_id) =>
                          field.onChange([...field.value, _id])
                        }
                        onRemove={(idToRemove) =>
                          field.onChange([
                            ...field.value.filter((id) => id !== idToRemove),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-1" />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Size"
                      value={field.value.map((item) => ({
                        label: item.size,
                        quantity: item.quantity,
                      }))}
                      onChange={(value) =>
                        field.onChange([
                          ...field.value,
                          { size: value.label, quantity: value.quantity },
                        ])
                      }
                      onRemove={(value) =>
                        field.onChange([
                          ...field.value.filter((item) => item.size !== value),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="styles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Styles</FormLabel>
                  <FormControl>
                    <MultiTextForStyle
                      placeholder="Styles"
                      value={field.value.map((item) => ({
                        label: item.style,
                        quantity: item.quantity,
                        price: item.price,
                      }))}
                      onChange={(value) =>
                        field.onChange([
                          ...field.value,
                          { style: value.label, price: value.price,quantity: value.quantity },
                        ])
                      }
                      onRemove={(value) =>
                        field.onChange([
                          ...field.value.filter((item) => item.style !== value),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Color"
                      value={field.value.map((item) => ({
                        label: item.color,
                        quantity: item.quantity,
                      }))}
                      onChange={(value) =>
                        field.onChange([
                          ...field.value,
                          { color: value.label, quantity: value.quantity },
                        ])
                      }
                      onRemove={(value) =>
                        field.onChange([
                          ...field.value.filter((item) => item.color !== value),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              {isSubmtting && <LoaderIcon className="animate-spin mx-1" />}{ initialData ? "Save" : "Submit"}
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/products")}
              className="bg-blue-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;

