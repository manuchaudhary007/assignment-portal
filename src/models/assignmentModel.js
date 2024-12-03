let assignments = []; // Temporary in-memory database

module.exports = {
    getAssignments: () => assignments,
    addAssignment: (assignment) => assignments.push(assignment),
    updateAssignment: (id, status) => {
        const assignment = assignments.find(a => a.id === id);
        if (assignment) assignment.status = status;
    },
};