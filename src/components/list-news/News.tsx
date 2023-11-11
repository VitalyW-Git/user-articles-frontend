import React from "react";
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionDeleteNews, userSelector} from "../../redux/user/userStore";
import {fillProperty} from "../../redux/form/formStore";
import {NewsType} from "../../tupes/news/News.type";
import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import _styles from "./News.module.scss";

const News: React.FC = () => {
  const {userNews} = useAppSelector(userSelector)

  const dispatch = useAppDispatch();
  const onDelete = async (item: NewsType) => {
    await dispatch(actionDeleteNews(item))
  }
  console.log('News')
  const listNews = userNews?.map((item: NewsType) => {
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
        <span className={_styles.description} dangerouslySetInnerHTML={{__html: item.description}}/>
        <span className={_styles.date}>
              {publicDate}
        </span>
      </div>
    );
  });
  return (
    <>
      {listNews}
    </>
  )
}

export default News