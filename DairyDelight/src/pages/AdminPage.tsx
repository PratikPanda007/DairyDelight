
import { useState, useEffect } from "react";
import { useProducts, categories } from "@/hooks/useProducts";
import { Product } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Plus,
  Trash,
  Search,
  CalendarClock,
} from "lucide-react";
import { toast } from "sonner";

type ProductFormData = Omit<Product, "id"> & { id?: string };

const emptyProductForm: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "milk",
  featured: false,
};

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [formData, setFormData] = useState<ProductFormData>(emptyProductForm);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("products");

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const resetForm = () => {
    setFormData(emptyProductForm);
    setIsEditing(false);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "discountPrice" || name === "discountPercentage" 
        ? parseFloat(value) || 0 
        : value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.image) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    
    if (formData.discountPrice && formData.discountPrice >= formData.price) {
      toast.error("Discount price must be less than regular price");
      return;
    }
    
    if (isEditing && formData.id) {
      updateProduct(formData as Product);
      toast.success(`${formData.name} has been updated`);
    } else {
      addProduct(formData);
      toast.success(`${formData.name} has been added`);
    }
    
    resetForm();
  };
  
  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
  };
  
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteProduct(id);
      toast.success(`${name} has been deleted`);
    }
  };
  
  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="coupons">Coupons</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Dialog onOpenChange={(open) => !open && resetForm()}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {isEditing ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                  <DialogDescription>
                    {isEditing
                      ? "Update the product details below."
                      : "Fill the form below to add a new product."}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Product Name*</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="category">Category*</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="image">Image URL*</Label>
                        <Input
                          id="image"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="modelUrl">3D Model URL (optional)</Label>
                        <Input
                          id="modelUrl"
                          name="modelUrl"
                          value={formData.modelUrl || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={formData.featured || false}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("featured", checked as boolean)
                          }
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="price">Regular Price*</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={formData.price || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="discountPrice">Discount Price (optional)</Label>
                        <Input
                          id="discountPrice"
                          name="discountPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.discountPrice || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="discountPercentage">
                          Discount Percentage (optional)
                        </Label>
                        <Input
                          id="discountPercentage"
                          name="discountPercentage"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.discountPercentage || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description*</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="h-28"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter className="mt-6">
                    <DialogClose asChild>
                      <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                      {isEditing ? "Update Product" : "Add Product"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center h-24">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="capitalize">{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          {product.discountPrice ? (
                            <span className="text-green-600 dark:text-green-400">
                              ${product.discountPrice.toFixed(2)} 
                              {product.discountPercentage && ` (${product.discountPercentage}% off)`}
                            </span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>
                          {product.featured ? (
                            <span className="text-butter-600 dark:text-butter-400">
                              Yes
                            </span>
                          ) : (
                            "No"
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog onOpenChange={(open) => !open && resetForm()}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                {/* Form content is the same as the add product dialog */}
                                <DialogHeader>
                                  <DialogTitle>Edit Product</DialogTitle>
                                  <DialogDescription>
                                    Update the product details below.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {/* Same form as add product dialog */}
                                <form onSubmit={handleSubmit}>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor="name">Product Name*</Label>
                                        <Input
                                          id="name"
                                          name="name"
                                          value={formData.name}
                                          onChange={handleInputChange}
                                          required
                                        />
                                      </div>
                                      
                                      <div>
                                        <Label htmlFor="category">Category*</Label>
                                        <Select
                                          value={formData.category}
                                          onValueChange={(value) => handleSelectChange("category", value)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {categories.map((category) => (
                                              <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      
                                      <div>
                                        <Label htmlFor="image">Image URL*</Label>
                                        <Input
                                          id="image"
                                          name="image"
                                          value={formData.image}
                                          onChange={handleInputChange}
                                          required
                                        />
                                      </div>
                                      
                                      <div>
                                        <Label htmlFor="modelUrl">3D Model URL (optional)</Label>
                                        <Input
                                          id="modelUrl"
                                          name="modelUrl"
                                          value={formData.modelUrl || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        <Checkbox
                                          id="featured"
                                          checked={formData.featured || false}
                                          onCheckedChange={(checked) =>
                                            handleCheckboxChange("featured", checked as boolean)
                                          }
                                        />
                                        <Label htmlFor="featured">Featured Product</Label>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor="price">Regular Price*</Label>
                                        <Input
                                          id="price"
                                          name="price"
                                          type="number"
                                          min="0.01"
                                          step="0.01"
                                          value={formData.price || ""}
                                          onChange={handleInputChange}
                                          required
                                        />
                                      </div>
                                      
                                      <div>
                                        <Label htmlFor="discountPrice">Discount Price (optional)</Label>
                                        <Input
                                          id="discountPrice"
                                          name="discountPrice"
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          value={formData.discountPrice || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      
                                      <div>
                                        <Label htmlFor="discountPercentage">
                                          Discount Percentage (optional)
                                        </Label>
                                        <Input
                                          id="discountPercentage"
                                          name="discountPercentage"
                                          type="number"
                                          min="0"
                                          max="100"
                                          value={formData.discountPercentage || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      
                                      <div>
                                        <Label htmlFor="description">Description*</Label>
                                        <Textarea
                                          id="description"
                                          name="description"
                                          value={formData.description}
                                          onChange={handleInputChange}
                                          className="h-28"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <DialogFooter className="mt-6">
                                    <DialogClose asChild>
                                      <Button variant="outline" type="button">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">
                                      Update Product
                                    </Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(product.id, product.name)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coupons">
          <Card>
            <CardHeader>
              <CardTitle>Coupon Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">DAIRY10</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>12/31/2023</TableCell>
                    <TableCell>
                      <span className="text-green-600 dark:text-green-400">
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CHEESE20</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>12/31/2023</TableCell>
                    <TableCell>
                      <span className="text-green-600 dark:text-green-400">
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="offers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarClock className="h-5 w-5 mr-2" />
                Special Offers & Discounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Offer Name</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Summer Sale</TableCell>
                    <TableCell>All Products</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>06/01/2023</TableCell>
                    <TableCell>08/31/2023</TableCell>
                    <TableCell>
                      <span className="text-green-600 dark:text-green-400">
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cheese Festival</TableCell>
                    <TableCell>Cheese Products</TableCell>
                    <TableCell>25%</TableCell>
                    <TableCell>07/15/2023</TableCell>
                    <TableCell>07/30/2023</TableCell>
                    <TableCell>
                      <span className="text-red-600 dark:text-red-400">
                        Expired
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
