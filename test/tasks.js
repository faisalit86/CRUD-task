const {app}=require("../server")
const chai=require("chai")
const chaiHttp=require("chai-http")

//Assertion
chai.should()
chai.use(chaiHttp)

const expect = chai.expect;

describe('Task APIs', () => {
    let authToken; // You need to set this variable after successful authentication

    before((done) => {
        chai.request(app)
            .post('/api/user/login') 
            .send({ email: 'fasial12@ccript.com', password: 'rana123' })
            .end((err, res) => {
                authToken = res.body.response_data.token; // Set the authToken for subsequent requests
                done();
            });
    });

    // Test for adding a task
    describe('POST /api/task/add', () => {
        it('should add a new task', (done) => {
            const newTask = {
                title: 'Add New Task',
                description: 'Add Task Description',
                due_date: '2023-12-31',
                status: 'Pending',
            };

            chai.request(app)
                .post('/api/task/add')
                .set('x-access-token', authToken) // Use x-access-token header
                .send(newTask)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Task added successfully');
                    // expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    // Test for updating a task
    describe('POST /api/task/update/:task_id', () => {
        it('should update an existing task', (done) => {
            const updatedTask = {
                title: 'Updated Task',
                description: 'Updated Description',
                due_date: '2024-01-01',
                status: 'Completed',
            };

            const taskId = '659375f03f16cbaeef5a8e8b';

            chai.request(app)
                .post(`/api/task/update/${taskId}`)
                .set('x-access-token', authToken) // Use x-access-token header
                .send(updatedTask)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Task updated successfully');
                    // expect(res.body.success).to.be.true;
                    done();
                });
        });
    });


    describe('GET /api/task/get-single-task/:task_id', () => {
        it('should get an existing task', (done) => {
        
            // Assuming you have a task_id from a previously added task
            const taskId = '659375f03f16cbaeef5a8e8b';

            chai.request(app)
                .get(`/api/task/get-single-task/${taskId}`)
                .set('x-access-token', authToken) // Use x-access-token header
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Task fetched successfully');
                    // expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('GET /api/task/', () => {
        it('should get all task', (done) => {
            chai.request(app)
                .get(`/api/task/`)
                .set('x-access-token', authToken) // Use x-access-token header
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('Tasks fetched successfully');
                    // expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
})