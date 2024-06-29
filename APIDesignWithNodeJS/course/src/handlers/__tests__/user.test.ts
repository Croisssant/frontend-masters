import * as user from '../user'

describe('user handler', () => {
    it('should do something when something happens', () => {
        expect(1).toBe(1);
    })
})

describe('user creator', () => {
    it('should create a new user', async () => {
        const req = {body: {username: "hello", password: "hi"}}
        const res = {json({token}) {
            expect(token).toBeTruthy()
        }}
        await user.createNewUser(req, res, () => {})
    })
})