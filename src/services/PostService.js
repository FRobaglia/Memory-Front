import axios from 'axios';

class PostService {
  static async createPost(id, data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${id}/post/new`,
        data
      );
      if (response && response.data) {
        console.log(response.data);
        console.log('nouveau post créé');
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default PostService;