/**
 * @jest-environment jsdom
 */

import * as func from '../ts/functions';
import { IMovie } from '../ts/models/Movie';
import { movies } from '../ts/services/__mocks__/movieservice';

describe('should test sort function', () => {
	describe('should test sort in descending order', () => {
		test('should sort movies', () => {
			const unsortedArr = [...movies.Search];
			const sortedArr = func.movieSort([...movies.Search]);

			expect(sortedArr[0]).toBe(unsortedArr[1]);
			expect(sortedArr[1]).toBe(unsortedArr[0]);
			expect(sortedArr[2]).toBe(unsortedArr[3]);
			expect(sortedArr[3]).toBe(unsortedArr[2]);
		});

		test('should not sort movies with equal title', () => {
			const equalTitleArr: IMovie[] = [
				{
					Title: 'Blue Bloods',
					imdbID: 'ABC123',
					Type: 'Movie',
					Poster: 'https://posterlink.com/',
					Year: '1990',
				},
				{
					Title: 'Blue Bloods',
					imdbID: '123ABC',
					Type: 'Movie',
					Poster: 'https://posterlink.com/',
					Year: '1990',
				},
			];
			const unsortedArr = [...equalTitleArr];
			const sortedArr = func.movieSort([...equalTitleArr]);

			expect(sortedArr[0]).toBe(unsortedArr[0]);
			expect(sortedArr[1]).toBe(unsortedArr[1]);
		});
	});

	describe('should test sort in ascending order', () => {
		test('should sort movies in ascending order', () => {
			const unsortedArr = [...movies.Search];
			const sortedArr = func.movieSort([...movies.Search], false);

			expect(sortedArr[0]).toBe(unsortedArr[2]);
			expect(sortedArr[1]).toBe(unsortedArr[3]);
			expect(sortedArr[2]).toBe(unsortedArr[0]);
			expect(sortedArr[3]).toBe(unsortedArr[1]);
		});

		test('should not sort movies with equal title', () => {
			const equalTitleArr: IMovie[] = [
				{
					Title: 'Blue Bloods',
					imdbID: 'ABC123',
					Type: 'Movie',
					Poster: 'https://posterlink.com/',
					Year: '1990',
				},
				{
					Title: 'Blue Bloods',
					imdbID: '123ABC',
					Type: 'Movie',
					Poster: 'https://posterlink.com/',
					Year: '1990',
				},
			];
			const unsortedArr = [...equalTitleArr];
			const sortedArr = func.movieSort([...equalTitleArr], false);

			expect(sortedArr[0]).toBe(unsortedArr[0]);
			expect(sortedArr[1]).toBe(unsortedArr[1]);
		});
	});
});
