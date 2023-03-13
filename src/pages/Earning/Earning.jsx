import styles from './Earning.module.scss';
import { convertMoney } from '~/global/functionGlobal';

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import { Button } from 'reactstrap';

const cx = classNames.bind(styles);

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function Earning() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [statistic, setStatistic] = useState('today');
  const data = {
    labels: ['Mon', 'Tue', 'Web', 'Tue', 'Web'],
    datasets: [
      {
        label: 'Doanh thu theo ngày',
        data: [10251320, 102332306, 32012319, 252523454, 523452343],
        borderColor: 'blue',
        tension: 0.2,
      },
    ],
  };
  const options = {};
  const optionsStatis = [
    { value: 'today', label: 'Thống kê hôm nay' },
    { value: 'week', label: 'Thống kê theo tuần' },
    { value: 'month', label: 'Thống kê theo tháng' },
    { value: 'specific', label: 'Thống kê theo ngày cụ thể' },
  ];
  const handleChangeDate = () => {};
  return (
    <div className={cx('wrapper-statistic')}>
      <div className={cx('title')}>Thống kê doanh thu</div>
      <div className={cx('inline')}>
        {/* Graph */}
        <div className={cx('graph-view')}>
          <Line data={data} options={options}></Line>
        </div>
        {/* Filter */}
        <div className={cx('wrapper-search')}>
          <div>
            <Select
              options={optionsStatis}
              defaultValue={optionsStatis[0]}
              onChange={setStatistic}
            />
            {statistic.value === 'specific' && (
              <>
                <div className={cx('wrapper-date')}>
                  <div className={cx('view-date')}>
                    <div className={cx('title-date')}>Ngày bắt đầu</div>
                    <input
                      type="date"
                      className={cx('input-date')}
                      onChange={handleChangeDate}
                      defaultValue={startDate.toISOString().substring(0, 10)}
                    />
                  </div>
                  <div className={cx('view-date')}>
                    <div className={cx('title-date')}>Ngày kết thúc</div>
                    <input
                      type="date"
                      className={cx('input-date')}
                      onChange={handleChangeDate}
                      defaultValue={endDate.toISOString().substring(0, 10)}
                    />
                  </div>
                </div>
                <Button block color="primary" className={cx('btn-search')}>
                  <div className={cx('txt-search')}>Tìm kiếm</div>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Earning */}
      <div className={cx('wrapper-earning')}>
        <div className={cx('title-earning')}>Tổng doanh thu:</div>
        <div className={cx('money-earning')}>{convertMoney(1561616156, 'VNĐ')}</div>
      </div>
    </div>
  );
}

export default Earning;
