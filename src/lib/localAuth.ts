// Local storage keys
const USERS_KEY = "elocate_users";
const CURRENT_USER_KEY = "elocate_current_user";
const RECYCLING_HISTORY_KEY = "elocate_recycling_history";
const REDEMPTION_HISTORY_KEY = "elocate_redemption_history";

export interface User {
  id: string;
  email: string;
  mobileNumber?: string;
  passwordHash: string;
  displayName: string;
  carbonCredits: number;
  pendingCredits: number;
  totalCreditsEarned: number;
  devicesRecycled: number;
  createdAt: string;
  updatedAt: string;
}

export interface RedemptionRecord {
  id: string;
  userId: string;
  rewardName: string;
  creditsSpent: number;
  redeemedAt: string;
  brand: string;
  code: string;
}

export interface RecyclingRecord {
  id: string;
  userId: string;
  deviceType: string;
  deviceName: string;
  creditsEarned: number;
  facilityName: string;
  recycledAt: string;
  status: 'Requested' | 'Pickup Assigned' | 'In Transit' | 'Arrived at Facility' | 'Verified';
  trackingId: string;
  otp?: string;
}

// Simple hash function (NOT cryptographically secure - for demo only)
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get all users from localStorage
export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userId = sessionStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return null;
  const users = getUsers();
  return users.find((u) => u.id === userId) || null;
};

// Sign up
export const signUp = (
  email: string,
  password: string,
  displayName: string,
  mobileNumber: string
): { success: boolean; error?: string; user?: User } => {
  if (!mobileNumber) {
    return { success: false, error: "Mobile number is required" };
  }
  const users = getUsers();

  // Check if email exists
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "Email already registered" };
  }

  // Create new user
  const newUser: User = {
    id: generateId(),
    email: email.toLowerCase(),
    mobileNumber,
    passwordHash: simpleHash(password),
    displayName,
    carbonCredits: 0,
    pendingCredits: 0,
    totalCreditsEarned: 0,
    devicesRecycled: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  sessionStorage.setItem(CURRENT_USER_KEY, newUser.id);

  return { success: true, user: newUser };
};

// Sign in
export const signIn = (
  email: string,
  password: string
): { success: boolean; error?: string; user?: User } => {
  const users = getUsers();
  const user = users.find(
    (u) =>
      (u.email.toLowerCase() === email.toLowerCase() || u.mobileNumber === email) &&
      u.passwordHash === simpleHash(password)
  );

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  sessionStorage.setItem(CURRENT_USER_KEY, user.id);
  return { success: true, user };
};

// Sign out
export const signOut = (): void => {
  sessionStorage.removeItem(CURRENT_USER_KEY);
};

// Update user
export const updateUser = (updates: Partial<User>): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const users = getUsers();
  const index = users.findIndex((u) => u.id === currentUser.id);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveUsers(users);
  return users[index];
};

// Get recycling history
export const getRecyclingHistory = (userId?: string): RecyclingRecord[] => {
  const data = localStorage.getItem(RECYCLING_HISTORY_KEY);
  const history: RecyclingRecord[] = data ? JSON.parse(data) : [];
  if (userId) {
    return history.filter((r) => r.userId === userId);
  }
  return history;
};

// Add recycling record
// Add recycling record
export const addRecyclingRecord = (
  record: Omit<RecyclingRecord, "id" | "recycledAt" | "status" | "trackingId">
): RecyclingRecord => {
  const data = localStorage.getItem(RECYCLING_HISTORY_KEY);
  const history: RecyclingRecord[] = data ? JSON.parse(data) : [];

  const newRecord: RecyclingRecord = {
    ...record,
    id: generateId(),
    recycledAt: new Date().toISOString(),
    status: 'Requested',
    trackingId: `ELC-${Math.floor(100000 + Math.random() * 900000)}`,
    otp: Math.floor(1000 + Math.random() * 9000).toString()
  };

  history.push(newRecord);
  localStorage.setItem(RECYCLING_HISTORY_KEY, JSON.stringify(history));

  // Update user pending credits
  const currentUser = getCurrentUser();
  if (currentUser) {
    updateUser({
      pendingCredits: (currentUser.pendingCredits || 0) + record.creditsEarned,
      devicesRecycled: (currentUser.devicesRecycled || 0) + 1,
    });
  }

  return newRecord;
};

