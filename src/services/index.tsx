import { IContact } from '../ts';

export default class Service {
  private _apiBase: string;

  constructor() {
    this._apiBase = 'http://localhost:3000/';
  }

  private getResource = async (url: string): Promise<JSON> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json();   
  }

  private postResource = async (url: string, data: IContact): Promise<JSON> => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  private updateResource = async (url: string, data: IContact): Promise<JSON> => {
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  private deleteResource = async (url: string): Promise<JSON> => {
    const res = await fetch(url, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  getContacts = (): Promise<JSON> => this.getResource(`${this._apiBase}contacts`);
  delete = (id: number): Promise<JSON> => this.deleteResource(`${this._apiBase}contacts/${id}`); 
  update = (data: IContact): Promise<JSON> => this.updateResource(`${this._apiBase}contacts/${data.id}`, data);
  add = (data: IContact): Promise<JSON> => this.postResource(`${this._apiBase}contacts`, data);
  
  auth = async (login: string, pass: string): Promise<{}> => {
    if (login !== 'tester@test.tst' || pass !== 'password' ) return false;
    return this.getResource(`${this._apiBase}auth`)
  }
}
