import { request } from '@umijs/max';

const accessToken = localStorage.getItem('accessToken');

class CRUDService {
  saveService = async (api: String, body: any, options?: { [key: string]: any }) => {
    return request(`${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
      ...(options || {}),
    });
  };
  getService = async (api: String, body: any, options?: { [key: string]: any }) => {
    return request(`${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  };
  deleteService = async (api: String, body: any, options?: { [key: string]: any }) => {
    return request(`${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: { id: body },
      ...(options || {}),
    });
  };
  getAllService = async (api: String, options?: { [key: string]: any }) => {
    return request(`${api}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(options || {}),
    });
  };
  searchService = async (api: string, body: object, options?: { [key: string]: any }) => {
    return request(`${api}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  };
  updateService = async (api: string, body: object, options?: { [key: string]: any }) => {
    return request(`${api}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
      ...(options || {}),
    });
  };
}
export default new CRUDService();
