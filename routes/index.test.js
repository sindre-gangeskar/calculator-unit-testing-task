const express = require('express');
const indexRouter = require('./index');
const request = require('supertest');
const app = express();
const path = require('path');
const { save, load } = require('../data/custom');

jest.mock('../data/numbers.json', () => ({
    "favoriteNumber": 0
}));

jest.mock('../data/custom.js', () => ({
    save: jest.fn(),
    load: jest.fn().mockReturnValue({ favoriteNumber: 0 })
}));

app.use(express.json());
app.use('/', indexRouter);

beforeEach(() => {
    jest.clearAllMocks();
})

describe('testing-index-router', () => {
    test('GET /1/2 equals 3', async () => {
        const { body } = await request(app).get('/sum/1/2');
        expect(body).toEqual({
            "sum": 3
        })
    })
    test('DELETE /favNumber - success', async () => {
        const { body } = await request(app).delete('/favNumber');
        expect(load).toHaveBeenCalledWith(path.resolve(__dirname, '../data/numbers.json'));
        expect(save).toHaveBeenCalledWith({ favoriteNumber: 0 }, path.resolve(__dirname, '../data/numbers.json'));
        expect(body).toEqual({
             message: 'Successfully reset favorite number', value: 0
        })
    })
    test('POST /favNumber - success', async () => {
        const object = { favoriteNumber: 2 };
        const { body } = await request(app).post('/favNumber').send(object);

        expect(save).toHaveBeenCalledWith({ favoriteNumber: 2 }, path.resolve(__dirname, '../data/numbers.json'));
        expect(body).toEqual({
            message: 'Successfully saved favorite number', favoriteNumber: object.favoriteNumber
        })
    })
    test('GET /1/2 + favoriteNumber of 2 equals 5', async () => {
        const { body } = await request(app).get('/sum/1/2');
        expect(body).toEqual({
            "sum": 5
        })
    })
})