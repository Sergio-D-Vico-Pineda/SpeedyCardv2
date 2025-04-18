"use client";

import { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    Firestore,
} from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface Item {
    id?: string;
    name: string;
    description: string;
}

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState<Item>({ name: "", description: "" });
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    useEffect(() => {
        const getItems = async () => {
            const itemsCollection = collection(db, "items");
            const itemsSnapshot = await getDocs(itemsCollection);
            const itemsList = itemsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Item[];
            setItems(itemsList);
        };

        getItems();
    }, []);

    const handleCreate = async () => {
        if (newItem.name && newItem.description) {
            try {
                const itemsCollection = collection(db, "items");
                await addDoc(itemsCollection, newItem);
                setNewItem({ name: "", description: "" });
                toast({
                    title: "Item created successfully!",
                    description: "The item has been added to the list.",
                });
                // Refresh items
                const itemsSnapshot = await getDocs(itemsCollection);
                const itemsList = itemsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Item[];
                setItems(itemsList);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error creating item!",
                    description: "Something went wrong. Please try again.",
                });
            }
        }
    };

    const handleUpdate = async () => {
        if (editingItem?.id) {
            try {
                const itemDoc = doc(db, "items", editingItem.id);
                await updateDoc(itemDoc, {
                    name: editingItem.name,
                    description: editingItem.description,
                });
                setEditingItem(null);
                toast({
                    title: "Item updated successfully!",
                    description: "The item has been modified.",
                });
                // Refresh items
                const itemsCollection = collection(db, "items");
                const itemsSnapshot = await getDocs(itemsCollection);
                const itemsList = itemsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Item[];
                setItems(itemsList);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error updating item!",
                    description: "Something went wrong. Please try again.",
                });
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const itemDoc = doc(db, "items", id);
            await deleteDoc(itemDoc);
            toast({
                title: "Item deleted successfully!",
                description: "The item has been removed from the list.",
            });
            // Refresh items
            const itemsCollection = collection(db, "items");
            const itemsSnapshot = await getDocs(itemsCollection);
            const itemsList = itemsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Item[];
            setItems(itemsList);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error deleting item!",
                description: "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-secondary py-8">
            <h1 className="text-3xl font-bold text-primary mb-8">FireCRUD</h1>

            {/* Create Item Form */}
            <Card className="w-full max-w-md mb-8">
                <CardHeader>
                    <CardTitle>Create New Item</CardTitle>
                    <CardDescription>Add a new item to the Firestore database.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e: any) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                    <Textarea
                        placeholder="Item Description"
                        value={newItem.description}
                        onChange={(e: any) =>
                            setNewItem({ ...newItem, description: e.target.value })
                        }
                    />
                    <Button onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/80">
                        Create Item
                    </Button>
                </CardContent>
            </Card>

            {/* Read Items List */}
            <Card className="w-full max-w-md flex-1">
                <CardHeader>
                    <CardTitle>Items List</CardTitle>
                    <CardDescription>Scrollable list of items from Firestore.</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ScrollArea className="rounded-md border">
                        <div className="p-4">
                            {items.map((item) => (
                                <div key={item.id} className="mb-4 p-4 rounded-md shadow-sm bg-background">
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-muted-foreground">{item.description}</p>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setEditingItem(item)}
                                            className="hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="icon">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the item from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(item.id!)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Update Item Modal */}
            {editingItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Edit Item</CardTitle>
                            <CardDescription>Modify the item's name and description.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Input
                                type="text"
                                placeholder="Item Name"
                                value={editingItem.name}
                                onChange={(e: any) =>
                                    setEditingItem({ ...editingItem, name: e.target.value })
                                }
                            />
                            <Textarea
                                placeholder="Item Description"
                                value={editingItem.description}
                                onChange={(e: any) =>
                                    setEditingItem({ ...editingItem, description: e.target.value })
                                }
                            />
                            <div className="flex justify-end gap-2">
                                <Button variant="secondary" onClick={() => setEditingItem(null)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdate} className="bg-primary text-primary-foreground hover:bg-primary/80">
                                    Update Item
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
