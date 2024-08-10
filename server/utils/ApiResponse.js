
class ApiResponse {
    constructor(status, message, data = null, errors = null) {
        this.status = status;
        this.message = message;

        if (data) {
            this.data = data;
        }

        if (errors) {
            this.errors = errors;
        }
    }
}

module.exports = ApiResponse;
