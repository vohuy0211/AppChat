import userRouter from "./user.router.js";

function Routes(app) {
    app.use('/api/v1/user',userRouter);
}

export default Routes