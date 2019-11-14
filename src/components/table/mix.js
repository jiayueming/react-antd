import React from 'react'
import { Icon, Popconfirm, Divider } from 'antd';
import EditableContext from '@/components/table/EditableContext'
// import { editUserList } from '@/api/request.js'

let tableMixNativ = {
    state: {  // 将表格默认属性提取出来，
        showEditTable: false,  // 自定义属性， 是否显示可编辑表格功能。
        bordered: false,
        loading: false,
        pagination: {},
        size: 'default',
        expandedRowRender: undefined,
        title: undefined,
        showHeader: true,
        footer: undefined,
        rowSelection: undefined,
        scroll: undefined,
        hasData: true,
        columns: [],
        data: [],
        handleAdd: false,
        editingKey: undefined,  // 当前正在编辑的表格行的key,
        modelCancel: undefined,
        modelVisible: false  //  新增数据弹出框是否显示
    },
    methods: {
        pagination () {  // 获取分页数据。 里面返回分页的一些数据
            return (
                { position: 'bottom',
                    onShowSizeChange: (current, pageSize) => {
                    },
                    onChange: (page, pageSize) => {
                    },
                    total: 0,
                    showSizeChanger: true,
                    pageSize: 10,
                    hideOnSinglePage: false,
                    defaultCurrent: 1,
                    current: 1
                }
            )},
        columns () { // 获取表格头数据，
            let self = this;
            return ([{
                title: '用户名称',
                dataIndex: 'username',
                key: 'username',
                width: 150,
                editable: true,
                render: text => <a href="/">{text}</a>,
            }, {
                title: '手机号码',
                dataIndex: 'phone',
                key: 'phone',
                width: 150,
                editable: true,
            }, {
                title: '用户邮箱',
                dataIndex: 'email',
                key: 'email',
                editable: true,
            }, {
                title: '操作',
                key: 'action',
                dataIndex: 'action',
                width: 360,
                editable: false,
                render: function (text, record, index){
                    let _self = self
                    if (_self.isEditing(record)) {  // 根据是否正在编辑中的行，  显示对应的组件
                        return (
                            <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="/"
                            onClick={() => _self.save(form, record.key)}
                            style={{ marginRight: 8 }}
                        >
                            保存
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="是否取消?"
                      onConfirm={() => _self.cancel(record.key)}
                  >
                    <a href="/">取消</a>
                  </Popconfirm>
                </span>
                        )
                    }
                    return (
                        <span>
        <a href="/" ><Icon type="show" />查看详情</a>
        <Divider type="vertical" />
        <a href="/" onClick={_self.handleEdit(record)}><Icon type="edit" />编辑</a>
        <Divider type="vertical" />
        <a href="/">
        <Popconfirm title="确认删除?" cancelText="取消" okText="确认" onConfirm={() => _self.onDelete(record, index)}>
        <Icon type="delete" /> 删除
        </Popconfirm>
        </a>
        </span>
                    )},
            }])
        },
        handleEdit (record) {return () => {  // 设置编辑中的行，存储取来。
            this.setState({ editingKey: record.key });
        }},
        save(form, key) {  // 编辑完后，保存数据
            form.validateFields(async (error, row) => {
                if (error) {
                    return;
                }
                this.setState({ editingKey: '' });
            });
        },
        cancel () {  // 取消编辑
            this.setState({ editingKey: '' });
        },
        onDelete (record, index) {  // 删除数据
            console.log(this)
            const data = [...this.state.data];
            data.splice(index, 1);
            this.setState({ deleteIndex: record.key});
            setTimeout(() => {
                this.setState({ data })
            }, 500);
        },
        isEditing (record) { // 是否正在编辑中
            return record.key === this.state.editingKey;
        },
        handleAdd () { // 添加数据
            let {data} = this.state
            let num = Math.floor(Math.random()*10000 - 1000)
            data.push({
                key: num,
                username: `add ${num}`,
                phone: 18817844785,
                email: "1031516418@qq.com"
            })
            this.setState((preState) => ({
                data: data
            }))
        },
        setThis (a, b) { // 设置当前对象的this
            var obj = a.methods
            for (var key in obj) {
                var value = obj[key]
                if (typeof value === 'function') {
                    if (!b[key]) {  // 当React组件没有这个方法， 则继承
                        b[key] = value.bind(b)
                    }
                }
            }
            tableMixNativ.state.pagination = b.pagination(b)  // 提取数据注入到当前对象的state内。
            tableMixNativ.state.columns = b.columns(b)    // 提取数据注入到当前对象的state内。
            tableMixNativ.state.handleAdd = b.handleAdd     // 修改state， 继承自react组件
            tableMixNativ.state.modelCancel = b.modelCancel
            Object.setPrototypeOf(a, b)
        },
        modelCancel () {
            this.setState({
                modelVisible: false,
                modelLoading: false
            })
        }
    }
}


export const tableMix =  {...tableMixNativ}
