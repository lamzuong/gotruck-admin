const data = [
  {
    id: 'SPT2023001',
    sender: { id: 'CTM2023001', name: 'Nguyen van an' },
    phone: '0712323561',
    email: 'znvcz@msasf.csac',
    subject: 'Don hang',
    description: 'Hnag giao chua toi ma shipper da xac nhan da giao',
    status: 'Chưa tiếp nhận',
    image: [
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/332708658_2020249881678831_3940300702927802219_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6Eo5rNjXGgYAX_JOa-L&tn=2nmEFszrXXaey78d&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBu5o6n3Ep1ci5yS6vYXh6-ItIGf7mpK_Upx0AF9mhtmw&oe=63FF6381',
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/332708658_2020249881678831_3940300702927802219_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6Eo5rNjXGgYAX_JOa-L&tn=2nmEFszrXXaey78d&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBu5o6n3Ep1ci5yS6vYXh6-ItIGf7mpK_Upx0AF9mhtmw&oe=63FF6381',
    ],
    time: '24/02/2023 2:56 P.M',
  },
  {
    id: 'SPT2023002',
    sender: { id: 'CTM2023001', name: 'Nguyen van an' },
    phone: '0712323561',
    email: 'znvcz@msasf.csac',
    subject: 'Don hang',
    description: 'SHipper giao qua lau',
    status: 'Đã tiếp nhận',
    image: [
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/332708658_2020249881678831_3940300702927802219_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6Eo5rNjXGgYAX_JOa-L&tn=2nmEFszrXXaey78d&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBu5o6n3Ep1ci5yS6vYXh6-ItIGf7mpK_Upx0AF9mhtmw&oe=63FF6381',
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/332708658_2020249881678831_3940300702927802219_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6Eo5rNjXGgYAX_JOa-L&tn=2nmEFszrXXaey78d&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBu5o6n3Ep1ci5yS6vYXh6-ItIGf7mpK_Upx0AF9mhtmw&oe=63FF6381',
    ],
    time: '24/02/2023 2:56 P.M',
  },
  {
    id: 'SPT2023003',
    sender: { id: 'CTM2023001', name: 'Nguyen van an' },
    phone: '0712323561',
    email: 'znvcz@msasf.csac',
    subject: 'Tai khoan',
    description: 'Tai sao tai khoan toi khong the truy cap duoc',
    status: 'Đã xử lý',
    image: [
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/332708658_2020249881678831_3940300702927802219_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6Eo5rNjXGgYAX_JOa-L&tn=2nmEFszrXXaey78d&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBu5o6n3Ep1ci5yS6vYXh6-ItIGf7mpK_Upx0AF9mhtmw&oe=63FF6381',
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/332708658_2020249881678831_3940300702927802219_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6Eo5rNjXGgYAX_JOa-L&tn=2nmEFszrXXaey78d&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBu5o6n3Ep1ci5yS6vYXh6-ItIGf7mpK_Upx0AF9mhtmw&oe=63FF6381',
    ],
    time: '24/02/2023 2:56 P.M',
  },
  {
    id: 'SPT2023004',
    sender: { id: 'CTM2023001', name: 'Nguyen van an' },
    phone: '0712323561',
    email: 'znvcz@msasf.csac',
    subject: 'Don hang',
    description: 'Hàng giao quá lâu',
    status: 'Đã xử lý',
    image: [
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/332708658_2020249881678831_3940300702927802219_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6Eo5rNjXGgYAX_JOa-L&tn=2nmEFszrXXaey78d&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBu5o6n3Ep1ci5yS6vYXh6-ItIGf7mpK_Upx0AF9mhtmw&oe=63FF6381',
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/332708658_2020249881678831_3940300702927802219_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=6Eo5rNjXGgYAX_JOa-L&tn=2nmEFszrXXaey78d&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfBu5o6n3Ep1ci5yS6vYXh6-ItIGf7mpK_Upx0AF9mhtmw&oe=63FF6381',
    ],
    time: '24/02/2023 2:56 P.M',
  },
];
export default data;
