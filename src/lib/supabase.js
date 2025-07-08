import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ofahxcdnwdmucrvipfbu.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mYWh4Y2Rud2RtdWNydmlwZmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTYwNjIsImV4cCI6MjA2NzM5MjA2Mn0.nqwmer6wYir9RmPBpbQsx22B9RdNRGvL_4-U2-STw4Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Helper functions for common Supabase operations
export const supabaseHelpers = {
  // Authentication helpers
  auth: {
    signUp: async (email, password, userData = {}) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      return { data, error }
    },

    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      return { error }
    },

    getCurrentUser: () => {
      return supabase.auth.getUser()
    },

    onAuthStateChange: (callback) => {
      return supabase.auth.onAuthStateChange(callback)
    }
  },

  // Database helpers
  db: {
    // User operations
    getUsers: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      return { data, error }
    },

    getUserById: async (id) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
      return { data, error }
    },

    createUser: async (userData) => {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
      return { data, error }
    },

    updateUser: async (id, updates) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
      return { data, error }
    },

    deleteUser: async (id) => {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
      return { error }
    },

    // Work session operations
    getWorkSessions: async (userId = null) => {
      let query = supabase
        .from('work_sessions')
        .select(`
          *,
          user:users(name, email),
          vehicle:vehicles(name, plate)
        `)
        .order('start_time', { ascending: false })

      if (userId) {
        query = query.eq('user_id', userId)
      }

      const { data, error } = await query
      return { data, error }
    },

    getWorkSessionById: async (id) => {
      const { data, error } = await supabase
        .from('work_sessions')
        .select(`
          *,
          user:users(name, email),
          vehicle:vehicles(name, plate),
          breaks:breaks(*)
        `)
        .eq('id', id)
        .single()
      return { data, error }
    },

    createWorkSession: async (sessionData) => {
      const { data, error } = await supabase
        .from('work_sessions')
        .insert([sessionData])
        .select()
      return { data, error }
    },

    updateWorkSession: async (id, updates) => {
      const { data, error } = await supabase
        .from('work_sessions')
        .update(updates)
        .eq('id', id)
        .select()
      return { data, error }
    },

    // Vehicle operations
    getVehicles: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })
      return { data, error }
    },

    createVehicle: async (vehicleData) => {
      const { data, error } = await supabase
        .from('vehicles')
        .insert([vehicleData])
        .select()
      return { data, error }
    },

    // Location tracking
    getLocations: async (userId, limit = 100) => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('user_id', userId)
        .order('timestamp', { ascending: false })
        .limit(limit)
      return { data, error }
    },

    createLocation: async (locationData) => {
      const { data, error } = await supabase
        .from('locations')
        .insert([locationData])
        .select()
      return { data, error }
    },

    // System settings
    getSystemSettings: async () => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
      return { data, error }
    },

    updateSystemSetting: async (key, value) => {
      const { data, error } = await supabase
        .from('system_settings')
        .upsert([{ key, value }])
        .select()
      return { data, error }
    }
  },

  // Storage helpers
  storage: {
    uploadFile: async (bucket, path, file) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file)
      return { data, error }
    },

    getPublicUrl: (bucket, path) => {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)
      return data.publicUrl
    },

    deleteFile: async (bucket, path) => {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path])
      return { error }
    },

    listFiles: async (bucket, path = '') => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(path)
      return { data, error }
    }
  },

  // Realtime helpers
  realtime: {
    subscribeToTable: (table, callback) => {
      return supabase
        .channel(`public:${table}`)
        .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
        .subscribe()
    },

    subscribeToUserLocations: (userId, callback) => {
      return supabase
        .channel(`user_locations:${userId}`)
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'locations', filter: `user_id=eq.${userId}` }, 
          callback
        )
        .subscribe()
    },

    subscribeToWorkSessions: (userId, callback) => {
      return supabase
        .channel(`work_sessions:${userId}`)
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'work_sessions', filter: `user_id=eq.${userId}` }, 
          callback
        )
        .subscribe()
    }
  }
}

// Error handling utility
export const handleSupabaseError = (error) => {
  if (error) {
    console.error('Supabase Error:', error)
    
    // Handle specific error types
    if (error.code === 'PGRST116') {
      return { message: 'Record not found', type: 'not_found' }
    }
    
    if (error.code === '23505') {
      return { message: 'Duplicate entry', type: 'duplicate' }
    }
    
    if (error.code === '42P01') {
      return { message: 'Table does not exist', type: 'table_not_found' }
    }
    
    return { message: error.message || 'An error occurred', type: 'unknown' }
  }
  
  return null
}

// Export default client
export default supabase 