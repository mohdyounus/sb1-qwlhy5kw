import { query } from '../utils/db';

export async function login(username: string, password: string) {
  const result = await query(
    'SELECT id, username, role FROM users WHERE username = $1 AND password = $2',
    [username, password]
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
} 