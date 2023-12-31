export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCESSFUL': return 200;
    case 'OK': return 201;
    case 'INVALID_DATA': return 400;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 422;
    case 'UNAUTHORIZED': return 401;
    default: return 500;
  }
}
