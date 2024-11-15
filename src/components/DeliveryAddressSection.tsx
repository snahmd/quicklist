import { useState } from "react";
import { Plus, X, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
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
import { supabase } from "@/utils/supabaseClient";
import { useUserContext } from "@/context/userContext";

interface Address {
  firstName: string;
  lastName: string;
  addressAddition?: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

export function DeliveryAddressSection() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState<Address | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { user } = useUserContext();
  if (user) {
    console.log(user.id);
  }

  const handleSaveAddress = () => {
    if (editingAddress) {
      setSavedAddress(editingAddress);
      sendDatabase();
    }
    setIsAddDialogOpen(false);
  };

  const handleAddressClick = () => {
    setEditingAddress({
      firstName: "",
      lastName: "",
      addressAddition: "",
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleEditAddress = () => {
    if (savedAddress) {
      setEditingAddress({ ...savedAddress });
      setIsAddDialogOpen(true);
    }
  };

  const handleDeleteAddress = () => {
    setSavedAddress(null);
  };

  const sendDatabase = async () => {
    const { error } = await supabase.from("user_info").insert({
      first_name: editingAddress?.firstName,
      last_name: editingAddress?.lastName,
      address_addition: editingAddress?.addressAddition,
      street: editingAddress?.street,
      house_no: editingAddress?.houseNumber,
      postal_code: editingAddress?.postalCode,
      city: editingAddress?.city,
    });
    setEditingAddress(null);
    console.log(error);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Delivery Address</h3>
        {!savedAddress && (
          <Button variant="outline" size="sm" onClick={handleAddressClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Address
          </Button>
        )}
      </div>

      {savedAddress ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-medium">
                  {savedAddress.firstName} {savedAddress.lastName}
                </p>
                {savedAddress.addressAddition && (
                  <p className="text-sm text-gray-500">
                    {savedAddress.addressAddition}
                  </p>
                )}
                <p className="text-sm">
                  {savedAddress.street} {savedAddress.houseNumber}
                </p>
                <p className="text-sm">
                  {savedAddress.postalCode} {savedAddress.city}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleEditAddress}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Address</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete Address</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Address</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this address? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAddress}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-sm text-gray-600">No delivery address saved</p>
      )}

      {/* Add/Edit Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingAddress?.firstName ? "Edit Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name*</Label>
              <Input
                id="firstName"
                value={editingAddress?.firstName || ""}
                onChange={(e) =>
                  setEditingAddress((prev) => ({
                    ...prev!,
                    firstName: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name*</Label>
              <Input
                id="lastName"
                value={editingAddress?.lastName || ""}
                onChange={(e) =>
                  setEditingAddress((prev) => ({
                    ...prev!,
                    lastName: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressAddition">Address Addition</Label>
              <Input
                id="addressAddition"
                value={editingAddress?.addressAddition || ""}
                onChange={(e) =>
                  setEditingAddress((prev) => ({
                    ...prev!,
                    addressAddition: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3 space-y-2">
                <Label htmlFor="street">Street*</Label>
                <Input
                  id="street"
                  value={editingAddress?.street || ""}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({
                      ...prev!,
                      street: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="houseNumber">House No.*</Label>
                <Input
                  id="houseNumber"
                  value={editingAddress?.houseNumber || ""}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({
                      ...prev!,
                      houseNumber: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code*</Label>
                <Input
                  id="postalCode"
                  value={editingAddress?.postalCode || ""}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({
                      ...prev!,
                      postalCode: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="city">City*</Label>
                <Input
                  id="city"
                  value={editingAddress?.city || ""}
                  onChange={(e) =>
                    setEditingAddress((prev) => ({
                      ...prev!,
                      city: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingAddress(null);
                setIsAddDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-[#c5e167] hover:bg-[#b1cc5a] text-black"
              onClick={handleSaveAddress}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
