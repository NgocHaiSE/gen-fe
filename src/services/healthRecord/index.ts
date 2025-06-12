import { server } from '@/pages/Api';
import { request } from '@umijs/max';
const accessToken = localStorage.getItem('accessToken');
const baseUrl = server;
class HealthRecordService {
  saveHealthRecord = async (body: any, options?: { [key: string]: any }) => {
    return request<ErrorResponse>(`${baseUrl}/${body.typeHealthRecord}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
      ...(options || {}),
    });
  };
  getHealthRecord = async (
    body: any,
    typeHealthRecord: string,
    options?: { [key: string]: any },
  ) => {
    return request<ErrorResponse>(`${baseUrl}/${typeHealthRecord}/get-health-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
      ...(options || {}),
    });
  };
  deleteHealthRecord = async (
    typeHealthRecord: string,
    id: string,
    options?: { [key: string]: any },
  ) => {
    return request<ErrorResponse>(`${baseUrl}/${typeHealthRecord}/delete-health-record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: { id: id },
      ...(options || {}),
    });
  };
  getAllByType = async (
    recordType: string,
    page: string,
    limit: string,
    options?: { [key: string]: any },
  ) => {
    return request<ErrorResponse>(`${baseUrl}/${recordType}/get-all?page=${page}?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      ...(options || {}),
    });
  };
  search = async (body: object, typeHealthRecord, options?: { [key: string]: any }) => {
    return request<ErrorResponse>(`${baseUrl}/${typeHealthRecord}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
      ...(options || {}),
    });
  };
}
export default new HealthRecordService();
