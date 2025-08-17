import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

// ===== CANDIDATES SERVICE =====
export const candidatesService = {
  // Get all candidates
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, 'candidates'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting candidates:', error);
      throw error;
    }
  },

  // Get candidate by ID
  async getById(id) {
    try {
      const docRef = doc(db, 'candidates', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting candidate:', error);
      throw error;
    }
  },

  // Add new candidate
  async add(candidateData) {
    try {
      const docRef = await addDoc(collection(db, 'candidates'), {
        ...candidateData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...candidateData };
    } catch (error) {
      console.error('Error adding candidate:', error);
      throw error;
    }
  },

  // Update candidate
  async update(id, updateData) {
    try {
      const docRef = doc(db, 'candidates', id);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  },

  // Delete candidate
  async delete(id) {
    try {
      await deleteDoc(doc(db, 'candidates', id));
      return true;
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }
  },

  // Search candidates by skills
  async searchBySkills(skills) {
    try {
      const q = query(
        collection(db, 'candidates'),
        where('skills', 'array-contains-any', skills)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error searching candidates:', error);
      throw error;
    }
  }
};

// ===== JOBS SERVICE =====
export const jobsService = {
  // Get all jobs
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, 'jobs'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting jobs:', error);
      throw error;
    }
  },

  // Get job by ID
  async getById(id) {
    try {
      const docRef = doc(db, 'jobs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting job:', error);
      throw error;
    }
  },

  // Add new job
  async add(jobData) {
    try {
      const docRef = await addDoc(collection(db, 'jobs'), {
        ...jobData,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...jobData };
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  },

  // Update job
  async update(id, updateData) {
    try {
      const docRef = doc(db, 'jobs', id);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  // Delete job
  async delete(id) {
    try {
      await deleteDoc(doc(db, 'jobs', id));
      return true;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  // Get jobs by department
  async getByDepartment(department) {
    try {
      const q = query(
        collection(db, 'jobs'),
        where('department', '==', department),
        where('status', '==', 'active')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting jobs by department:', error);
      throw error;
    }
  }
};

// ===== EVALUATIONS SERVICE =====
export const evaluationsService = {
  // Get all evaluations
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, 'evaluations'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting evaluations:', error);
      throw error;
    }
  },

  // Get evaluation by ID
  async getById(id) {
    try {
      const docRef = doc(db, 'evaluations', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting evaluation:', error);
      throw error;
    }
  },

  // Add new evaluation
  async add(evaluationData) {
    try {
      const docRef = await addDoc(collection(db, 'evaluations'), {
        ...evaluationData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...evaluationData };
    } catch (error) {
      console.error('Error adding evaluation:', error);
      throw error;
    }
  },

  // Update evaluation
  async update(id, updateData) {
    try {
      const docRef = doc(db, 'evaluations', id);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating evaluation:', error);
      throw error;
    }
  },

  // Get evaluations by candidate
  async getByCandidate(candidateId) {
    try {
      const q = query(
        collection(db, 'evaluations'),
        where('candidateId', '==', candidateId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting evaluations by candidate:', error);
      throw error;
    }
  }
};

// ===== INTERVIEWS SERVICE =====
export const interviewsService = {
  // Get all interviews
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, 'interviews'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting interviews:', error);
      throw error;
    }
  },

  // Get interview by ID
  async getById(id) {
    try {
      const docRef = doc(db, 'interviews', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting interview:', error);
      throw error;
    }
  },

  // Add new interview
  async add(interviewData) {
    try {
      const docRef = await addDoc(collection(db, 'interviews'), {
        ...interviewData,
        status: 'scheduled',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...interviewData };
    } catch (error) {
      console.error('Error adding interview:', error);
      throw error;
    }
  },

  // Update interview
  async update(id, updateData) {
    try {
      const docRef = doc(db, 'interviews', id);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating interview:', error);
      throw error;
    }
  },

  // Delete interview
  async delete(id) {
    try {
      await deleteDoc(doc(db, 'interviews', id));
      return true;
    } catch (error) {
      console.error('Error deleting interview:', error);
      throw error;
    }
  },

  // Get interviews by date range
  async getByDateRange(startDate, endDate) {
    try {
      const q = query(
        collection(db, 'interviews'),
        where('scheduledDate', '>=', startDate),
        where('scheduledDate', '<=', endDate),
        orderBy('scheduledDate')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting interviews by date range:', error);
      throw error;
    }
  }
};

// ===== DOCUMENTS SERVICE =====
export const documentsService = {
  // Get all documents
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, 'documents'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  },

  // Get document by ID
  async getById(id) {
    try {
      const docRef = doc(db, 'documents', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  },

  // Add new document
  async add(documentData) {
    try {
      const docRef = await addDoc(collection(db, 'documents'), {
        ...documentData,
        status: 'processing',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...documentData };
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  },

  // Update document
  async update(id, updateData) {
    try {
      const docRef = doc(db, 'documents', id);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  // Delete document
  async delete(id) {
    try {
      await deleteDoc(doc(db, 'documents', id));
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  // Get documents by candidate
  async getByCandidate(candidateId) {
    try {
      const q = query(
        collection(db, 'documents'),
        where('candidateId', '==', candidateId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents by candidate:', error);
      throw error;
    }
  }
};

// ===== FILE UPLOAD SERVICE =====
export const fileUploadService = {
  // Upload file to Firebase Storage
  async uploadFile(file, path) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  // Delete file from Firebase Storage
  async deleteFile(path) {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
};

// ===== ANALYTICS SERVICE =====
export const analyticsService = {
  // Get hiring analytics
  async getHiringAnalytics() {
    try {
      const candidatesSnapshot = await getDocs(collection(db, 'candidates'));
      const jobsSnapshot = await getDocs(collection(db, 'jobs'));
      const evaluationsSnapshot = await getDocs(collection(db, 'evaluations'));
      const interviewsSnapshot = await getDocs(collection(db, 'interviews'));

      const totalCandidates = candidatesSnapshot.size;
      const totalJobs = jobsSnapshot.size;
      const totalEvaluations = evaluationsSnapshot.size;
      const totalInterviews = interviewsSnapshot.size;

      // Calculate success rates
      const successfulEvaluations = evaluationsSnapshot.docs.filter(
        doc => doc.data().status === 'passed'
      ).length;

      const completedInterviews = interviewsSnapshot.docs.filter(
        doc => doc.data().status === 'completed'
      ).length;

      return {
        totalCandidates,
        totalJobs,
        totalEvaluations,
        totalInterviews,
        evaluationSuccessRate: totalEvaluations > 0 ? (successfulEvaluations / totalEvaluations) * 100 : 0,
        interviewCompletionRate: totalInterviews > 0 ? (completedInterviews / totalInterviews) * 100 : 0
      };
    } catch (error) {
      console.error('Error getting analytics:', error);
      throw error;
    }
  }
};
