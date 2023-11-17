import React from "react";
import {useAppSelector} from "../../hook/redux";
import {newsSelector} from "../../redux/news/newsStore";
import {NewsType} from "../../tupes/news/News.type";
import _styles from "./News.module.scss";

const AllNews = () => {
  const {news} = useAppSelector(newsSelector)

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
  console.log('AllNews')
  return (
    <>
      {listNews}
    </>
  )
}

export default AllNews