import fs from 'fs';
import path from 'path';

export interface User {
  steamId: string;
  username: string;
  avatar: string;
  profileUrl: string;
  createdAt: string;
  lastLogin: string;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'users.json');

// Ensure data directory exists
function ensureDataDir(): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Read users from file with error handling
function readUsers(): User[] {
  try {
    ensureDataDir();
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    console.error('Error reading users database:', error);
    return [];
  }
}

// Write users to file with error handling
function writeUsers(users: User[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing users database:', error);
    return false;
  }
}

// Find user by Steam ID
export function getUserBySteamId(steamId: string): User | null {
  const users = readUsers();
  return users.find((u) => u.steamId === steamId) || null;
}

// Create or update user (optimized single operation)
export function createOrUpdateUser(userData: Partial<User> & { steamId: string }): User {
  const users = readUsers();
  const existingIndex = users.findIndex((u) => u.steamId === userData.steamId);
  const now = new Date().toISOString();

  const user: User = {
    steamId: userData.steamId,
    username: userData.username || 'Unknown',
    avatar: userData.avatar || '',
    profileUrl: userData.profileUrl || `https://steamcommunity.com/profiles/${userData.steamId}`,
    createdAt: existingIndex >= 0 ? users[existingIndex].createdAt : now,
    lastLogin: now,
  };

  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  writeUsers(users);
  return user;
}

