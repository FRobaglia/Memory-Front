import axios from 'axios';

class CommentService {
  static async createComment(id, data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/post/${id}/comment/new`,
        data
      );
      if (response && response.data) {
        console.log(response.data);
        console.log('Commentaire ajouté');
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteComment(id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}api/comment/${id}/delete`
      );
      if (response) {
        console.log(response.data);
        console.log('Commentaire supprimé');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default CommentService;
