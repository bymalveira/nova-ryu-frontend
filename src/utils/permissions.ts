export const canPerformAction = (myRole: string, action: 'EDIT' | 'DELETE' | 'CREATE', targetRole?: string) => {
    if (myRole === 'ADMIN') return true;
    
    if (myRole === 'PROFESSOR') {
        if (action === 'CREATE') return true;
        if (action === 'EDIT') return true;
        if (action === 'DELETE') return targetRole === 'ALUNO'; // Professor só deleta aluno
    }
    
    return false;
};