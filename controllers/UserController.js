const UserInteractor = require('../usecases/UserInteractor');

module.exports = () => {
    const userInteractor = UserInteractor();

    const GetUser = (req, res, next) => {

        const data = req.body
        userInteractor.GetUser(data).then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const Login = (req, res, next) => {

        const data = req.body
        userInteractor.Login(data).then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const GetUsers = (req, res, next) => {

        userInteractor.GetUsers().then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const CreateUser = (req, res, next) => {

        const data = req.body;
        userInteractor.CreateUser(data).then((response) => {

            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})
        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const UpdateUser = (req, res, next) => {

        const data = req.body;

        userInteractor.UpdateUser(data).then((response) => {

            let status_r = response.status
            let message_r = response.message
            let values = response.data

            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    const DeleteUser = (req, res, next) => {

        const data = req.body

        userInteractor.DeleteUser(data).then((response) => {
            
            let status_r = response.status
            let message_r = response.message
            let values = response.data
            
            return res.status(status_r).json({status:status_r,message:message_r,data:values})

        }, (err) => {
            return res.status(500).json({error:err});
        })
    }

    return {
        GetUser,
        Login,
        GetUsers,
        CreateUser,
        UpdateUser,
        DeleteUser
    }
};