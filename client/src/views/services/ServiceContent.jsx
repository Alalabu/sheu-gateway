import React from 'react';
import { Layout, PageHeader, Button, Descriptions, Input, Alert, Radio, Row, Col,
  Spin,
} from 'antd';
import './ServiceContent.css';

const { Content } = Layout;
const { Search, TextArea } = Input;

import { connect } from 'react-redux';
import store from '../../redux/store';

class ServiceContent extends React.Component {

  state = {
    testContext: 'result: ',
    resDataType: 'json',
    apiHeader: '{"Content-Type": "application/json", "authorization":"xxx"}',
  }

  constructor(props) {
    super(props);

    this.onAPIsUpdate = this.onAPIsUpdate.bind(this);
    this.onTestAPI = this.onTestAPI.bind(this);
  }

  /**
   * render 组件渲染挂载之前执行的生命周期方法
   */
  async componentWillMount() {
    // 注册 菜单更新 服务
    store.subscribe(this.onAPIsUpdate);
  }

  onAPIsUpdate() {
    const serviceData = store.getState().chooseService;
    this.setState({serviceData});
  }

  async onTestAPI({serviceName, cmd, method, params}) {
    const {resDataType} = this.state;
    let headers = {};
    const apiHeader = this.state.apiHeader;
    if (apiHeader) {
      try {
        headers = JSON.parse(apiHeader);
      } catch (error) {
        return alert('Headers 必须是有效的 JSON 格式。');
      }
    }

    try {
      method = method.toUpperCase();
      params = JSON.parse(`{${params}}`);

      if(resDataType === 'text') {
        params.dataType = 'text';
      }

      let url = `/${serviceName}/${cmd}`;
      const requestOptions = { method };
      // console.log('当前API请求的 method: ', method);
      if(method === 'GET' || method === 'HEAD') {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
        url += '?' + paramsArray.join('&');
      } else {
        requestOptions.body = JSON.stringify(params);
      }
      requestOptions.headers = headers;
      
      this.setState({
        apiLoadding: true,
      });
      // eslint-disable-next-line no-undef
      const res = await fetch(url, requestOptions);
      let resData = await res.text();
      this.setState({
        apiLoadding: false,
      });
      // const resHtml = resData.indexOf('<!DOCTYPE html>') > -1;
      this.setState({
        testContext: resData,
      });
    } catch (e) {
      console.log('========> Test API Fetch Error => ', e);
      // alert(e);
      this.setState({
        testContext: String(e)
      });
    }
  }

  render() {
    const { serviceData } = this.state;
    if(!serviceData) return <div></div>;
    // 装载数据
    const { testContext } = this.state;
    const {serviceName, title, describe, version, apiName, cmd, method} = serviceData;
    return (
      <div>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader ghost={false} title={title+'('+serviceName+')'} subTitle={describe}>
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="命令"><a>{cmd}</a></Descriptions.Item>
              <Descriptions.Item label="调用">
              ctx.app.seneca('{serviceName}', '{cmd}', options)
              </Descriptions.Item>
              <Descriptions.Item label="版本">{version}</Descriptions.Item>
              <Descriptions.Item label="描述">
                {apiName}
              </Descriptions.Item>
              <Descriptions.Item label="网关接口">
                [{method}] <a>/{serviceName}/{cmd}</a>
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>

        <Content
          className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}
        >
          <Descriptions title="API测试" layout="vertical" column={1} bordered>
            <Descriptions.Item label='输入，例：{"name": "Lucy", "age": 13}'>
              <Col flex="100px">Headers: </Col>
              <TextArea rows={4} value={this.state.apiHeader} onChange={e => {
                  this.setState({
                    apiHeader: e.target.value
                  });
                }} />

              <Row style={{margin: '10px 0'}}>
                <Col flex="100px">响应数据格式: </Col>
                <Col flex="auto">
                <Radio.Group defaultValue="json" buttonStyle="solid" onChange={e => {
                  this.setState({
                    resDataType: e.target.value
                  });
                }}>
                  <Radio.Button value="json">json</Radio.Button>
                  <Radio.Button value="text">text</Radio.Button>
                  <Radio.Button value="formdata" disabled>formdata</Radio.Button>
                  <Radio.Button value="buffer" disabled>buffer</Radio.Button>
                </Radio.Group>
                </Col>
              </Row>

              <Search
                addonBefore="Json参数: " prefix="{"  suffix="}"
                placeholder="输入json格式参数"
                enterButton="执行命令"
                onSearch={async value => await this.onTestAPI({serviceName, cmd, method, params: value})}
              />
            </Descriptions.Item>
            <Descriptions.Item label="执行结果">
              {this.state.apiLoadding ? <Spin /> : 
                <iframe width="100%" height="500px" frameBorder="0" seamless srcDoc={testContext}></iframe>
              }
            </Descriptions.Item>
          </Descriptions>
        </Content>
      </div>
    );
  }
};

function mapState(state, ownProps) {
  // console.log('【mapState】 state =>', state);
  // console.log('【mapState】 ownProps =>', ownProps);
  return {
    // routerUrl: state['routerUrl']
  }
}

function mapDispatch(dispatch, ownProps) {
  // console.log('【mapDispatch】 dispatch =>', dispatch);
  // console.log('【mapDispatch】 ownProps =>', ownProps);
  return {
    // 挂载一个 `urlCache` 对象
    // async onRefresh() {
    //   dispatch(await ServicesMapAction.onRefresh())
    // },
  }
}

export default connect(mapState, mapDispatch)(ServiceContent);