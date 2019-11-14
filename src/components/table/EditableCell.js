import React from 'react'
import { Input, InputNumber, Form } from 'antd';
import EditableContext from '@/components/table/EditableContext'

const FormItem = Form.Item;

class EditableCell extends React.Component {
    getInput = () => {  // 自带方法   判断数据类型， 返回输入组件
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        let {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {  // 注意，  dataIndex 必须存在， 刻在cloums表格头数据内设置。
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

export default EditableCell