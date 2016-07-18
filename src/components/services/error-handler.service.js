// 集中处理错误信息
class ErrorHandlerService {
    constructor($q, ErrorMessage, Notification) {
        'ngInject';
        Object.assign(this, {$q, ErrorMessage, Notification});
    }
    catcher(reason) {
        // reason
        let code = 'SERVER_ERR';
        if (reason) {
            const type = typeof reason;
            switch (type) {
                case 'object':
                    code = reason.code;
                    break;
                case 'string':
                    code = reason;
                    break;
                default:
            }
        }
        code = code.toUpperCase();
        console.log({
            code,
            msg: this.ErrorMessage.getErrorMessage(code)
        });
        this.Notification.error(this.ErrorMessage.getErrorMessage(code));
        return this.$q.reject({
            code,
            msg: this.ErrorMessage.getErrorMessage(code)
        });
    }
}

export default ErrorHandlerService;
