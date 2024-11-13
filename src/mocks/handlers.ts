import { http, HttpResponse } from 'msw';
import { resources } from '../data/resources';

export const handlers = [
  http.get('/api/resources', () => {
    return HttpResponse.json(resources);
  }),

  http.post('/api/resources', async ({ request }) => {
    const resource = await request.json();
    return HttpResponse.json({ ...resource, id: crypto.randomUUID() }, { status: 201 });
  }),
];