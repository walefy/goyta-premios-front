import { AdminCreation, UserCreation } from '@/types/UserCreation';

export class GoytaBackend {
  #url = 'http://localhost:3001';

  async login(email: string, password: string) {
    const response = await fetch(`${this.#url}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.token };
    }

    return { success: false, data: data.message };
  }

  async createAccount(newUser: UserCreation) {
    const response = await fetch(`${this.#url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.token };
    }

    return { success: false, data: data.message };
  }

  async createAdminAccount(newUser: AdminCreation) {
    const response = await fetch(`${this.#url}/user/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data.token };
    }

    return { success: false, data: data.message };
  }

  async getAllSweepstakes(token: string) {
    const response = await fetch(`${this.#url}/ticket`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return { success: false, data: data.message };
    }

    return { success: true, data };
  }
}
