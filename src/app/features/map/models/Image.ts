export default interface Image {
  id: string;
  imageData: Uint8Array | null;
  fileType: string;
}
