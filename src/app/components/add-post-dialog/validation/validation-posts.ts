export const validationPosts = {
  spot: [
    {type: 'required', message: 'Spot must be selected'},
  ],
  title: [
    {type: 'required', message: 'Title is required'},
    {type: 'minlength', message: 'Title must be at least 3 characters long'},
    {type: 'maxlength', message: 'Title must be less than 35 characters long'}
  ],
  description: [
    {type: 'required', message: 'Description is required'},
    {type: 'minlength', message: 'Description must be at least 5 characters long'},
    {type: 'maxlength', message: 'Title must be less than 255 characters long'}
  ],
  file: [
    {type: 'required', message: 'File is required'},
  ]
};
