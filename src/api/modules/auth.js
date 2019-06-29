import $http from '../http';
import Mock from 'mockjs'

export default {
    login: function(params) {
        return $http({
            method: 'get',
            url: 'orderservice/buyer/schedules',
            params: params
        })
    }
}

Mock.mock('/api/data', (req, res) => {
    return {
        data: ['a','b']
    }
})