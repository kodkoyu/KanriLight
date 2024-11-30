export function calculatePagination(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    return { skip, limit };
}