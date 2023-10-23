import React, {useState} from "react";
import {Button, DatePicker, Form, Input} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import _styles from './FormNews.module.scss'
import {setPropertyForm} from "../../../redux/form/formStore";
import {useAppDispatch} from "../../../hook/redux";
import {AuthUserEnumEnum} from "../../../enam/NewsFormEnum";

const modules = {
  toolbar: [
    [{'font': []}],
    [{size: []}],
    ['bold', 'italic', 'underline'],
    [{'color': []}, {'background': []}],
    [{'align': []}],
    [
      {list: 'ordered'},
      {list: 'bullet'},
    ],
    ['link'],

  ],
  clipboard: {
    matchVisual: false,
  },
}

const FormNews: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onChangeText = (value: string) => {
    dispatch(setPropertyForm({key: AuthUserEnumEnum.description, value}))
  }

  const onChangeDateStart = (value: any) => {
    console.log(value)
    if (value == null) {
      dispatch(setPropertyForm({key: AuthUserEnumEnum.date_start, value: ''}))
      return
    }
    dispatch(setPropertyForm({key: AuthUserEnumEnum.date_start, value: value.toISOString()}))
  }

  const onSaveUser = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className={`${_styles.form} formNews`}
      form={form}
      name="basic"
      layout="vertical"
      onFinish={onSaveUser}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        title: '',
        description: '',
        date_start: '',
      }}
    >
      <div className={_styles.requiredFields}>
        <Form.Item
          className={_styles.requiredFields__title}
          label="Заголовок"
          name="title"
          rules={[
            {required: true, message: 'Поле обязательное для заполнения!'},
            {
              validator: (_, title) => {
                if (title.length < 3) {
                  return Promise.reject(new Error('Заголовок не менее 3-х символов'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input onChange={(e) => {
              dispatch(setPropertyForm({key: AuthUserEnumEnum.title, value: e.target.value}))
            }}
          />
        </Form.Item>

        <Form.Item
          className={_styles.requiredFields__description}
          label="Описание"
          name="description"
          rules={[
            {required: true, message: 'Поле обязательное для заполнения!'},
            {
              validator: (_, description) => {
                const strippedValue = description.replace(/(<([^>]+)>)/gi, "");
                if (strippedValue.length < 3) {
                  return Promise.reject(new Error('Описание не менее 3-х символов'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={onChangeText}
            placeholder="Описание..."
          />
        </Form.Item>
      </div>
      <div className={_styles.optionalFields}>
        <Form.Item
          label="Дата публикации"
          name="date_start"
        >
          <DatePicker
            showTime format="YYYY-MM-DD HH:mm:ss"
            onChange={onChangeDateStart}
          />
        </Form.Item>
      </div>

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit">
          Опубликовать
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormNews