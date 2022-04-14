import { IContact, IServerLoginResponse } from '../ts';

export default class Service {
  private _apiBase: string;

  constructor() {
    this._apiBase = 'http://localhost:3000/';
  }

  private getResource = async (url: string): Promise<any> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json();   
  }

  private postResource = async (url: string, data: IContact): Promise<IContact> => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  private updateResource = async (url: string, data: IContact): Promise<IContact> => {
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  private deleteResource = async (url: string): Promise<void> => {
    const res = await fetch(url, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  getContacts = (): Promise<IContact[]> => this.getResource(`${this._apiBase}contacts`);
  delete = (id: number): Promise<void> => this.deleteResource(`${this._apiBase}contacts/${id}`); 
  update = (data: IContact): Promise<IContact> => this.updateResource(`${this._apiBase}contacts/${data.id}`, data);
  add = (data: IContact): Promise<IContact> => this.postResource(`${this._apiBase}contacts`, data);
  
  auth = async (login: string, pass: string): Promise<IServerLoginResponse> => {
    return this.getResource(`${this._apiBase}auth`)
  }
}
