import { message } from 'antd';

const showSuccess = text => message.success(text);
const showError = text => message.error(text);
// successModal

export default {
    showError,
    showSuccess,
}
