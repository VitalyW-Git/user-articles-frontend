import React, {useEffect, useRef} from "react";
import _style from "./Registration.module.scss"
import {Button, Form, Input, Space, message} from 'antd';
import {useAppDispatch} from "../../hook/redux";
import {
  actionAuthorizationUser,
  actionSaveUser,
  setIsShowModal,
  setPropertyForm
} from "../../redux/form/formStore";
import {AuthUserEnum} from "../../enam/AuthUserEnum";
import type { FormInstance } from 'antd/es/form';
import {authUser} from "../../redux/user/userStore";
import {ResponseAuthType} from "../../tupes/user/User.type";
import MessageList from "../message/MessageList";

type Props = {
  formProperty: {
    username?: string,
    email: string,
    password: string
  },
  isStateForm: boolean,
  onChange: () => void,
}

const FormModal: React.FC<Props> = (props) => {
  const formRef = useRef<FormInstance>(null);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const onSaveUser = async () => {
    // TODO вынести методы
    if (props.isStateForm) {
      const {success, user, message: messageRes} = await dispatch(actionAuthorizationUser() as unknown as ResponseAuthType)
      if (success) {
        dispatch(authUser({user, success: true}))
        message.success(<MessageList messages={messageRes}/>);
        onReset()
        dispatch(setIsShowModal({key: 'auth'}))
        return
      }
      message.error(<MessageList messages={messageRes}/>);
      return
    }
    const {success, user, message: messageRes} = await dispatch(actionSaveUser() as unknown as ResponseAuthType)
    if (success) {
      console.log(user)
      dispatch(authUser({user, success: true}))
      message.success(<MessageList messages={messageRes}/>);
      dispatch(setIsShowModal({key: 'auth'}))
      return
    }
    message.error(<MessageList messages={messageRes}/>);
    return
  }

  const onCancelSave = () => {
    dispatch(setIsShowModal({key: 'auth'}))
    onReset()
    props.onChange()
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('error:', errorInfo);
  };
  const onReset = () => {
    formRef.current?.resetFields();
  };
  useEffect(() => {
    onReset()
  }, [props.isStateForm])

  return (
    <Form
      className={`${_style.form}, formAuth`}
      form={form}
      ref={formRef}
      name="basic"
      layout="vertical"
      style={{ maxWidth: 500 }}
      onFinish={onSaveUser}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={props.formProperty}
    >
      {!props.isStateForm && (<Form.Item
        className={_style.form__username}
        label="Имя"
        name={AuthUserEnum.username}
        rules={[
          {required: true, message: 'Поле обязательное для заполнения!', type: 'string'},
          {
            validator: (_, password) => {
              if (password.length < 3) {
                return Promise.reject(new Error('Имя не менее 3-х символов'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input onChange={(e) => {
          dispatch(setPropertyForm({key: AuthUserEnum.username, value: e.target.value}))
        }}
        />
      </Form.Item>)}

      <Form.Item
        className={_style.form__email}
        label="E-mail"
        name={AuthUserEnum.email}
        rules={[
          {
            type: 'email',
            message: 'Введен неверный адрес электронной почты!',
          },
          {
            required: true,
            message: 'Поле обязательное для заполнения!',
          },
        ]}
      >
        <Input onChange={(e) => {
            dispatch(setPropertyForm({key: AuthUserEnum.email, value: e.target.value}))
          }}
        />
      </Form.Item>

      <Form.Item
        className={_style.form__password}
        label="Пароль"
        name={AuthUserEnum.password}
        rules={[
          {required: true, message: 'Поле обязательное для заполнения'},
          {type: 'string'},
          {
            validator: (_, password) => {
              if (password.length < 3) {
                return Promise.reject(new Error('Пароль не менее 3-х символов'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password
          onChange={(e) =>
              dispatch(setPropertyForm({key: AuthUserEnum.password, value: e.target.value})
            )}
        />
      </Form.Item>
      <div style={{textAlign: 'right'}}>
        <Form.Item shouldUpdate>
          {() => (
            <Space>
              <Button type="primary"
                      htmlType="submit"
              >
                Сохранить
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

export default FormModal