import { View, Image } from '@tarojs/components'
import {AtButton} from "taro-ui";
import headerBg from "../../asserts/headerBg.jpg";
import './index.scss'
import GlobalFooter from "../../components/GlobalFooter";

/**
 * 主页
 */
export default () => {
  return (
    <View className='indexPage'>
      <View className='at-article__h1 title'>
        MBTI 性格测试
      </View>
      <View className='at-article__h2 subTitle'>
        看看你是十六型人格的哪一种
      </View>
      <AtButton type='primary' circle className='enterBtn'>开始测试</AtButton>
      <Image className='headerBg' src={headerBg} />
      <GlobalFooter />
    </View>
  );
};
