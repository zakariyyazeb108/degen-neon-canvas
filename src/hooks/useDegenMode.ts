
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export const useDegenMode = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDegenMode, setIsDegenMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check degen access when user changes
  useEffect(() => {
    if (user) {
      checkDegenAccess();
    } else {
      setIsDegenMode(false);
    }
  }, [user]);

  const checkDegenAccess = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .rpc('check_degen_access', { user_id: user.id });

      if (error) {
        console.error('Error checking degen access:', error);
        return;
      }

      setIsDegenMode(data || false);
    } catch (error) {
      console.error('Error checking degen access:', error);
    }
  };

  const activateDegenMode = async (code: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to activate Degen Mode",
        variant: "destructive"
      });
      return false;
    }

    if (code !== "DegenDesigns+123") {
      toast({
        title: "Invalid Code",
        description: "The code you entered is incorrect",
        variant: "destructive"
      });
      return false;
    }

    setLoading(true);

    try {
      // Create a degen session
      const sessionToken = crypto.randomUUID();
      
      const { error: sessionError } = await supabase
        .from('degen_sessions')
        .insert({
          user_id: user.id,
          session_token: sessionToken,
          ip_address: 'client_side',
          user_agent: navigator.userAgent
        });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        toast({
          title: "Access Denied",
          description: "You don't have permission to activate Degen Mode",
          variant: "destructive"
        });
        return false;
      }

      // Store session token securely
      localStorage.setItem('degen_session', sessionToken);
      
      // Recheck access
      await checkDegenAccess();
      
      toast({
        title: "Degen Mode Activated",
        description: "You now have access to content management features",
      });

      return true;
    } catch (error) {
      console.error('Error activating degen mode:', error);
      toast({
        title: "Error",
        description: "Failed to activate Degen Mode",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deactivateDegenMode = async () => {
    if (!user) return;

    try {
      const sessionToken = localStorage.getItem('degen_session');
      
      if (sessionToken) {
        // Deactivate the session
        await supabase
          .from('degen_sessions')
          .update({ is_active: false })
          .eq('session_token', sessionToken)
          .eq('user_id', user.id);
      }

      localStorage.removeItem('degen_session');
      setIsDegenMode(false);
      
      toast({
        title: "Degen Mode Deactivated",
        description: "Content management features are now disabled",
      });
    } catch (error) {
      console.error('Error deactivating degen mode:', error);
    }
  };

  const logUploadActivity = async (action: string, itemType: string, itemId: string, itemData: any) => {
    if (!user || !isDegenMode) return;

    try {
      const sessionToken = localStorage.getItem('degen_session');
      
      await supabase
        .from('upload_logs')
        .insert({
          user_id: user.id,
          action,
          item_type: itemType,
          item_id: itemId,
          item_data: itemData,
          session_token: sessionToken,
          ip_address: 'client_side',
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Error logging upload activity:', error);
    }
  };

  return {
    isDegenMode,
    loading,
    activateDegenMode,
    deactivateDegenMode,
    logUploadActivity,
    checkDegenAccess
  };
};
