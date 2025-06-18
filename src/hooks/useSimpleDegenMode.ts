
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useSimpleDegenMode = () => {
  const { toast } = useToast();
  const [isDegenMode, setIsDegenMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get client IP for security tracking
  const getClientIP = () => {
    return 'client_browser';
  };

  // Check degen mode status on load by validating the stored session token
  useEffect(() => {
    const validateStoredSession = async () => {
      const storedToken = localStorage.getItem('simple_degen_session_token');
      if (!storedToken) {
        setIsDegenMode(false);
        return;
      }

      try {
        // Use the enhanced validation function
        const { data, error } = await supabase.rpc('validate_degen_session_advanced', {
          session_token: storedToken,
          client_ip: getClientIP(),
          user_agent_header: navigator.userAgent
        });

        if (error) {
          console.error('Session validation error:', error);
          localStorage.removeItem('simple_degen_session_token');
          setIsDegenMode(false);
          return;
        }

        // Check if we got a valid result with enhanced security info
        if (data && data.length > 0 && data[0].is_valid) {
          setIsDegenMode(true);
          
          // Log security level if it's low
          if (data[0].security_level === 'low') {
            console.warn('Session validated but with low security score');
          }
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
      // Record failed attempt for rate limiting
      try {
        await supabase.rpc('record_failed_attempt', {
          client_ip: getClientIP()
        });
      } catch (error) {
        console.error('Failed to record attempt:', error);
      }

      toast({
        title: "Invalid Code",
        description: "The code you entered is incorrect",
        variant: "destructive"
      });
      return false;
    }

    setLoading(true);

    try {
      // Check rate limiting before proceeding
      const { data: rateLimitData, error: rateLimitError } = await supabase.rpc('check_rate_limit', {
        client_ip: getClientIP()
      });

      if (rateLimitError) {
        console.error('Rate limit check error:', rateLimitError);
      } else if (rateLimitData && rateLimitData.length > 0 && rateLimitData[0].is_blocked) {
        toast({
          title: "Too Many Attempts",
          description: "Please wait before trying again due to multiple failed attempts",
          variant: "destructive"
        });
        return false;
      }

      // Generate a session token directly without Supabase auth
      const sessionToken = crypto.randomUUID();
      
      // Create a temporary user ID for this session
      const tempUserId = crypto.randomUUID();

      // Create secure degen session record directly
      const { error: sessionError } = await supabase
        .from('degen_sessions')
        .insert({
          user_id: tempUserId,
          session_token: sessionToken,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
          ip_address: getClientIP(),
          user_agent: navigator.userAgent,
          is_active: true
        });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        toast({
          title: "Error",
          description: "Failed to create secure session",
          variant: "destructive"
        });
        return false;
      }
      
      // Store only the session token (not the full session data)
      localStorage.setItem('simple_degen_session_token', sessionToken);

      setIsDegenMode(true);
      
      toast({
        title: "Degen Mode Activated",
        description: "You can now upload and manage content securely",
      });

      return true;
    } catch (error) {
      console.error('Error activating degen mode:', error);
      
      // Record failed attempt
      try {
        await supabase.rpc('record_failed_attempt', {
          client_ip: getClientIP()
        });
      } catch (attemptError) {
        console.error('Failed to record attempt:', attemptError);
      }

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

      // Validate session before logging using enhanced validation
      const { data: validationData } = await supabase.rpc('validate_degen_session_advanced', {
        session_token: storedToken,
        client_ip: getClientIP(),
        user_agent_header: navigator.userAgent
      });

      if (!validationData || validationData.length === 0 || !validationData[0].is_valid) {
        console.log('Invalid session for logging');
        return;
      }

      const userId = validationData[0].user_id;
      const securityLevel = validationData[0].security_level;
      
      await supabase
        .from('upload_logs')
        .insert({
          user_id: userId,
          action,
          item_type: itemType,
          item_id: itemId,
          item_data: {
            ...itemData,
            security_level: securityLevel,
            client_info: {
              ip: getClientIP(),
              user_agent: navigator.userAgent
            }
          },
          session_token: storedToken,
          ip_address: getClientIP(),
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
