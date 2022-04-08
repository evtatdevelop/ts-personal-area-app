import { IContact } from '../ts';

export default class Service {
  _apiBase: string;

  constructor() {
    this._apiBase = 'http://localhost:3000/';
  }

  getResource = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json();   
  }

  postResource = async (url: string, data: IContact) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  updateResource = async (url: string, data: IContact) => {
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  deleteResource = async (url: string) => {
    const res = await fetch(url, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  getContacts = () => this.getResource(`${this._apiBase}contacts`);
  delete = (id: number) => this.deleteResource(`${this._apiBase}contacts/${id}`); 
  update = (data: IContact) => this.updateResource(`${this._apiBase}contacts/${data.id}`, data);
  add = (data: IContact) => this.postResource(`${this._apiBase}contacts`, data);
  
  
  auth = async (login: string, pass: string) => {
    if (login !== 'tester@test.tst' || pass !== 'password' ) return false;
    return this.getResource(`${this._apiBase}auth`)
  }

}

