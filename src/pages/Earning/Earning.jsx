import styles from './Earning.module.scss';
import { convertIndochina, convertMoney, convertSubstringDate } from '~/global/functionGlobal';
import earningApi from '~/api/earningAPI';
import { month, today, week } from './label';

import React, { useEffect, useState } from 'react';
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
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(convertSubstringDate(currentDate));
  const [endDate, setEndDate] = useState(convertSubstringDate(currentDate));
  const [statistic, setStatistic] = useState({ value: 'today' });

  const [data, setData] = useState({
    labels: ['Mon', 'Tue', 'Web', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Doanh thu theo ngày',
        data: [1, 2, 3, 4, 5],
        borderColor: 'blue',
        tension: 0.2,
      },
    ],
  });
  const [total, setTotal] = useState(0);

  const earnToday = async (date = '') => {
    let res = [];
    if (date === '') {
      res = await earningApi.getEarningToday();
    } else {
      res = await earningApi.getEarningSpecific({ startDate: date, endDate: date });
    }
    setData({
      labels: today,
      datasets: [
        {
          label: 'Doanh thu theo ngày',
          data: res[0].earnPerHour,
          borderColor: 'blue',
        },
      ],
    });
    setTotal(res[0].total);
  };
  useEffect(() => {
    const getEarning = async () => {
      try {
        if (statistic.value === 'today') {
          setStartDate(convertSubstringDate(currentDate));
          setEndDate(convertSubstringDate(currentDate));
          earnToday();
        } else if (statistic.value === 'week') {
          let d = new Date();
          d.setDate(d.getDate() - 7);
          setStartDate(convertSubstringDate(d));
          setEndDate(convertSubstringDate(currentDate));

          const res = await earningApi.getEarningWeek();
          res.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          let dataShow = [];
          let totalShow = 0;
          for (let i = 6; i >= 0; i--) {
            dataShow.push(res[i]?.total || 0);
            totalShow += res[i]?.total || 0;
          }
          setData({
            labels: week,
            datasets: [
              {
                label: 'Doanh thu theo tuần',
                data: dataShow,
                borderColor: 'blue',
              },
            ],
          });
          setTotal(totalShow);
        } else if (statistic.value === 'month') {
          let d = new Date();
          d.setMonth(d.getMonth() - 1);
          setStartDate(convertSubstringDate(d));
          setEndDate(convertSubstringDate(currentDate));

          const res = await earningApi.getEarningMonth();
          res.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          let dataShow = [];
          let totalShow = 0;
          for (let i = month.length - 1; i >= 0; i--) {
            dataShow.push(res[i]?.total || 0);
            totalShow += res[i]?.total || 0;
          }
          setData({
            labels: month,
            datasets: [
              {
                label: 'Doanh thu theo tháng',
                data: dataShow,
                borderColor: 'blue',
              },
            ],
          });
          setTotal(totalShow);
        } else if (statistic.value === 'specific') {
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEarning();
  }, [statistic]);
  useEffect(() => {
    const getSpecficDate = async () => {
      if (startDate === endDate) earnToday(startDate);
      else if (statistic.value === 'specific') {
        const res = await earningApi.getEarningSpecific({
          startDate: startDate,
          endDate: endDate,
        });
        res.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        let d1 = new Date(startDate);
        let d2 = new Date(endDate);
        let d3 = (d2 - d1) / 24 / 60 / 60 / 1000;
        let specific = [];
        for (let i = d3; i >= 0; i--) {
          let date = new Date();
          date.setDate(date.getDate() - i);
          let strDate = date.toISOString().slice(0, 10);
          let arrDate = strDate.split('-');
          specific.push(arrDate[2] + '/' + arrDate[1]);
        }

        let dataShow = [];
        let totalShow = 0;
        for (let i = d3; i >= 0; i--) {
          dataShow.push(res[i]?.total || 0);
          totalShow += res[i]?.total || 0;
        }
        setData({
          labels: specific,
          datasets: [
            {
              label: 'Doanh thu theo ngày cụ thể',
              data: dataShow,
              borderColor: 'blue',
            },
          ],
        });
        setTotal(totalShow);
      }
    };
    getSpecficDate();
  }, [startDate, endDate]);

  const options = {};
  const optionsStatis = [
    { value: 'today', label: 'Thống kê hôm nay' },
    { value: 'week', label: 'Thống kê theo tuần' },
    { value: 'month', label: 'Thống kê theo tháng' },
    { value: 'specific', label: 'Thống kê theo ngày cụ thể' },
  ];
  const handleStartDate = (e) => {
    if (e.target.value > endDate) {
      setStartDate(startDate);
      alert('Chọn ngày không hợp lệ');
      return;
    } else setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    if (e.target.value < startDate) {
      setEndDate(endDate);
      alert('Chọn ngày không hợp lệ');
      return;
    } else setEndDate(e.target.value);
  };
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
                      onChange={(e) => handleStartDate(e)}
                      value={startDate || ''}
                    />
                  </div>
                  <div className={cx('view-date')}>
                    <div className={cx('title-date')}>Ngày kết thúc</div>
                    <input
                      type="date"
                      className={cx('input-date')}
                      onChange={(e) => handleEndDate(e)}
                      value={endDate || ''}
                    />
                  </div>
                </div>
                {/* <Button block color="primary" className={cx('btn-search')}>
                  <div className={cx('txt-search')}>Tìm kiếm</div>
                </Button> */}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Earning */}
      <div className={cx('wrapper-earning')}>
        <div className={cx('title-earning')}>Tổng doanh thu:</div>
        <div className={cx('money-earning')}>{convertMoney(total, 'VNĐ')}</div>
      </div>
    </div>
  );
}

export default Earning;
