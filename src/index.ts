import express, {NextFunction, Request, Response} from 'express'
import bodyParser from "body-parser"
import {productsRouter} from "./routers/products-router";
import {addressesRouter} from "./routers/addresses-router";

const app = express()

const port = process.env.PORT || 3001

const authGardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === "123") {
        next()
    }else {
        res.send(401)
    }
}


const parserMiddleware = bodyParser()
app.use(parserMiddleware)
app.use(authGardMiddleware)


app.use("/products", productsRouter)
app.use("/addresses", addressesRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})