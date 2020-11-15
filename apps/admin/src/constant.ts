// 角色权限权限
export class ADMINRULES {
  public static ROOT_ADMIN = "rule_root_admin"; // 根管理员
  public static ORDINART_ADMIN = "rule_ordinary_admin"; // 普通管理员
  public static __ALL_ADMIN = "rule_all_admin"; // 全部
}

// 响应状态码
export class REULTCODES {
  // 成功状态码
  public static SUCCESS = 20000;

  // token错误
  public static TOKEN_IS_NULL = 10101; // token为空
  public static TOKEN_IS_INVALID = 10102; // token无效
  public static TOKEN_IS_EXPIRED = 10103; // token 过期

  // 参数错误
  public static PARAMS_IS_NULL = 10201; // 参数为空
  public static PARAMS_NOT_COMPLETE = 10202; // 参数不全
  public static PARAMS_TYPE_ERROR = 10203; // 参数类型错误
  public static PARAMS_IS_INVALID = 10204; // 参数无效

  // 用户错误
  public static USER_NOT_EXIST = 10301; // 用户不存在
  public static USER_NOT_LOGGED_IN = 10302; // 用户未登陆
  public static USER_ACCOUNT_ERROR = 10303; // 用户名或密码错误
  public static USER_ACCOUNT_FORBIDDEN = 10304; // 用户账户已被禁用
  public static USER_HAS_EXIST = 10305; // 用户已存在

  // 业务错误
  public static BUSINESS_ERROR = 10401; // 系统业务出现问题

  // 系统错误
  public static SYSTEM_INNER_ERROR = 10501; // 系统内部错误

  // 数据错误
  public static DATA_NOT_FOUND = 10601; // 数据未找到
  public static DATA_IS_WRONG = 10602; // 数据有误
  public static DATA_ALREADY_EXISTED = 10603; // 数据已存在
  public static DATA_NO_NEED_UPDATE = 10603; // 数据无需更新

  // 接口错误
  public static INTERFACE_INNER_INVOKE_ERROR = 10701; // 系统内部接口调用异常
  public static INTERFACE_OUTER_INVOKE_ERROR = 10702; // 系统外部接口调用异常
  public static INTERFACE_FORBIDDEN = 10703; // 接口禁止访问
  public static INTERFACE_ADDRESS_INVALID = 10704; // 接口地址无效
  public static INTERFACE_REQUEST_TIMEOUT = 10705; // 接口请求超时
  public static INTERFACE_EXCEED_LOAD = 10706; // 接口负载过高

  // 权限错误
  public static PERMISSION_NO_ACCESS = 10801; // 没有访问权限
}
