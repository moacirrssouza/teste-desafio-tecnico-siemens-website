export interface Genre {
  id: string | number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const genreValidation = {
  name: {
    min: 2,
    max: 100,
    required: true,
  },
  description: {
    min: 5,
    max: 500,
    required: true,
  },
};
