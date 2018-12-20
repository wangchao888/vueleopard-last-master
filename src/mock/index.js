import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
 
import { LoginUsers, users } from './data/user'
import { applicationDatas } from './data/application'

export default {
 
    init() {
        let mock = new MockAdapter(axios)
        mock.onPost('/user/login').reply(arg => {
            let { username, password } = JSON.parse(arg.data)
            return new Promise((resolve, reject) => {
                let token = null
 
 
                let hasUser = LoginUsers.some(u => {
                    if (u.username === username && u.password === password) {
                        token = 'adminXXXXXX'
                        return true
                    }
                })
 
                if (hasUser) {
                    resolve([200, { code: 200, msg: '请求成功', token: token }])
                } else {
                    resolve([200, { code: 500, msg: '账号或密码错误' }])
                }
 
            })
        })
       mock.onPost('/application/querylist').reply(arg => { 
           let { currentPage, pageSize } = JSON.parse(arg.data)
           let start = (currentPage-1)*pageSize+1
           let end = currentPage*pageSize+1
            let datas = {
                total:500,
                list:applicationDatas.list.slice(start,end)
            }
            return new Promise((resolve, reject) => {
                    resolve([200, { code: 200, msg: '请求成功',applicationData:datas}])
  
            })
        })
       mock.onPost('/application/add').reply(arg => {
            return new Promise((resolve, reject) => {
                    resolve([200, { code: 200, msg: '请求成功',data:null}])
  
            })
        })
    }
 
}
