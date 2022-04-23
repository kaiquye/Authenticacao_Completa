export default = (status, message, sucess) => {
    AppError(status, message){
        return status(status).json(message);
    }
}