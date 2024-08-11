import Taro from "@tarojs/taro";
import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtButton, AtRadio } from 'taro-ui';
import GlobalFooter from '../../components/GlobalFooter';
import questions from '../../data/questions.json';
import './index.scss';

/**
 * 答题
 */
export default () => {
  // 当前题目序号（从1开始）
  const [current, setCurrent] = useState<number>(1);
  // 当前题目
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  // 选项
  const questionOptions = currentQuestion.options.map(option => {
    return { label: `${option.key}. ${option.value}`, value: `${option.key}` };
  });
  // 当前答案
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  // 回答列表
  const [answerList] = useState<string[]>([]);

  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  return (
    <View className="quizPage">
      <View className="at-article__h2 title">
        {current}. {currentQuestion.title}
      </View>
      <View className="options-wrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            answerList[current - 1] = value;
          }}
        />
      </View>
      {current < questions.length && (
        <AtButton
          type="primary"
          circle
          className="controlBtn"
          disabled={!currentAnswer}
          onClick={() => {
            setCurrent(current + 1);
          }}
        >
          下一题
        </AtButton>
      )}
      {current == questions.length && (
        <AtButton
          type="primary"
          circle
          disabled={!currentAnswer}
          className="controlBtn"
          onClick={() => {
            Taro.setStorageSync('answerList', answerList);
            Taro.navigateTo({url: '/pages/result/index'})
          }
          }
        >
          查看结果
        </AtButton>
      )}
      {current > 1 && (
        <AtButton
          circle
          className="controlBtn"
          onClick={() => {
            setCurrent(current - 1);
          }}
        >
          上一题
        </AtButton>
      )}
      <GlobalFooter />
    </View>
  );
};
