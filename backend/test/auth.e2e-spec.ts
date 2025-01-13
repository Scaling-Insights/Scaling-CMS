import * as request from 'supertest';

describe('AuthController (e2e)', () => {
  const baseUrl = 'http://localhost:30081';

  it('/auth/login (POST)', async () => {
    const user = {
      email: 'Peter@pan.nl',
      password: 'peterpan123',
    };

    const response = await request(baseUrl)
      .post('/auth/login')
      .send(user)
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(typeof response.body.accessToken).toBe('string');
  });
});
