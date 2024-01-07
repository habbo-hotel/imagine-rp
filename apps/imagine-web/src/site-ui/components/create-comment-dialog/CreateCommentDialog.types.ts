export interface CreateCommentDialogProps {
  onPostComment(message: string): Promise<void>;
}