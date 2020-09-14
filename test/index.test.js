const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const todos = require('./testData');

beforeAll(async () => {
    const url = 'mongodb://localhost:27017/testdb';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
});

beforeEach(async (done) => {
    for (const todo of todos) {
        await request.post('/todo').send(todo);
    }
    done();
});

describe('Check api', () => {
    it('should check if default route is working', async (done) => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Welcome");
        done();
    });
});

describe('Checking CreateTODO function', () => {
    it('Should Create a TODO in the db', async (done) => {
        const response = await request.post('/todo').send({
            title: 'Hello',
            description: 'World'
        });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Hello");
        expect(response.body.description).toBe("World");
        done();
    });
    it('Should fail to create a TODO', async(done) => {
        const response = await request.post('/todo').send({
            description: 'World'
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Title cannot be empty");
        done();
    });
});

describe('Checking update TODO function', () => {
    it('Update an existing TODO', async(done) => {
        // insert a record to get its id and then update
        const resp = await request.post('/todo').send({
            title: 'Hello',
            description: 'World'
        });
        const id = resp.body.id;
        const response = await request.put(`/todo/${id}`).send({
            title: 'Hello',
            description: 'Worlds'
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("TODO updated successfully.");
        done();
    });
    it('Fails to update TODO whose id is not found', async(done) => {
        const id = '5f5dd81cf09f332020d80a10';
        const response = await request.put(`/todo/${id}`).send({
            title: 'Hello',
            description: 'Worlds'
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Can't update as No TODO find with id " + id);
        done();
    });
    it('Fails to update TODO whose id can not be casted', async(done) => {
        const id = '123456';
        const response = await request.put(`/todo/${id}`).send({
            title: 'Hello',
            description: 'Worlds'
        });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe(`Cast to ObjectId failed for value "${id}" at path "_id" for model "todo"`);
        done();
    });
});

describe('Testing delete TODO Functions', () => {
    it('Delete a todo by id', async (done) => {
        // insert a record to get its id and then delete
        const resp = await request.post('/todo').send({ title: 'Hello', description: 'World' });
        const id = resp.body.id;
        const response = await request.delete(`/todo/${id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("TODO was deleted successfully.");
        done();
    });
    it('Fails to delete TODO whose id is not found', async(done) => {
        const id = '5f5dd81cf09f332020d80a10';
        const response = await request.delete(`/todo/${id}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Can't delete as No TODO find with id " + id);
        done();
    });
    it('Fails to delete TODO whose id can not be casted', async(done) => {
        const id = '123456';
        const response = await request.delete(`/todo/${id}`);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe(`Cast to ObjectId failed for value "${id}" at path "_id" for model "todo"`);
        done();
    });
    it('Deletes all todos', async(done) => {
        const response = await request.delete('/todo/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`All TODOs were deleted successfully`);
        done();
    });
});

describe('Checing findTODO function', () => {
    it('return all TODOS', async (done) => {
        const response = await request.get('/todo/');
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(6);
        done();
    });
    it('return todo by title', async (done) => {
        const response = await request.get('/todo?title=Simple');
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(3);
        done();
    });
    it('checking no title match', async (done) => {
        const response = await request.get('/todo?title=ashesasse');
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(0);
        done();
    });
    it('finding a TODO by id', async(done) => {
        // insert a record to get its id and then find
        const resp = await request.post('/todo').send({ title: 'Hello', description: 'World' });
        const id = resp.body.id;
        const response = await request.get(`/todo/${id}`);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Hello");
        expect(response.body.description).toBe("World");
        done();
    });
    it('Fails to find a TODO whose id is not found', async(done) => {
        const id = '5f5dd81cf09f332020d80a10';
        const response = await request.get(`/todo/${id}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("No TODO find with id " + id);
        done();
    });
    it('Fails to find a TODO because id can not be casted', async(done) => {
        const id = '123456';
        const response = await request.get(`/todo/${id}`);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe(`Cast to ObjectId failed for value "${id}" at path "_id" for model "todo"`);
        done();
    });
});

const dropAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        try {
            await collection.drop();
        } catch (error) {
            // Safe to ignore.
            if (error.message === "ns not found") return;
            // Safe to ignore.
            if (error.message.includes("a background operation is currently running"))
                return;
            console.log(error.message);
        }
    }
}

afterEach(async () => {
    await dropAllCollections();
});

afterAll(async () => {
    await mongoose.connection.close();
});
