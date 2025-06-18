
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useSimpleDegenMode = () => {
  const { toast } = useToast();
  const [isDegenMode, setIsDegenMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check degen mode status on load
  useEffect(() => {
    const checkDegenStatus = () => {
      const degenSession = localStorage.getItem('simple_degen_session');
      setIsDegenMode(!!degenSession);
    };

    checkDegenStatus();
  }, []);

  const activateDegenMode = async (code: string): Promise<boolean> => {
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
      // Create anonymous session with Supabase for logging
      const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
      
      if (authError) {
        console.error('Auth error:', authError);
        // Continue anyway - auth is just for logging
      }

      // Create simple session token
      const sessionToken = crypto.randomUUID();
      const timestamp = new Date().toISOString();
      
      // Store session data
      localStorage.setItem('simple_degen_session', JSON.stringify({
        token: sessionToken,
        activated_at: timestamp,
        user_agent: navigator.userAgent
      }));

      // Try to log the activation (optional)
      if (authData?.user) {
        try {
          await supabase
            .from('degen_sessions')
            .insert({
              user_id: authData.user.id,
              session_token: sessionToken,
              ip_address: 'client_side',
              user_agent: navigator.userAgent
            });
        } catch (logError) {
          console.log('Logging failed (non-critical):', logError);
        }
      }

      setIsDegenMode(true);
      
      toast({
        title: "Degen Mode Activated",
        description: "You can now upload and manage content",
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

  const deactivateDegenMode = () => {
    localStorage.removeItem('simple_degen_session');
    setIsDegenMode(false);
    
    toast({
      title: "Degen Mode Deactivated",
      description: "Content management features are now disabled",
    });
  };

  const logUploadActivity = async (action: string, itemType: string, itemId: string, itemData: any) => {
    if (!isDegenMode) return;

    try {
      const session = localStorage.getItem('simple_degen_session');
      if (!session) return;

      const { token } = JSON.parse(session);
      
      // Get current user (might be anonymous)
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase
          .from('upload_logs')
          .insert({
            user_id: user.id,
            action,
            item_type: itemType,
            item_id: itemId,
            item_data: itemData,
            session_token: token,
            ip_address: 'client_side',
            user_agent: navigator.userAgent
          });
      }
    } catch (error) {
      console.log('Upload logging failed (non-critical):', error);
    }
  };

  return {
    isDegenMode,
    loading,
    activateDegenMode,
    deactivateDegenMode,
    logUploadActivity
  };
};
