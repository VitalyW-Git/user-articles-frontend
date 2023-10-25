import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionAllListNews, actionDeleteNews, userSelector} from "../../redux/user/userStore";
import {NewsType} from "../../tupes/news/News.type";
import {Button, Modal} from "antd";
import Add from "../../components/add-news/Add";
import FormNews from "../../components/add-news/form/FormNews";
import {fillProperty, formSelector} from "../../redux/form/formStore";
import {DeleteOutlined} from "@ant-design/icons";
import _styles from "./UserProfile.module.scss";
import _style from "../../components/add-news/Add.module.scss";


const UserProfile: React.FC = () => {
  const {userNews, isLoading, user} = useAppSelector(userSelector)
  const {formNews} = useAppSelector(formSelector)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    if (!isLoading && !user.isAuth) {
      navigate('/', { replace: true });
      return
    }
    await dispatch(actionAllListNews());
  };

  const onDelete = async (item: NewsType) => {
    await dispatch(actionDeleteNews(item))
  }

  const listNews = userNews?.map((item: NewsType, index: number) => {
    const startDate = new Date(item.date_start);
    const publicDate = `${startDate.getHours()} ч. ${startDate.getMinutes()} мин. ${startDate.toLocaleDateString('ru-RU')}`
      return (
          <div key={item._id} className={_styles.article}>
            <div className={_styles.edit}>
              <div className={_styles.title}>
                {!item.status && (<span className={_styles.title__marker}>Запись удалена</span>)}
                <span className={_styles.title__name}>{item.title}</span>
              </div>
              <div className={_styles.edit__btn}>
                <Button type="primary"
                        onClick={() => dispatch(fillProperty(item))}
                >
                  Редактировать
                </Button>
                <DeleteOutlined
                  style={{marginLeft: '10px', cursor: 'pointer', fontSize: '20px'}}
                  onClick={() => onDelete(item)}
                />
              </div>
            </div>
            <span className={_styles.description} dangerouslySetInnerHTML={{ __html: item.description }} />
            <span className={_styles.date}>
              {publicDate}
            </span>
          </div>
      );
  });

  useEffect(() => {
    fetchData()
  }, [isLoading])
  return (
    <>
      <Add />
      {userNews.length
        ? (<div className={_styles.content}>
          {listNews}
        </div>)
        : (<div className={_styles.info}>Созданных записей нет.</div>)}
      <Modal
        className={`${_style.modalForm} modalNews`}
        title={"Редактирование"}
        open={formNews.isShowModalEdit}
        footer={[]}
      >
        <FormNews
          isEdit={false}
          nameCancel={'editNews'}
        />
      </Modal>
    </>
  )
}

export default UserProfile