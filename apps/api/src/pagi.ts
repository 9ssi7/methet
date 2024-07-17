export const withDefaultPagi = (page: string | null, perPage: string | null): [number, number] => {
	const parsedPage = page ? parseInt(page, 10) : 1;
	const parsedPerPage = perPage ? parseInt(perPage, 10) : 10;
	return [parsedPage, parsedPerPage > 100 ? 100 : parsedPerPage];
};
