/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'Ошибка(',
  201: 'Ошибка(',
  202: 'Ошибка(',
  204: 'Ошибка(',
  400: 'Ошибка(',
  401: 'Ошибка(',
  403: 'Ошибка(',
  404: 'Ошибка(',
  406: 'Ошибка(',
  410: 'Ошибка(',
  422: 'Ошибка(',
  500: 'Ошибка(',
  502: 'Ошибка(',
  503: 'Ошибка(',
  504: 'Ошибка(',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Произошла ошибка ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Произошла ошибка, повторите позже',
      message: 'Произошла ошибка',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'omit', // 默认请求是否带上cookie
});
export default request;
