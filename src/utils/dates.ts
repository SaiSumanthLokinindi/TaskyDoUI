export const formatDueDate = (dueDate: Date | string): string => {
    const now = new Date();
    const due = new Date(dueDate);

    // Reset time to start of day for accurate day calculations
    now.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    // Handle overdue dates (negative difference)
    if (diffDays < 0) {
        const absDays = Math.abs(diffDays);

        if (absDays === 1) return 'Overdue 1 day ago';
        if (absDays < 7) return `Overdue ${absDays} days ago`;

        const weeks = Math.floor(absDays / 7);
        if (absDays < 30) {
            return weeks === 1
                ? 'Overdue 1 week ago'
                : `Overdue ${weeks} weeks ago`;
        }

        const months = Math.floor(absDays / 30);
        if (absDays < 365) {
            return months === 1
                ? 'Overdue 1 month ago'
                : `Overdue ${months} months ago`;
        }

        const years = Math.floor(absDays / 365);
        return years === 1
            ? 'Overdue 1 year ago'
            : `Overdue ${years} years ago`;
    }

    // Handle due dates (positive difference or today)
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays < 7) return `Due in ${diffDays} days`;

    const weeks = Math.floor(diffDays / 7);
    if (diffDays < 30) {
        return weeks === 1 ? 'Due in 1 week' : `Due in ${weeks} weeks`;
    }

    const months = Math.floor(diffDays / 30);
    if (diffDays < 365) {
        return months === 1 ? 'Due in 1 month' : `Due in ${months} months`;
    }

    const years = Math.floor(diffDays / 365);
    return years === 1 ? 'Due in 1 year' : `Due in ${years} years`;
};
