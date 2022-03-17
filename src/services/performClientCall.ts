import useSWR from "swr";

export type NetworkConfig = {
  method?: 'GET' | 'POST' | 'DELETE';
  url: string;
  params?: Record<string, string>;
  data?: Record<string, unknown>;
}

export type ApiResponse<T> = {data:T, error: Error}

export const performClientCall = async<Data> ({url, method = 'GET', params = {}, data}: NetworkConfig): Promise<ApiResponse<Data>> => {
  const apiUrl = new URL(url, process.env.NEXT_PUBLIC_BASE_API)
  apiUrl.search = new URLSearchParams(params).toString();
  const response = {data: undefined, error: undefined};
  try {
  const apiResponse = await fetch(apiUrl.toString(), {
    method, 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    ...(data && {body: JSON.stringify(data)})});
  if(apiResponse.ok) {
    response.data = await apiResponse.json();
  } else {
    response.error = apiResponse.statusText;
  }
  } catch (e) {
    response.error = e;
  }
  return response;
}

export const useClientCall = (url: string) => useSWR(url, performClientCall);