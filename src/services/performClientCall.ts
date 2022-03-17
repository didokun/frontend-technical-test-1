import useSWR from "swr";

export type NetworkConfig = {
  method?: 'GET' | 'POST' | 'DELETE';
  url: string;
  params?: Record<string, string>;
  data?: Record<string, unknown>;
}

export const performClientCall = async<Data> ({url, method = 'GET', params = {}, data}: NetworkConfig): Promise<{data:Data, error: Error}> => {
  const apiUrl = new URL(url, process.env.NEXT_PUBLIC_BASE_API)
  apiUrl.search = new URLSearchParams(params).toString();
  const response = {data: undefined, error: undefined};
  try {
  const apiResponse = await fetch(apiUrl.toString(), {method, ...(data && {body: JSON.stringify(data)})});
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