export const updateRecyclingStatus = (id: string, status: RecyclingRecord['status']): RecyclingRecord | null => {
  const data = localStorage.getItem(RECYCLING_HISTORY_KEY);
  const history: RecyclingRecord[] = data ? JSON.parse(data) : [];

  const index = history.findIndex(r => r.id === id);
  if (index !== -1) {
    const oldStatus = history[index].status;
    history[index].status = status;
    localStorage.setItem(RECYCLING_HISTORY_KEY, JSON.stringify(history));

    // If verified, move credits from pending to carbonCredits
    if (status === 'Verified' && oldStatus !== 'Verified') {
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.id === history[index].userId) {
        updateUser({
          carbonCredits: (currentUser.carbonCredits || 0) + history[index].creditsEarned,
          totalCreditsEarned: (currentUser.totalCreditsEarned || 0) + history[index].creditsEarned,
          pendingCredits: Math.max(0, (currentUser.pendingCredits || 0) - history[index].creditsEarned)
        });
      }
    }
    return history[index];
  }
  return null;
};


// Import users from CSV
export const importUsersFromCSV = (csvContent: string): number => {
  const lines = csvContent.trim().split("\n");
  if (lines.length < 2) return 0;

  const existingUsers = getUsers();
  let imported = 0;

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length >= 7) {
      const user: User = {
        id: values[0],
        email: values[1],
        passwordHash: "", // Can't import password
        displayName: values[2],
        carbonCredits: parseInt(values[3]) || 0,
        pendingCredits: 0,
        totalCreditsEarned: parseInt(values[3]) || 0,
        devicesRecycled: parseInt(values[4]) || 0,
        createdAt: values[5],
        updatedAt: values[6],
      };

      // Only add if not exists
      if (!existingUsers.find((u) => u.id === user.id)) {
        existingUsers.push(user);
        imported++;
      }
    }
  }

  saveUsers(existingUsers);
  return imported;
};

// Import recycling history from CSV
export const importHistoryFromCSV = (csvContent: string): number => {
  const lines = csvContent.trim().split("\n");
  if (lines.length < 2) return 0;

  const data = localStorage.getItem(RECYCLING_HISTORY_KEY);
  const existingHistory: RecyclingRecord[] = data ? JSON.parse(data) : [];
  let imported = 0;

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");
    if (values.length >= 7) {
      const record: RecyclingRecord = {
        id: values[0],
        userId: values[1],
        deviceType: values[2],
        deviceName: values[3],
        creditsEarned: parseInt(values[4]) || 0,
        facilityName: values[5],
        recycledAt: values[6],
        status: 'Verified',
        trackingId: `ELC-IMP-${Math.floor(100000 + Math.random() * 900000)}`
      };

      // Only add if not exists
      if (!existingHistory.find((r) => r.id === record.id)) {
        existingHistory.push(record);
        imported++;
      }
    }
  }

  localStorage.setItem(RECYCLING_HISTORY_KEY, JSON.stringify(existingHistory));
  return imported;
};

// Redemption logic
export const getRedemptionHistory = (userId?: string): RedemptionRecord[] => {
  const data = localStorage.getItem(REDEMPTION_HISTORY_KEY);
  const history: RedemptionRecord[] = data ? JSON.parse(data) : [];
  if (userId) {
    return history.filter((r) => r.userId === userId);
  }
  return history;
};

export const redeemReward = (
  reward: { name: string; credits: number; brand: string }
): { success: boolean; error?: string; record?: RedemptionRecord } => {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, error: "Not authenticated" };

  if ((currentUser.carbonCredits || 0) < reward.credits) {
    return { success: false, error: "Insufficient credits" };
  }

  const data = localStorage.getItem(REDEMPTION_HISTORY_KEY);
  const history: RedemptionRecord[] = data ? JSON.parse(data) : [];

  const newRecord: RedemptionRecord = {
    id: generateId(),
    userId: currentUser.id,
    rewardName: reward.name,
    creditsSpent: reward.credits,
    redeemedAt: new Date().toISOString(),
    brand: reward.brand,
    code: `ECO-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
  };

  history.push(newRecord);
  localStorage.setItem(REDEMPTION_HISTORY_KEY, JSON.stringify(history));

  updateUser({
    carbonCredits: currentUser.carbonCredits - reward.credits
  });

  return { success: true, record: newRecord };
};
