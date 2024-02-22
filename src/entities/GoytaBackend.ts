import { IUser } from '@/types/IUser';
import { AdminCreation, UserCreation } from '@/types/UserCreation';
import { jwtDecode } from 'jwt-decode';

type BackendResponse<T> = Promise<{ success: boolean; data: T }>;

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

  async findUser(token: string): BackendResponse<IUser> {
    const userId = jwtDecode(token) as { id: string };
    const response = await fetch(`${this.#url}/user/${userId.id}`, {
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

  async getTicketById(token: string, id: string) {
    const response = await fetch(`${this.#url}/ticket/${id}`, {
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

  async buyQuota(token: string, ticketId: string, quotaNumber: string) {
    const user = jwtDecode(token) as { id: string };
    const response = await fetch(`${this.#url}/ticket/${ticketId}/buy-quota`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ userId: user.id, drawnNumber: quotaNumber }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, data: data.message };
    }

    return { success: true, data };
  }
}
