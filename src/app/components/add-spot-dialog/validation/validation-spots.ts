export const validationSpots = {
  name: [
    { type: 'required', message: 'Spot name is required' },
    { type: 'minlength', message: 'Spot name must be at least 5 characters long' },
    { type: 'maxlength', message: 'Spot name cannot be more than 25 characters long' },
  ],
  coordinate: [
    { type: 'required', message: 'Coordinate is required' },
    { type: 'pattern', message: 'Your Coordinate must be a number' }
  ],
  description: [
    { type: 'required', message: 'Description is required' },
    { type: 'minlength', message: 'Description must be at least 5 characters long' }
  ]
};

