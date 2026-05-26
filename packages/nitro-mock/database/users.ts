// 模拟用户数据
export const mockUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123', // 实际项目中应该加密
    avatar: 'https://avatars.githubusercontent.com/u/34930213?v=4&size=64',
    role: 'admin',
    permission: [1, 2, 201, 202, 203, 20301, 20302, 3, 4],
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    avatar: 'https://avatars.githubusercontent.com/u/34930213?v=4&size=64',
    role: 'user',
    permission: [1],
  },
]
