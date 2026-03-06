export interface Author {
  id: string | number;
  name: string;
  birthDate: Date;
  biography: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export const authorValidation = {
  name: {
    min: 3,
    max: 100,
    required: true,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true,
  },
  birthDate: {
    required: true,
  },
  biography: {
    min: 10,
    max: 1000,
    required: true,
  },
};

export function isValidEmail(email: string): boolean {
  return authorValidation.email.pattern.test(email);
}
