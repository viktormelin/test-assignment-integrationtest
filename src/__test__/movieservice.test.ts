import * as service from '../ts/services/movieservice';
import { movies } from '../ts/services/__mocks__/movieservice';

jest.mock('axios', () => ({
	get: async (url: string) => {
		return new Promise((resolve, reject) => {
			if (!url.endsWith('error')) {
				resolve({ data: movies });
			} else {
				reject({ data: [] });
			}
		});
	},
}));

describe('should test movie endpoint with axios', () => {
	test('should get movie data', async () => {
		const response = await service.getData('query');
		expect(response.length).toBe(4);
		expect(response[1].Title).toBe('1923');
	});

	test('should fail to get movie data', async () => {
		const response = await service.getData('error');
		expect(response.length).toBe(0);
	});
});
