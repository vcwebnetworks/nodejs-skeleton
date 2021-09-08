import https, { RequestOptions } from 'https';

interface Request extends RequestOptions {
  url: string;
  body?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
}

interface Response<T = any> {
  body: T;
  statusCode: number;
}

export default async function httpRequest<T = any>(
  options: Request,
): Promise<Response<T>> {
  const { url, body, ...rest } = options;

  if (!rest.method) {
    rest.method = 'GET';
  }

  const response = await new Promise<Response>((resolve, reject) => {
    const chunks: any[] = [];

    const clientRequest = https.request(url, rest, res => {
      res.on('error', reject);
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        let result = Buffer.concat(chunks).toString();

        try {
          result = JSON.parse(result);
        } catch {
          //
        }

        resolve({
          body: result,
          statusCode: res.statusCode ?? 500,
        });
      });
    });

    if (['POST', 'PUT', 'PATCH'].includes(rest.method) && body) {
      clientRequest.write(body);
    }

    clientRequest.end();
  });

  if (response.statusCode >= 400) {
    throw new Error(`Unable to make request in ([${rest.method}] ${url}).`);
  }

  return response;
}
