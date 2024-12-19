import { http, HttpResponse } from 'msw';
const enabledDevelopmentFeatures = ['counter-redo', 'lrc', '  '];
export const features = [
  http.get('api/features', () => {
    return HttpResponse.json(enabledDevelopmentFeatures);
  }),
];
