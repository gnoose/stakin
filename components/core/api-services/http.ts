const apiUrl = (url: string): string => `${process.env.api}${url}`;

/**
 * Request URL data with POST method
 * @param url
 * @param payload
 * @param isFormData
 *
 * @return
 *    resolves response object
 *    rejects { statusCode: "number", message: "string" }
 */
export function doPost<T>(url: string, payload: any, isFormData = false): Promise<T> {
  return doFetch<T>(url, 'POST', payload, isFormData);
}

/**
 * Request URL data with PUT method
 * @param url
 * @param payload
 *
 * @return
 *    resolves response object
 *    rejects { statusCode: "number", message: "string" }
 */
export function doPut<T>(url: string, payload: any): Promise<T> {
  return doFetch<T>(url, 'PUT', payload);
}

/**
 * Request URL data with GET method
 * @param url
 *
 * @return
 *    resolves response object
 *    rejects { statusCode: "number", message: "string" }
 */
export function doGet<T>(url: string): Promise<T> {
  return doFetch<T>(url);
}

function doFetch<T>(url: string, method = 'GET', payload: any = undefined, isFormData = false): Promise<T> {
  const token = localStorage.getItem('authToken');
  const headers = isFormData ? undefined : {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${token}`,
  };
  let body: any;
  if (isFormData) {
    body = payload;
  } else {
    body = payload ? JSON.stringify(payload) : null;
  }
  return new Promise((resolve, reject) => {
    fetch(apiUrl(url), {body, headers, method})
      .then(async res => {
        const result = await res.json();
        if (res.ok) {
          resolve(result);
        } else {
          reject(result);
        }
      })
      .catch(e => {
        console.log('api call failed on ', url, e);
        reject([]);
      });
  });
}

