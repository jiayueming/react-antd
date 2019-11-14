import React from 'react'
import { Table } from 'antd';
// import EditableContext from '@/components/table/EditableContext'
import EditableFormRow from '@/components/table/EditableFormRow'
import EditableCell from '@/components/table/EditableCell'

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props };  // 接收到父组件传递过来的数据， 并给state继承
    }

    isEditing = (record, editingKey) => {   // table可编辑组件中自带方法
        return record.key === editingKey;
    };

    edit(key) { // table可编辑组件中自带方法
        this.setState({ editingKey: key });
    }

    save(form, key) {  // table可编辑组件中自带方法
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    cancel = () => { // table可编辑组件中自带方法
        this.setState({ editingKey: '' });
    };

    render() {
        const components = {  // table可编辑组件中自带
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        let state = {...this.state, ...this.props}  // 合并数据
        let { data,  columns, rowClassName, editingKey} = state
        columns = columns.map((col) => {  // 根据表格头内的数据， 判断当前列是否可编辑。
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record =>{
                    return ({
                    record,
                    inputType: col.dataIndex === 'phone' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record, editingKey),
                })},
            };
        });
        // 将父组件注入的数据全部注入到table 这样就可以通过父组件来控制当前组件的子组件功能的开关了。
        return (
            <Table
                {...state}
                components={components}
                dataSource={data}
                rowClassName={rowClassName}
                columns={columns}
            />
        );
    }
}

export default EditableTable