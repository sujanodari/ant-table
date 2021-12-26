import { Form } from 'antd';
interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
        <tr {...props} />
    </Form>
  );
};

export default EditableRow;
