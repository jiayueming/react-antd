import React from 'react'
import { Modal, Button, Form, Input } from 'antd';
import { validatorPhone } from '@/utils/index'

const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;


class MyForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            loading: this.props.loading
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addUserList(values)  // 通过验证后， 调用父组件传递的调用数据接口。
                this.setState({  // 修改组件状态
                    loading: true
                })
            }
        });
    }
    // 当props更新， 修改props属性。
    componentWillReceiveProps (nextProps) {
        this.setState({
            loading: nextProps.loading
        })
        if (!nextProps.visible) {  // 当组件隐藏， 重置表单
            this.props.form.resetFields()
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        let {loading} = this.state
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户名称"
                >
                    {getFieldDecorator('username', {
                        rules: [{
                             message: '请输入用户名称',
                        }, {
                            required: true, message: '请输入用户名称',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '请输入用户邮箱',
                        }, {
                            required: true, message: '请输入用户邮箱',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{
                            validator: validatorPhone.bind(this)()
                        }, {
                            required: true, message: '请输入手机号码',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
                </FormItem>
            </Form>
        )
    }
}
const ModelForm = Form.create()(MyForm)  // form表单与model分开。


class AddModel extends React.Component {
    state = {
        loading: this.props.modelVisible,
        visible: this.props.modelVisible,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {  // 当提交的时候， 显示loading
        this.setState({ loading: true });
        // setTimeout(() => {
        //     this.setState({ loading: false, visible: false });
        // }, 3000);
    }

    handleCancel = () => {
        this.props.cancle()
        this.setState({ visible: false })
        typeof this.props.modelCancel === 'function' && this.props.modelCancel()
    }
    // props 更新时调用, 这样实时监听父组件传递过来的属性， 然后传递给子组件。
    componentWillReceiveProps (nextProps, nextState) {
        this.setState({
            loading: nextProps.modelLoading,
            visible: nextProps.modelVisible
        })
    }
    render() {
        const { visible, loading } = this.state;
        let { addUserList } = this.props
        console.log(loading)
        return (
            <div>
                <Modal
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}  // 设置为null 不显示footer
                >
                    <ModelForm loading={loading} visible={visible} addUserList={addUserList} ></ModelForm>
                </Modal>
            </div>
        );
    }
}
export default AddModel
