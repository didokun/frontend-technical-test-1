export type NetworkConfig = {
  method?: 'GET' | 'POST';
  url: string;
  params?: Record<string, string>;
  data?: Record<string, unknown>;
}

export const performServerCall = async<Data> ({url, method = 'GET', params = {}, data}: NetworkConfig): Promise<Data> => {
  const apiUrl = new URL(url, process.env.NEXT_PUBLIC_BASE_API)
  apiUrl.search = new URLSearchParams(params).toString();
  const response = await fetch(apiUrl.toString(), {method, ...(data && {body: JSON.stringify(data)})});
  const responseData = await response.json();
  return responseData;
}