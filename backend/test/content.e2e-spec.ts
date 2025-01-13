import * as request from 'supertest';

describe('ContentController (e2e)', () => {
  const baseUrl = 'http://localhost:30081';
  let accessToken: string;

  beforeAll(async () => {
    // Mock user data
    const user = {
      email: 'Peter@pan.nl',
      password: 'peterpan123',
    };

    // Use the login route to obtain an access token
    const response = await request(baseUrl)
      .post('/auth/login')
      .send(user)
      .expect(200);

    accessToken = response.body.accessToken;
  });

  it('/content/all (GET)', () => {
    return request(baseUrl)
      .get('/content/all')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('contents');
        expect(Array.isArray(res.body.contents)).toBe(true);
      });
  });

  it('/content/requestStreamUploadUrl (GET)', async () => {
    const res = await request(baseUrl)
      .get('/content/requestStreamUploadUrl')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200); // Ensure you expect the right status
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('streamUploadUrl');
    expect(res.body.data).toHaveProperty('shortVideoUid');
  });

  it('/content/requestR2UploadUrl (POST)', async () => {
    const requestBody = {
      contentSize: 1024,
      fileType: 'image/png',
    };

    const res = await request(baseUrl)
      .post('/content/requestR2UploadUrl')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(requestBody);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('r2UploadUrl');
    expect(res.body.data).toHaveProperty('r2UploadUid');
  });
});
