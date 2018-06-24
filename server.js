const log = console.log.bind(console)

const express = require('express')
const expressGraphQL = require('express-graphql')


const app = express()


const congfigApp = () => {
    const schema = require('./schema/schema')
    app.use('/graphql', new expressGraphQL({
        graphiql: true,
        schema: schema,
    }))

}

const run = (port, host) => {
    const server = app.listen(port, host, () => {
        const address = server.address()
        log(`listening ${address.address}:${address.port}`)
    })
}

const __main = () => {
    congfigApp()
    const port = 4000
    const host = 'localhost'
    run(port, host)
}

if (require.main === module) {
    __main()
}
