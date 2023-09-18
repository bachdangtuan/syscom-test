const DICT = {
  'Architecture': 'Kiến trúc',
  'BuildNumber': 'Số hiệu bản build',
  'ComputerName': 'Tên máy tính',
  'InstallDate': 'Ngày cài đặt',
  'MaxNumberOfProcesses': 'Số tiến trình tối đa',
  'Name': 'Tên gọi',
  'NumberOfProcesses': 'Số tiến trình',
  'NumberOfUsers': 'Số người dùng',
  'Users': 'Người dùng',
  'OsName': 'Tên hệ điều hành',
  'ProcessMemorySize': 'Kích cỡ bộ nhớ tiến trình',
  'RegisteredUser': 'Người dùng đăng ký',
  'SerialNumber': 'Số series',
  'Version': 'Phiên bản',
};

const missingKeys = {};

window.__missingkeys = function() {
  return missingKeys;
};

export function t(key) {
  if (DICT[key]) {
    return DICT[key];
  } else {
    missingKeys[key] = key;
    return key;
  }
}
