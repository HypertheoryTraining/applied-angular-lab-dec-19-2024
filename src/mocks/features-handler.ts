import { http, HttpResponse } from 'msw';
const enabledDevelopmentFeatures = ['lrc', 'counter-redo'];
export const features = [
  http.get('api/features', () => {
    return HttpResponse.json(enabledDevelopmentFeatures);
  }),
];
