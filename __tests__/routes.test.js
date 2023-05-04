process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
let items = require('../fakeDb');

let popsicle = { name: "popsicle", price: 1.45};
let cheerios = { name: "cheerios", price: 3.40};

beforeEach(function(){
    items.push(popsicle);
    items.push(cheerios);
});

afterEach(function(){
    items.length = 0;
});

describe( "Get routes /items", function(){
    test("Get popsicle and cheerios with its respective price", async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{ name: "popsicle", price: 1.45}, { name: "cheerios", price: 3.40}]);
    });
});

describe("Create a new item using POST /items and JSON data", function(){
    test("Post Tostitos as JSON data", async function(){
        const resp = await request(app).post('/items').send({ name: 'tostitos', price: 0.99});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({added: { name: 'tostitos', price: 0.99}});
    });
    
    test("Check price is converted from string to number", async function(){
        const resp = await request(app).post('/items').send({ name: 'tostitos', price: "0.99"});
        expect(resp.statusCode).toBe(200);
        expect(typeof resp.body.added.price).toBe('number');
    });
});

describe("Test Patch methods on /item", function(){
    test("Modify an existing item, popsicle-1.45 to gelatto-3.99", async function(){
        const resp = await request(app).patch('/items/popsicle').send( { name: 'gelatto', price: "3.99"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ updated : { name: 'gelatto', price: 3.99} });
    });
    
    test("Attempting to modify a non existing item", async function(){
        const resp = await request(app).patch('/items/tostitos').send( { name: 'gelatto', price: "3.99"});
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual({ error : 'Item not found'});
    });
});

describe('Find items on /items', function(){
    test('Find an existing item', async function(){
        console.log('items', items);
        const resp = await request(app).get('/items/cheerios');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ name: "cheerios", price: 3.40});
    });
    test('Return an error if the item doesn`t exist', async function(){
        const resp = await request(app).get('/items/doritos');
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual({ error : 'Item not found'});
    });
});

describe("Test Delete method on /item/popsicle", function(){
    
    test('Return an error if the item doesn`t exist', async function(){
        const resp = await request(app).delete('/items/doritos');
        expect(resp.statusCode).toBe(404);
        expect(resp.body).toEqual({ error : 'Item not found'});
    });
    test("Delete an existing item", async function (){
        const resp = await request(app).delete('/items/cheerios');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: 'Deleted' } );
    });
});