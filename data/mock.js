import Mock from 'mockjs'
const random = Mock.Random
const getVerifyCode = (opt) => {
    const code = random.string('number', 5)
    const obj = JSON.parse(opt.body)
    const { phone } = obj
    return {
        code,
        phone
    }
}

Mock.mock('/getverifycode', /post|get/i, getVerifyCode)