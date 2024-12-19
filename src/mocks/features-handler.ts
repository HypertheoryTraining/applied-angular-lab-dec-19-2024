import { http, HttpResponse } from 'msw';
const enabledDevelopmentFeatures = ['lrc', 'booksPilot'];
export const features = [
  http.get('api/features', () => {
    return HttpResponse.json(enabledDevelopmentFeatures);
  }),
];
