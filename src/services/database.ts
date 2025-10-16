import { db } from '../db/config';
import { users, roles, permissions, certificationTracks, modules, mockTests, courseProgress, mockTestResults, leads } from '../db/schema';
import { eq, and, sql, or, like } from 'drizzle-orm';

// ============================================
// USER OPERATIONS
// ============================================

export async function getAllUsers() {
  try {
    const allUsers = await db.select().from(users);
    return allUsers.map(user => ({
      ...user,
      profile: {
        phone: user.phone || '',
        organization: user.organization || '',
        designation: user.designation || '',
        location: user.location || '',
        joinedDate: user.joinedDate || '',
        bio: user.bio || '',
        photo: user.photo || '',
        idDocument: user.idDocument || '',
        verified: user.verified || false,
        verifiedBy: user.verifiedBy || undefined,
        verifiedDate: user.verifiedDate || undefined,
      },
      enrollment: {
        status: user.enrollmentStatus || 'active',
        enrolledDate: user.enrolledDate || '',
        expiryDate: user.expiryDate || '',
      },
      adminRole: user.adminRole || undefined,
      certificationTrack: user.certificationTrack || undefined,
      examStatus: user.examStatus || 'not_attempted',
      remainingAttempts: user.remainingAttempts || 2,
      credlyBadgeUrl: user.credlyBadgeUrl || undefined,
      certificateNumber: user.certificateNumber || undefined,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (result.length === 0) return null;

    const user = result[0];
    return {
      ...user,
      profile: {
        phone: user.phone || '',
        organization: user.organization || '',
        designation: user.designation || '',
        location: user.location || '',
        joinedDate: user.joinedDate || '',
        bio: user.bio || '',
        photo: user.photo || '',
        idDocument: user.idDocument || '',
        verified: user.verified || false,
        verifiedBy: user.verifiedBy || undefined,
        verifiedDate: user.verifiedDate || undefined,
      },
      enrollment: {
        status: user.enrollmentStatus || 'active',
        enrolledDate: user.enrolledDate || '',
        expiryDate: user.expiryDate || '',
      },
      adminRole: user.adminRole || undefined,
      certificationTrack: user.certificationTrack || undefined,
      examStatus: user.examStatus || 'not_attempted',
      remainingAttempts: user.remainingAttempts || 2,
      credlyBadgeUrl: user.credlyBadgeUrl || undefined,
      certificateNumber: user.certificateNumber || undefined,
    };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

export async function getUserById(userId: number) {
  try {
    const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (result.length === 0) return null;

    const user = result[0];
    return {
      ...user,
      profile: {
        phone: user.phone || '',
        organization: user.organization || '',
        designation: user.designation || '',
        location: user.location || '',
        joinedDate: user.joinedDate || '',
        bio: user.bio || '',
        photo: user.photo || '',
        idDocument: user.idDocument || '',
        verified: user.verified || false,
        verifiedBy: user.verifiedBy || undefined,
        verifiedDate: user.verifiedDate || undefined,
      },
      enrollment: {
        status: user.enrollmentStatus || 'active',
        enrolledDate: user.enrolledDate || '',
        expiryDate: user.expiryDate || '',
      },
      adminRole: user.adminRole || undefined,
      certificationTrack: user.certificationTrack || undefined,
      examStatus: user.examStatus || 'not_attempted',
      remainingAttempts: user.remainingAttempts || 2,
      credlyBadgeUrl: user.credlyBadgeUrl || undefined,
      certificateNumber: user.certificateNumber || undefined,
    };
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  role: string;
  adminRole?: string;
  certificationTrack?: string;
  phone?: string;
  organization?: string;
  designation?: string;
  location?: string;
  joinedDate?: string;
  bio?: string;
  photo?: string;
  enrollmentStatus?: string;
  enrolledDate?: string;
  expiryDate?: string;
}) {
  try {
    const result = await db.insert(users).values({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      adminRole: userData.adminRole,
      certificationTrack: userData.certificationTrack,
      phone: userData.phone,
      organization: userData.organization,
      designation: userData.designation,
      location: userData.location,
      joinedDate: userData.joinedDate,
      bio: userData.bio,
      photo: userData.photo,
      enrollmentStatus: userData.enrollmentStatus || 'active',
      enrolledDate: userData.enrolledDate,
      expiryDate: userData.expiryDate,
    }).returning();

    return result[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function updateUser(userId: number, updates: Partial<{
  name: string;
  email: string;
  password: string;
  role: string;
  adminRole: string | null;
  certificationTrack: string | null;
  phone: string | null;
  organization: string | null;
  designation: string | null;
  location: string | null;
  bio: string | null;
  photo: string | null;
  idDocument: string | null;
  verified: boolean;
  verifiedBy: string | null;
  verifiedDate: string | null;
  enrollmentStatus: string;
  enrolledDate: string | null;
  expiryDate: string | null;
  examStatus: string;
  remainingAttempts: number;
  addonAttempts: number;
  addonAttemptsPurchased: number;
  credlyBadgeUrl: string | null;
  certificateNumber: string | null;
  certificateIssuedDate: string | null;
  certificateExpiryDate: string | null;
  certificateStatus: string | null;
  expiryNotificationSent: boolean;
}>) {
  try {
    const result = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function deleteUser(userId: number) {
  try {
    // Delete related records first
    await db.delete(courseProgress).where(eq(courseProgress.userId, userId));
    await db.delete(mockTestResults).where(eq(mockTestResults.userId, userId));

    // Delete user
    await db.delete(users).where(eq(users.id, userId));

    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// ============================================
// COURSE PROGRESS OPERATIONS
// ============================================

export async function getUserCourseProgress(userId: number) {
  try {
    const progress = await db.select().from(courseProgress).where(eq(courseProgress.userId, userId));
    return progress;
  } catch (error) {
    console.error('Error fetching course progress:', error);
    throw error;
  }
}

export async function updateCourseProgress(userId: number, moduleId: string, progressData: {
  progress: number;
  status: string;
  overallProgress: number;
}) {
  try {
    // Check if progress record exists
    const existing = await db.select()
      .from(courseProgress)
      .where(and(
        eq(courseProgress.userId, userId),
        eq(courseProgress.moduleId, moduleId)
      ))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record
      const result = await db.update(courseProgress)
        .set({
          progress: progressData.progress,
          status: progressData.status,
          overallProgress: progressData.overallProgress,
          updatedAt: new Date(),
        })
        .where(and(
          eq(courseProgress.userId, userId),
          eq(courseProgress.moduleId, moduleId)
        ))
        .returning();

      return result[0];
    } else {
      // Create new record
      const result = await db.insert(courseProgress).values({
        userId,
        moduleId,
        progress: progressData.progress,
        status: progressData.status,
        overallProgress: progressData.overallProgress,
      }).returning();

      return result[0];
    }
  } catch (error) {
    console.error('Error updating course progress:', error);
    throw error;
  }
}

// ============================================
// MOCK TEST OPERATIONS
// ============================================

export async function getAllMockTests() {
  try {
    const tests = await db.select().from(mockTests);
    return tests.map(test => ({
      ...test,
      questions: test.questions as any[], // Parse JSONB
    }));
  } catch (error) {
    console.error('Error fetching mock tests:', error);
    throw error;
  }
}

export async function getMockTestById(testId: string) {
  try {
    const result = await db.select().from(mockTests).where(eq(mockTests.id, testId)).limit(1);
    if (result.length === 0) return null;

    return {
      ...result[0],
      questions: result[0].questions as any[],
    };
  } catch (error) {
    console.error('Error fetching mock test:', error);
    throw error;
  }
}

export async function getUserMockTestResults(userId: number) {
  try {
    const results = await db.select().from(mockTestResults).where(eq(mockTestResults.userId, userId));
    return results;
  } catch (error) {
    console.error('Error fetching mock test results:', error);
    throw error;
  }
}

export async function saveMockTestResult(userId: number, testId: string, score: number, completed: boolean, answers?: any) {
  try {
    // Check if a result already exists for this user and test
    const existing = await db.select()
      .from(mockTestResults)
      .where(and(
        eq(mockTestResults.userId, userId),
        eq(mockTestResults.testId, testId)
      ))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record
      const result = await db.update(mockTestResults)
        .set({
          score,
          completed,
          completedAt: completed ? new Date() : null,
          answers: answers || null,
        })
        .where(and(
          eq(mockTestResults.userId, userId),
          eq(mockTestResults.testId, testId)
        ))
        .returning();

      return result[0];
    } else {
      // Create new record
      const result = await db.insert(mockTestResults).values({
        userId,
        testId,
        score,
        completed,
        completedAt: completed ? new Date() : null,
        answers: answers || null,
      }).returning();

      return result[0];
    }
  } catch (error) {
    console.error('Error saving mock test result:', error);
    throw error;
  }
}

// ============================================
// ROLES & PERMISSIONS OPERATIONS
// ============================================

export async function getAllRoles() {
  try {
    const allRoles = await db.select().from(roles);
    return allRoles.map(role => ({
      ...role,
      permissions: role.permissions as string[], // Parse JSONB
    }));
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
}

export async function getAllPermissions() {
  try {
    return await db.select().from(permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
}

export async function getRoleById(roleId: string) {
  try {
    const result = await db.select().from(roles).where(eq(roles.id, roleId)).limit(1);
    if (result.length === 0) return null;

    return {
      ...result[0],
      permissions: result[0].permissions as string[],
    };
  } catch (error) {
    console.error('Error fetching role:', error);
    throw error;
  }
}

// ============================================
// CERTIFICATION TRACKS OPERATIONS
// ============================================

export async function getAllCertificationTracks() {
  try {
    const tracks = await db.select().from(certificationTracks).where(eq(certificationTracks.active, true));
    return tracks.map(track => ({
      ...track,
      modules: track.modules as string[], // Parse JSONB
      competencies: track.competencies as string[], // Parse JSONB
    }));
  } catch (error) {
    console.error('Error fetching certification tracks:', error);
    throw error;
  }
}

export async function getCertificationTrackById(trackId: string) {
  try {
    const result = await db.select().from(certificationTracks).where(eq(certificationTracks.id, trackId)).limit(1);
    if (result.length === 0) return null;

    return {
      ...result[0],
      modules: result[0].modules as string[],
      competencies: result[0].competencies as string[],
    };
  } catch (error) {
    console.error('Error fetching certification track:', error);
    throw error;
  }
}

// ============================================
// MODULES OPERATIONS
// ============================================

export async function getAllModules() {
  try {
    const allModules = await db.select().from(modules);
    return allModules.map(module => ({
      ...module,
      topics: module.topics as string[], // Parse JSONB
    }));
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
}

export async function getModuleById(moduleId: string) {
  try {
    const result = await db.select().from(modules).where(eq(modules.id, moduleId)).limit(1);
    if (result.length === 0) return null;

    return {
      ...result[0],
      topics: result[0].topics as string[],
    };
  } catch (error) {
    console.error('Error fetching module:', error);
    throw error;
  }
}

// ============================================
// AUTHENTICATION
// ============================================

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await getUserByEmail(email);
    if (!user) return null;

    // In production, you should use proper password hashing (bcrypt, etc.)
    if (user.password === password) {
      return user;
    }

    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

// ============================================
// LEADS OPERATIONS
// ============================================

export async function getAllLeads() {
  try {
    const allLeads = await db.select().from(leads).orderBy(sql`${leads.createdAt} DESC`);
    return allLeads.map(lead => ({
      ...lead,
      id: String(lead.id),
      notes: (lead.notes as string[]) || [],
      createdDate: lead.createdAt?.toISOString() || new Date().toISOString(),
      lastUpdated: lead.updatedAt?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}

export async function getLeadById(leadId: number) {
  try {
    const result = await db.select().from(leads).where(eq(leads.id, leadId)).limit(1);
    if (result.length === 0) return null;

    const lead = result[0];
    return {
      ...lead,
      id: String(lead.id),
      notes: (lead.notes as string[]) || [],
      createdDate: lead.createdAt?.toISOString() || new Date().toISOString(),
      lastUpdated: lead.updatedAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching lead:', error);
    throw error;
  }
}

export async function createLead(leadData: {
  type: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  address?: string;
  additionalInfo?: string;
  status?: string;
  assignedTo?: string;
  estimatedValue?: number;
  followUpDate?: string;
}) {
  try {
    const result = await db.insert(leads).values({
      type: leadData.type,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      organization: leadData.organization,
      address: leadData.address || '',
      additionalInfo: leadData.additionalInfo || '',
      status: leadData.status || 'new',
      assignedTo: leadData.assignedTo,
      notes: [],
      estimatedValue: leadData.estimatedValue,
      followUpDate: leadData.followUpDate,
    }).returning();

    const lead = result[0];
    return {
      ...lead,
      id: String(lead.id),
      notes: (lead.notes as string[]) || [],
      createdDate: lead.createdAt?.toISOString() || new Date().toISOString(),
      lastUpdated: lead.updatedAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

export async function updateLead(leadId: number, updates: Partial<{
  type: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  address: string;
  additionalInfo: string;
  status: string;
  assignedTo: string;
  estimatedValue: number;
  followUpDate: string;
}>) {
  try {
    const result = await db.update(leads)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(leads.id, leadId))
      .returning();

    if (result.length === 0) return null;

    const lead = result[0];
    return {
      ...lead,
      id: String(lead.id),
      notes: (lead.notes as string[]) || [],
      createdDate: lead.createdAt?.toISOString() || new Date().toISOString(),
      lastUpdated: lead.updatedAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}

export async function updateLeadStatus(leadId: number, status: string, updatedBy: string) {
  try {
    // Get current lead to update notes
    const currentLead = await getLeadById(leadId);
    if (!currentLead) return null;

    const newNote = `Status changed to "${status}" by ${updatedBy} on ${new Date().toLocaleString()}`;
    const updatedNotes = [...currentLead.notes, newNote];

    const result = await db.update(leads)
      .set({
        status,
        notes: updatedNotes,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, leadId))
      .returning();

    if (result.length === 0) return null;

    const lead = result[0];
    return {
      ...lead,
      id: String(lead.id),
      notes: (lead.notes as string[]) || [],
      createdDate: lead.createdAt?.toISOString() || new Date().toISOString(),
      lastUpdated: lead.updatedAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw error;
  }
}

export async function addLeadNote(leadId: number, note: string, createdBy: string) {
  try {
    // Get current lead to update notes
    const currentLead = await getLeadById(leadId);
    if (!currentLead) return null;

    const noteText = `[${new Date().toLocaleString()}] ${createdBy}: ${note}`;
    const updatedNotes = [...currentLead.notes, noteText];

    const result = await db.update(leads)
      .set({
        notes: updatedNotes,
        updatedAt: new Date(),
      })
      .where(eq(leads.id, leadId))
      .returning();

    if (result.length === 0) return null;

    const lead = result[0];
    return {
      ...lead,
      id: String(lead.id),
      notes: (lead.notes as string[]) || [],
      createdDate: lead.createdAt?.toISOString() || new Date().toISOString(),
      lastUpdated: lead.updatedAt?.toISOString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error adding lead note:', error);
    throw error;
  }
}

export async function deleteLead(leadId: number) {
  try {
    await db.delete(leads).where(eq(leads.id, leadId));
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
}

export async function searchLeads(query: string) {
  try {
    const lowerQuery = `%${query.toLowerCase()}%`;
    const results = await db.select()
      .from(leads)
      .where(
        or(
          like(sql`LOWER(${leads.name})`, lowerQuery),
          like(sql`LOWER(${leads.email})`, lowerQuery),
          like(sql`LOWER(${leads.organization})`, lowerQuery),
          like(leads.phone, `%${query}%`)
        )
      )
      .orderBy(sql`${leads.createdAt} DESC`);

    return results.map(lead => ({
      ...lead,
      id: String(lead.id),
      notes: (lead.notes as string[]) || [],
      createdDate: lead.createdAt?.toISOString() || new Date().toISOString(),
      lastUpdated: lead.updatedAt?.toISOString() || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error searching leads:', error);
    throw error;
  }
}

export async function getLeadStats() {
  try {
    const allLeads = await db.select().from(leads);

    return {
      total: allLeads.length,
      new: allLeads.filter(l => l.status === 'new').length,
      contacted: allLeads.filter(l => l.status === 'contacted').length,
      qualified: allLeads.filter(l => l.status === 'qualified').length,
      negotiation: allLeads.filter(l => l.status === 'negotiation').length,
      converted: allLeads.filter(l => l.status === 'converted').length,
      lost: allLeads.filter(l => l.status === 'lost').length,
      byType: {
        university: allLeads.filter(l => l.type === 'university').length,
        school: allLeads.filter(l => l.type === 'school').length,
        organization: allLeads.filter(l => l.type === 'organization').length,
      }
    };
  } catch (error) {
    console.error('Error getting lead stats:', error);
    throw error;
  }
}
