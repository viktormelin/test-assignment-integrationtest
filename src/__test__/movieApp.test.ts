/**
 * @jest-environment jsdom
 */

import * as app from '../ts/movieApp';
import { movies } from '../ts/services/__mocks__/movieservice';
import * as service from '../ts/services/movieservice';

beforeEach(() => {
	document.body.innerHTML = '';
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe('should test submit functions', () => {
	test('should submit on submit event', () => {
		document.body.innerHTML = `<form id="searchForm">
			<input type="text" id="searchText" placeholder="Skriv titel här" />
			<button type="submit" id="search">Sök</button>
		</form>
		<div id="movie-container"></div>`;

		const formElement = document.querySelector('#searchForm') as HTMLFormElement;
		const submitSpy = jest.spyOn(app, 'handleSubmit').mockResolvedValue();

		app.init();
		formElement.submit();

		expect(submitSpy).toHaveBeenCalled();
	});

	test('should create html on submit', async () => {
		document.body.innerHTML = `
			<input type="text" id="searchText" placeholder="Skriv titel här" />
			<div id="movie-container"></div>
		`;

		const htmlSpy = jest.spyOn(app, 'createHtml');
		const moviesSpy = jest.spyOn(service, 'getData').mockResolvedValue(movies.Search);

		await app.handleSubmit();

		expect(moviesSpy).toHaveBeenCalled();
		expect(htmlSpy).toHaveBeenCalled();
	});

	describe('should test all failures on submit', () => {
		test('should fail when query is not found', async () => {
			document.body.innerHTML = `
				<input type="text" id="searchText" placeholder="Skriv titel här" />
				<div id="movie-container"></div>
			`;

			const moviesSpy = jest.spyOn(service, 'getData').mockResolvedValue([]);
			const errDisplaySpy = jest.spyOn(app, 'displayNoResult');

			await app.handleSubmit();

			expect(moviesSpy).toHaveBeenCalled();
			expect(errDisplaySpy).toHaveBeenCalled();
		});

		test('should fail on error from API', async () => {
			document.body.innerHTML = `
				<input type="text" id="searchText" placeholder="Skriv titel här" />
				<div id="movie-container"></div>
			`;

			const moviesSpy = jest.spyOn(service, 'getData').mockRejectedValue(new Error());
			const errDisplaySpy = jest.spyOn(app, 'displayNoResult');

			await app.handleSubmit();

			expect(moviesSpy).toHaveBeenCalled();
			expect(errDisplaySpy).toHaveBeenCalled();
		});
	});
});
