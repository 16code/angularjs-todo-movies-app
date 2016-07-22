// 集中处理错误信息
class ErrorHandlerService {
    constructor($q, ErrorMessage, Notification) {
        'ngInject';
        Object.assign(this, {$q, ErrorMessage, Notification});
    }
    catcher(reason) {
        // reason
        const data = {
            code: 'SERVER_ERR'
        };
        if (reason) {
            const type = typeof reason;
            switch (type) {
                case 'object':
                    data.code = reason.code;
                    break;
                case 'string':
                    data.code = reason;
                    break;
                default:
            }
        }
        data.code = data.code.toUpperCase();
        console.log({
            data,
            msg: this.ErrorMessage.getErrorMessage(data)
        });
        if (reason.data && reason.data.status_message) {
            data.serviceMsg = reason.data.status_message;
        }
        this.Notification.error(this.ErrorMessage.getErrorMessage(data));
        return this.$q.reject({
            data,
            reason: reason.data,
            msg: this.ErrorMessage.getErrorMessage(data)
        });
    }
}

export default ErrorHandlerService;
