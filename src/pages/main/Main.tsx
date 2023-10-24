import React, {useEffect} from "react";
import _styles from "./Button.module.scss"
import {useAppDispatch, useAppSelector} from "../../hook/redux";
import {actionGetAllNews, newsSelector} from "../../redux/news/newsStore";
import {NewsType} from "../../tupes/news/News.type";



const Main: React.FC = () => {
  const {news, successNews} = useAppSelector(newsSelector)
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    await dispatch(actionGetAllNews());
  };
  const listNews = news?.map((item: NewsType) => {
    const startDate = new Date(item.date_start);
    const currentDate = new Date();
    const publicDate = `${startDate.getHours()} ч. ${startDate.getMinutes()} мин. ${startDate.toLocaleDateString('ru-RU')}`
    if (currentDate > startDate) {
      return (
        item.status && (
          <div key={item._id} className={_styles.article}>
          <span className={_styles.title}>
            {item.title}
          </span>
            <span className={_styles.description} dangerouslySetInnerHTML={{ __html: item.description }} />
            <span className={_styles.date}>
              {publicDate}
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