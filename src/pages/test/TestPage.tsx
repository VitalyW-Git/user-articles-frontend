import {useAppSelector} from "../../hook/redux";
import {userSelector} from "../../redux/user/userStore";
import React from "react";


const TestPage = () => {
  const {isLoading} = useAppSelector(userSelector)
  console.log(isLoading, 'TestPage')
  return (
    <>
      5454
    </>
  )
}

export default TestPage;