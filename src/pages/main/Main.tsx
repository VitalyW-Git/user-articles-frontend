import React, {useEffect} from "react";
import _styles from "./Button.module.scss"
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionGetAllNews, newsSelector} from "../../redux/news/newsStore";
import {NewsAllType} from "../../tupes/news/NewsAll.type";


const Main: React.FC = () => {
  const {news, successNews} = useAppSelector(newsSelector)
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    await dispatch(actionGetAllNews());
  };
  const listNews = news?.map((item: NewsAllType) => {
    const startDate = new Date(item.date_start);
    const currentDate = new Date();
    if (currentDate > startDate) {
      return (
        item.status && (
          <div key={item._id} className={_styles.article}>
          <span className={_styles.title}>
            {item.title}
          </span>
            <span className={_styles.description}>
            {item.description}
          </span>
            <span className={_styles.date}>
              {startDate.toLocaleDateString('ru-RU')}
            </span>
          </div>
        )
      );
    } else {
      return null;
    }
  });
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      {successNews
        ? (<div className={_styles.content}>
          {listNews}
        </div>)
        : (<div className={_styles.info}>Созданных записей нет. Для создания, пройдите регистрацию!</div>)}
    </>
  )
}

export default Main