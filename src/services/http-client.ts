import { AppKey } from '@/constant/key';
import { MyApp } from '@/constant/my-app';

type ResponseType = Promise<any | null | string>;

export class HttpClient {
  private headers: any = { 'Content-Type': 'application/json' };

  private buildUrl(path: string) {
    return `${MyApp.url}/${path}`;
  }

  private buildHeader() {
    this.headers['Authorization'] = 'Bearer ' + localStorage.getItem(AppKey.accessToken);
  }

  async get(path: string): ResponseType {
    const payload = {
      'method': 'GET'
    };
    return await this.handleError(path, payload);
  }

  async post(path: string, request: any): ResponseType {
    const payload = {
      'method': 'POST',
      'body': request != null ? JSON.stringify(request) : null
    };
    return await this.handleError(path, payload);
  }

  async put(path: string, request: any): ResponseType {
    const payload = {
      'method': 'PUT',
      'body': request != null ? JSON.stringify(request) : null
    };
    return await this.handleError(path, payload);
  }

  async delete(path: string): ResponseType {
    this.buildHeader();
    const payload = {
      'method': 'DELETE'
    };
    return await this.handleError(path, payload);
  }


  private async handleError(path: string, payload: any): ResponseType {
    this.buildHeader();
    payload['headers'] = this.headers;
    try {
      let response = await fetch(this.buildUrl(path), payload);
      if (response.status === 200) {
        return await response.json();
      }
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem(AppKey.accessToken);
        localStorage.removeItem(AppKey.refreshToken);
        localStorage.removeItem(AppKey.role);
        localStorage.removeItem(AppKey.username);
        localStorage.removeItem(AppKey.photo);
        window.location.href = '/';
        return null;
      }
      return await response.text();
    } catch (e: any) {
      console.log('Exception: ', e);
      return e.toString();
    }
  }
}
