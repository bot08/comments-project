import { setCookie, getCookie, removeCookie } from './utils/cookie'

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: null as null | object,
    token: null as null | string,
  }),

  actions: {
    login(email: string, password: string) {
      return $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      .then((res) => {  
        this.token = res.data.access_token;
        setCookie('token', this.token, 21);
        return res;
      })
      .catch(err => {
        console.error('Login failed:', err);
        throw err;
      });
    },
    
    register(name: string, email: string, password: string) {
      return $fetch('/api/auth/register', {
        method: 'POST',
        body: { name, email, password }
      })
      .then((res) => {
        return res;
      })
      .catch(err => {
        console.error('Registration failed:', err);
        throw err;
      });
    },
    
    fetchUser() {
      return $fetch('/api/users/me', {
        headers: {
          Authorization: `${this.token}`
        }
      })
      .then((res) => {
        this.user = res.data;
        setCookie('user', JSON.stringify(this.user), 21);
      })
      .catch(err => {
        console.error('Failed to fetch user:', err);
        throw err;
      });
    },

    logout() {
      this.user = null
      this.token = null
      removeCookie('user')
      removeCookie('token')
    },

    initializeStore() {
      const token = getCookie('token')
      const user = getCookie('user')

      if (token) {
        this.token = token
      }
      if (user) {
        this.user = JSON.parse(user)
      }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}