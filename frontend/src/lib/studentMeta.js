// Shared label maps for the codes stored on a student record.

export const BRANCH_LABELS = {
    CSE: 'Computer Science',
    ECE: 'Electronics and Communication',
    ME: 'Mechanical Engineering',
    CE: 'Civil Engineering',
    EE: 'Electrical Engineering',
};

export const YEAR_LABELS = {
    1: '1st Year',
    2: '2nd Year',
    3: '3rd Year',
    4: '4th Year',
};

export const BRANCH_OPTIONS = Object.entries(BRANCH_LABELS).map(([value, label]) => ({ value, label }));
export const YEAR_OPTIONS = Object.entries(YEAR_LABELS).map(([value, label]) => ({ value, label }));
