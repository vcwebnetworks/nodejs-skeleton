import https, { RequestOptions } from 'https';

export interface HttpRequest extends RequestOptions {
  url: string;
  body?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
}

interface Response<T = Buffer | any> {
  body: T;
  statusCode: number;
}

export default async function httpRequest<T = Buffer | any>(
  options: HttpRequest,
): Promise<Response<T>> {
  const { url, body, ...rest } = options;

  if (!rest.method) {
    rest.method = 'GET';
  }

  const response = await new Promise<Response>((resolve, reject) => {
    const chunks: any[] = [];

    const request = https.request(url, rest, httpResponse => {
      httpResponse.on('error', reject);
      httpResponse.on('data', chunk => chunks.push(chunk));

      httpResponse.on('end', () => {
        let buffer = Buffer.concat(chunks);

        try {
          buffer = JSON.parse(buffer.toString());
        } catch {
          //
        }

        resolve({
          body: buffer,
          statusCode: httpResponse.statusCode ?? 500,
        });
      });
    });

    request.on('error', reject);

    if (['POST', 'PUT', 'PATCH'].includes(rest.method) && body) {
      request.write(body);
    }

    request.end();
  });

  if (response.statusCode >= 400) {
    throw new Error(`Unable to make request in ([${rest.method}] ${url}).`);
  }

  return response;
}
