// 🏗️ FENIX Construction Tracker - API Service Layer

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('fenix_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('fenix_token', token);
    } else {
      localStorage.removeItem('fenix_token');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // =============================================================================
  // AUTHENTICATION
  // =============================================================================

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  logout() {
    this.setToken(null);
  }

  // =============================================================================
  // USERS
  // =============================================================================

  async getCurrentUser() {
    return await this.request('/users/me');
  }

  async getAllUsers() {
    return await this.request('/users');
  }

  // =============================================================================
  // VEHICLES
  // =============================================================================

  async getVehicles() {
    return await this.request('/vehicles');
  }

  async createVehicle(vehicleData) {
    return await this.request('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    });
  }

  // =============================================================================
  // WORK SESSIONS
  // =============================================================================

  async startWorkSession(sessionData) {
    return await this.request('/work-sessions/start', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async endWorkSession(sessionId, endData) {
    return await this.request(`/work-sessions/${sessionId}/end`, {
      method: 'PUT',
      body: JSON.stringify(endData),
    });
  }

  async pauseWorkSession(sessionId, pauseData) {
    return await this.request(`/work-sessions/${sessionId}/pause`, {
      method: 'PUT',
      body: JSON.stringify(pauseData),
    });
  }

  async resumeWorkSession(sessionId) {
    return await this.request(`/work-sessions/${sessionId}/resume`, {
      method: 'PUT',
    });
  }

  async getWorkSessions(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.limit) params.append('limit', filters.limit);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/work-sessions?${queryString}` : '/work-sessions';
    
    return await this.request(endpoint);
  }

  async getAdminWorkSessions(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.userId) params.append('userId', filters.userId);
    if (filters.limit) params.append('limit', filters.limit);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/admin/work-sessions?${queryString}` : '/admin/work-sessions';
    
    return await this.request(endpoint);
  }

  // =============================================================================
  // LOCATION
  // =============================================================================

  async updateLocation(locationData) {
    return await this.request('/location', {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
  }

  async getCurrentLocations() {
    return await this.request('/admin/locations');
  }

  // =============================================================================
  // STATISTICS
  // =============================================================================

  async getUserStats(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/stats/user?${queryString}` : '/stats/user';
    
    return await this.request(endpoint);
  }

  async getAdminStats(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/admin/stats?${queryString}` : '/admin/stats';
    
    return await this.request(endpoint);
  }

  // =============================================================================
  // HEALTH CHECK
  // =============================================================================

  async healthCheck() {
    return await this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService; 