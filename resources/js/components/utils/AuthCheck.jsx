
import axios from 'axios';
const AuthCheck = async () => {
    try {
        const response = await axios.get('/api/authCheck');
        if (response.status === 200) {
            return response.data.user;
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export default AuthCheck
