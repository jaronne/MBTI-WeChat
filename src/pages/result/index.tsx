import Taro from "@tarojs/taro";
import { View, Image } from '@tarojs/components'
import {AtButton} from "taro-ui";
import headerBg from "../../asserts/headerBg.jpg";
import questions from '../../data/questions.json';
import questionsResults from '../../data/questionResults.json';
import GlobalFooter from "../../components/GlobalFooter";
import './index.scss'
import {getBestQuestionResult} from "../../utils/bizUtils";


/**
 * 测试结果页
 */
export default () => {
  const answerList = Taro.getStorageSync('answerList');
  if(!answerList || answerList.length < 1) {
    Taro.showToast({
      title: '答案为空',
      icon: 'error',
      duration: 3000
    })
  }
  const result = getBestQuestionResult(answerList, questions, questionsResults);
  return (
    <View className='resultPage'>
      <View className='at-article__h1 title'>
        {result.resultName}
      </View>
      <View className='at-article__h2 subTitle'>
        {result.resultDesc}
      </View>
      <AtButton type='primary' circle className='enterBtn' onClick={() => {
        Taro.reLaunch({
          url: '/pages/index/index'
        })
      }}
      >
        返回主页
      </AtButton>
      <Image className='headerBg' src={headerBg} />
      <GlobalFooter />
    </View>
  );
};
