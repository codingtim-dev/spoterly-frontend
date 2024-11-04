export default interface CreatePostModel {
  id: number;
  authorId: string;
  spotId: number;
  image: File;
  title: string;
  content: string;
}
