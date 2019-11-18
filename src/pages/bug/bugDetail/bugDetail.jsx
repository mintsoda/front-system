import React, { Component } from 'react';
import { Descriptions } from 'antd';

class bugDetail extends Component {
    render() {
        return (
            <Descriptions title="input在dispaly：flex失效超出整体宽度" layout="horizontal">
                <Descriptions.Item label="作者">余尚辉</Descriptions.Item>
                <Descriptions.Item label="时间">2018-08-09</Descriptions.Item>
                <Descriptions.Item label="类型">app</Descriptions.Item>
                <Descriptions.Item label="问题场景" span={3}>
                    最外层的盒子设置为弹性盒子，左边和右边的写成固定宽度，中间的input输入框设置为flex:1，希望input的宽度是所剩下的长度，结果是它比所剩下的长度要大，验证码这三个字就显示成两行了
                    原因：input兼容弹性盒子有问题，它会有一个自己默认的最小长度，所以会导致验证码显示成两行
                    解决办法：我们可以给input输入框加一个div父元素，然后这个div设置flex:1,input设置width:100%；即可解决问题
                </Descriptions.Item>
                <Descriptions.Item label="解决方案" span={3}>
                    最外层的盒子设置为弹性盒子，左边和右边的写成固定宽度，中间的input输入框设置为flex:1，希望input的宽度是所剩下的长度，结果是它比所剩下的长度要大，验证码这三个字就显示成两行了
                    原因：input兼容弹性盒子有问题，它会有一个自己默认的最小长度，所以会导致验证码显示成两行
                    解决办法：我们可以给input输入框加一个div父元素，然后这个div设置flex:1,input设置width:100%；即可解决问题
                </Descriptions.Item>
            </Descriptions>
        );
    }
}

export default bugDetail;
