
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useSimpleDegenMode = () => {
  const { toast } = useToast();
  const [isDegenMode, setIsDegenMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check degen mode status on load by validating the stored session token
  useEffect(() => {
    const validateStoredSession = async () => {
      const storedToken = localStorage.getItem('simple_degen_session_token');
      if (!storedToken) {
        setIsDegenMode(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('validate_degen_session_secure', {
          session_token: storedToken
        });

        if (error) {
          console.error('Session validation error:', error);
          localStorage.removeItem('simple_degen_session_token');
          setIsDegenMode(false);
          return;
        }

        // Check if we got a valid result
        if (data && data.length > 0 && data[0].is_valid) {
          setIsDegenMode(true);
        } else {
          localStorage.removeItem('simple_degen_session_token');
          setIsDegenMode(false);
        }
      } catch (error) {
        console.error('Session validation failed:', error);
        localStorage.removeItem('simple_degen_session_token');
        setIsDegenMode(false);
      }
    };

    validateStoredSession();
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
      // Create anonymous session with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
      
      if (authError || !authData?.user) {
        console.error('Auth error:', authError);
        toast({
          title: "Authentication Error",
          description: "Failed to create secure session",
          variant: "destructive"
        });
        return false;
      }

      // Create secure degen session using the new function
      const { data: sessionData, error: sessionError } = await supabase.rpc('create_degen_session', {
        p_user_id: authData.user.id
      });

      if (sessionError || !sessionData || sessionData.length === 0) {
        console.error('Session creation error:', sessionError);
        toast({
          title: "Error",
          description: "Failed to create secure session",
          variant: "destructive"
        });
        return false;
      }

      const { session_token } = sessionData[0];
      
      // Store only the session token (not the full session data)
      localStorage.setItem('simple_degen_session_token', session_token);

      setIsDegenMode(true);
      
      toast({
        title: "Degen Mode Activated",
        description: "You can now upload and manage content securely",
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
    const storedToken = localStorage.getItem('simple_degen_session_token');
    
    if (storedToken) {
      try {
        // Deactivate the session in the database
        await supabase
          .from('degen_sessions')
          .update({ is_active: false })
          .eq('session_token', storedToken);
      } catch (error) {
        console.error('Error deactivating session:', error);
      }
    }

    localStorage.removeItem('simple_degen_session_token');
    setIsDegenMode(false);
    
    toast({
      title: "Degen Mode Deactivated",
      description: "Content management features are now disabled",
    });
  };

  const logUploadActivity = async (action: string, itemType: string, itemId: string, itemData: any) => {
    if (!isDegenMode) return;

    try {
      const storedToken = localStorage.getItem('simple_degen_session_token');
      if (!storedToken) return;

      // Validate session before logging
      const { data: validationData } = await supabase.rpc('validate_degen_session_secure', {
        session_token: storedToken
      });

      if (!validationData || validationData.length === 0 || !validationData[0].is_valid) {
        console.log('Invalid session for logging');
        return;
      }

      const userId = validationData[0].user_id;
      
      await supabase
        .from('upload_logs')
        .insert({
          user_id: userId,
          action,
          item_type: itemType,
          item_id: itemId,
          item_data: itemData,
          session_token: storedToken,
          ip_address: 'client_side',
          user_agent: navigator.userAgent
        });
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
