// 定义所有错误消息
const ERROR_MESSAGE = {
    // 网络请求问题
    SERVER_ERROR: '服务器出错, 请稍后尝试!',
    TIMEOUT: '数据请求超时!',
    NOT_FOUND: '请求的资源文件不存在!',
    UNCOMMITTED: '未被授权，没有操作权限!',
    REQUIRED_LOGIN: '需要登录!',
    UNKNOWN_ERROR: '未列出的错误原因!',
    ERR_REQUEST_ID: '请求的ID不正确'
};

class ErrorService {
    getErrorMessage(errorCode) {
        return ERROR_MESSAGE[errorCode] || ERROR_MESSAGE.SERVER_ERROR;
    }
}

export default ErrorService;
