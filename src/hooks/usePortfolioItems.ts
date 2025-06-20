
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSimpleDegenMode } from './useSimpleDegenMode';
import { useToast } from './use-toast';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  website_url?: string;
  category: string;
  item_type: string;
  created_at: string;
  updated_at: string;
}

export const usePortfolioItems = (itemType: string) => {
  const { isDegenMode, logUploadActivity } = useSimpleDegenMode();
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch items from database
  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('item_type', itemType)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      toast({
        title: "Error",
        description: "Failed to load portfolio items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new item
  const addItem = async (itemData: Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'>) => {
    if (!isDegenMode) return null;

    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert({
          ...itemData,
          item_type: itemType
        })
        .select()
        .single();

      if (error) throw error;

      setItems(prev => [data, ...prev]);
      
      // Log the activity
      await logUploadActivity('upload', itemType, data.id, data);
      
      toast({
        title: "Success",
        description: "Item added successfully",
      });

      return data;
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive"
      });
      return null;
    }
  };

  // Update item
  const updateItem = async (id: string, updates: Partial<PortfolioItem>) => {
    if (!isDegenMode) return false;

    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setItems(prev => prev.map(item => item.id === id ? data : item));
      
      // Log the activity
      await logUploadActivity('edit', itemType, id, data);
      
      toast({
        title: "Success",
        description: "Item updated successfully",
      });

      return true;
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive"
      });
      return false;
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    if (!isDegenMode) return false;

    try {
      const itemToDelete = items.find(item => item.id === id);
      
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(prev => prev.filter(item => item.id !== id));
      
      // Log the activity
      if (itemToDelete) {
        await logUploadActivity('delete', itemType, id, itemToDelete);
      }
      
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });

      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchItems();
  }, [itemType]);

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    refreshItems: fetchItems
  };
};
