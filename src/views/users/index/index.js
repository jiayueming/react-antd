import React from 'react'
import TableComponent from '@/components/table/table.js'
import { getUserList, editUserList, deleteUserList, addUsersList } from '@/api/request.js'  // 请求数据的方法
import { tableMix } from "@/components/table/mix";
import AddModel from '@/views/users/add'

class Users extends React.Component {
    constructor (props) {
        super(props)
        tableMix.methods.setThis(tableMix, this) // 修改 tableMix 的数据。
        this.state = {
            ...tableMix.state
        }
    }
    componentDidMount () {
        // 重写分页方法。
        let { pagination } = this.state
        pagination.onShowSizeChange = (current, pageSize) => {
            console.log(current, pageSize);
            pagination.current = current
            pagination.pageSize = pageSize
            this.handleUserList({
                page: pagination.current,
                pageSize: pagination.pageSize
            })
            this.setState({
                pagination: pagination
            })
        }
        pagination.onChange = (page, pageSize) => {
            pagination.current = page
            pagination.pageSize = pageSize
            this.onGetUserList()
            this.setState({
                pagination: pagination
            })
        }
        // 修改state.handleAdd属性方法。
        // this.state.handleAdd = this.handleAdd
        this.setState({
            handleAdd: this.handleAdd,
            pagination: pagination
        })
        this.onGetUserList()
    }
    handleAdd = async () => {
        this.setState({
            modelVisible: true
        })
    }
    handlCancle = async () => {
        this.setState({
            modelVisible: false
        })
    }
    // 调用新增数据接口。 修改model状态
    addUserList = async (data) => {
        let res = await addUsersList(data)
        this.setState({
            modelLoading: false,
            modelVisible: false
        })
        if (res.code === 200) {
            this.onGetUserList()
        }
    }
    // 封装提取数据接口的方法。
    handleUserList = async (obj = {page: 1}) => {
        this.setState((prevState ) => ({
            loading: true
        }))
        let data = await getUserList({
            ...obj
        })
        let { pagination } = this.state
        pagination.pageSize = obj.pageSize ? obj.pageSize : pagination.pageSize
        pagination.total = data.data.total || 0
        this.setState((prevState ) => ({
            data: data.data ? data.data.data : [],
            loading: false,
            pagination: pagination
        }))
    }

    onGetUserList () {
        this.handleUserList({
            page: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize
        })
    }
    // 重写修改保存方法
    save(form, key) {
        form.validateFields(async (error, row) => {
            if (error) {
                return;
            }
            let data = await editUserList(row)
            if (data.code === 200) {
                this.onGetUserList()
            }
            this.setState({ editingKey: '' });
        });
    }
    // 重写删除方法
    async onDelete (record, index) {
        let data = await deleteUserList(record)
        if (data.code === 200) {
            this.setState({ deleteIndex: record.key});
            this.onGetUserList()
        }
    }
    render () {
        let state = this.state
        let { modelVisible, modelLoading } = state
        return (
            <div>
                {/* 显示新增数据组件 */}
                <AddModel {...state}
                modelVisible={modelVisible}
                cancle={this.handlCancle}
                modelLoading={modelLoading} 
                addUserList={this.addUserList}></AddModel>
                <TableComponent {...state}></TableComponent>
            </div>
        )
    }
}
export default Users