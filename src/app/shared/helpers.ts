import { Breed, BreedsList } from '../core/models/breed.types';

export const transformToNewForma = (data: BreedsList): Breed[] => {
  const result: Breed[] = [];

  for (const breed in data) {
    if (data.hasOwnProperty(breed)) {
      const subtypes = data[breed];

      result.push({
        name: breed,
        isBreed: true,
        breed: '',
      });

      if (subtypes.length > 0) {
        for (const subtype of subtypes) {
          result.push({
            name: subtype,
            isBreed: false,
            breed: breed,
          });
        }
      }
    }
  }

  return result;
};
