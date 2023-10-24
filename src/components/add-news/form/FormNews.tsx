import React, {useRef} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import _styles from './FormNews.module.scss'
import {Button, DatePicker, Form, Input, message, Space} from 'antd';
import {actionCreateNews, setIsShowModal, setPropertyForm} from "../../../redux/form/formStore";
import {useAppDispatch} from "../../../hook/redux";
import {AuthUserEnumEnum} from "../../../enam/NewsFormEnum";
import {ResponseNewsType} from "../../../tupes/news/News.type";
import MessageList from "../../message/MessageList";
import type { FormInstance } from 'antd/es/form';
import {addNews} from "../../../redux/user/userStore";

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
  const formRef = useRef<FormInstance>(null);
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

  const onSaveNews = async () => {
    const {news, message: messageRes, success} = await dispatch(actionCreateNews() as unknown as ResponseNewsType)
    if (success) {
      dispatch(addNews(news))
      message.success(<MessageList messages={messageRes}/>);
      dispatch(setIsShowModal({key: 'news'}))
      onReset()
      return
    }
    message.error(<MessageList messages={messageRes}/>);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onCancelSave = () => {
    onReset()
    dispatch(setIsShowModal({key: 'news'}))
  }
  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Form
      className={`${_styles.form} formNews`}
      form={form}
      ref={formRef}
      name="basic"
      layout="vertical"
      onFinish={onSaveNews}
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

      <div style={{textAlign: 'right'}}>
        <Form.Item shouldUpdate>
          {() => (
            <Space>
              <Button type="primary"
                      htmlType="submit"
              >
                Опубликовать
              </Button>
              <Button htmlType="button" onClick={() => onCancelSave()}>
                Отмена
              </Button>
            </Space>
          )}
        </Form.Item>
      </div>
    </Form>
  )
}

export default FormNews