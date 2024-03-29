import styles from './Price.module.scss';
import { customStyles2 } from './stylesModal';
import { convertMoney } from '~/global/functionGlobal';

import classNames from 'classnames/bind';
import { Button, Input, Table } from 'reactstrap';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import CurrencyInput from 'react-currency-input-field';
import { HeaderTableEditAll } from '~/pages/Price/MyTablePrice/MyTablePrice';
import { MyTab } from './components/MyTab/MyTab';
import ButtonApply from './components/ButtonApply/ButtonApply';
import { listItemCalcPercent, listItemCalcPrice } from './functionPrice';
import { Link } from 'react-router-dom';
import priceAPI from '~/api/priceAPI';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Price() {
  const UP = 'Tăng',
    DOWN = 'Giảm',
    PRICE_1 = 'Giá 1',
    PERCENT_1 = 'Phần trăm 1',
    PRICE_2 = 'Giá 2',
    PERCENT_2 = 'Phần trăm 2';
  const [data, setData] = useState([]);
  const [checkedPostion, setCheckedPostion] = useState([]);
  const [checkedItem, setCheckedItem] = useState([]);
  const [checkedNewItem, setCheckedNewItem] = useState([]);

  const [disableEdit, setDisableEdit] = useState(true);
  const [modalEdit, setModalEdit] = useState([false, false]);
  const handleModal = (index) => {
    index === 0
      ? setModalEdit([!modalEdit[0], modalEdit[1]])
      : setModalEdit([modalEdit[0], !modalEdit[1]]);
  };

  // const [newPrice, setNewPrice] = useState([0, 0]);
  const [deltaPrice1, setDeltaPrice1] = useState(0);
  const [deltaPrice2, setDeltaPrice2] = useState(0);
  const [deltaPercent1, setDeltaPercent1] = useState(0);
  const [deltaPercent2, setDeltaPercent2] = useState(0);
  const [action, setAction] = useState(UP);
  const user = useSelector((state) => state.auth.user);

  const [tab1, setTab1] = useState(PRICE_1);
  const [tab2, setTab2] = useState(PRICE_2);
  const [rerender, setRerender] = useState(false);

  const handleChange = (e) => {
    const { checked, value } = e.target;
    if (checked && value === 'All') {
      setCheckedPostion(Array(data.length).fill(true));
    } else {
      if (!checked && value === 'All') {
        setCheckedPostion(Array(data.length).fill(false));
      } else if (value !== 'All') {
        let tempArr = [...checkedPostion];
        tempArr.splice(value, 1, checked);
        setCheckedPostion(tempArr);
      }
    }
  };

  const handleResetInput = (index) => {
    if (index === 1) {
      setDeltaPrice1(0);
      setDeltaPercent1(0);
    } else {
      setDeltaPrice2(0);
      setDeltaPercent2(0);
    }
  };

  const handleUpdatePrice = async () => {
    //price <= 2km
    //price >  2km
    let flag = false;
    for (let i = 0; i < checkedNewItem.length; i++) {
      if (
        checkedItem[i].price1 === checkedNewItem[i].price1 &&
        checkedItem[i].price2 === checkedNewItem[i].price2
      ) {
        flag = true;
        break;
      }
    }
    if (flag) {
      handleModal(1);
      return;
    }
    let dataSend = [];
    checkedNewItem.map((itemNew) => {
      const itemOld = checkedItem.find((itemOld) => itemNew.id === itemOld.id);
      if (itemOld) {
        if (itemNew.price1 !== itemOld.price1) {
          dataSend.push({
            priceOld: itemOld.price1,
            priceNew: itemNew.price1,
            id: itemOld.idPrice1,
            id_handler: user._id,
          });
        }
        if (itemNew.price2 !== itemOld.price2) {
          dataSend.push({
            priceOld: itemOld.price2,
            priceNew: itemNew.price2,
            id: itemOld.idPrice2,
            id_handler: user._id,
          });
        }
      }
      return itemNew;
    });
    if (dataSend.length === 0) {
      handleModal(1);
      return;
    }
    await priceAPI.putransportPrice(dataSend);
    setRerender(!rerender);
    setDeltaPercent1(0);
    setDeltaPercent2(0);
    setDeltaPrice1(0);
    setDeltaPrice2(0);
    handleModal(1);
  };
  useEffect(() => {
    const checked = checkedPostion.filter((x) => x === true).length;
    if (checked >= 1) {
      setDisableEdit(false);
    } else {
      setDisableEdit(true);
    }

    let list = [];
    for (let i = 0; i < checkedPostion.length; i++) {
      if (checkedPostion[i]) list.push(data[i]);
    }
    setCheckedItem(list);
    setCheckedNewItem(list);
  }, [checkedPostion, data]);

  useEffect(() => {
    let listNative = [...checkedItem];
    let a1, a2, b1, b2;
    a1 = typeof deltaPrice1 === 'undefined' ? 0 : deltaPrice1;
    a2 = typeof deltaPrice2 === 'undefined' ? 0 : deltaPrice2;
    b1 = typeof deltaPercent1 === 'undefined' ? 0 : deltaPercent1;
    b2 = typeof deltaPercent2 === 'undefined' ? 0 : deltaPercent2;

    if (tab1 === PRICE_1) {
      let list = listItemCalcPrice(listNative, checkedItem, action, a1, 'price1', 'price2');
      listNative = [...list];
      setCheckedNewItem(list);
    } else {
      let list = listItemCalcPercent(listNative, checkedItem, action, b1, 'price1', 'price2');
      listNative = [...list];
      setCheckedNewItem(list);
    }
    if (tab2 === PRICE_2) {
      let list = listItemCalcPrice(listNative, checkedItem, action, a2, 'price2', 'price1');
      listNative = [...list];
      setCheckedNewItem(list);
    } else {
      let list = listItemCalcPercent(listNative, checkedItem, action, b2, 'price2', 'price1');
      listNative = [...list];
      setCheckedNewItem(list);
    }
  }, [deltaPrice1, deltaPercent1, deltaPrice2, deltaPercent2, action, checkedItem, tab1, tab2]);

  useEffect(() => {
    //call get all price
    const getAllTransportPrice = async () => {
      const resTransportPrice = await priceAPI.getAllTransportPrice();
      if (!resTransportPrice.notFound) {
        setData([...resTransportPrice]);
        setCheckedPostion(Array(resTransportPrice.length).fill(false));
      }
    };
    getAllTransportPrice();
  }, [rerender]);

  return (
    <div>
      {/* Modal edit one */}
      {/* <Modal
        isOpen={modalEdit[0]}
        onRequestClose={() => handleModal(0)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className={cx('wrapper-modal')}>
          <Table bordered>
            <HeaderTableEditOne />
            <tbody>
              <tr>
                <td>
                  <label className={cx('label')}>Giá cũ</label>
                </td>
                {checkedItem.length === 1 ? (
                  <>
                    <td>{convertMoney(checkedItem[0].price1, 'đ')}</td>
                    <td>{convertMoney(checkedItem[0].price2, 'đ')}</td>
                  </>
                ) : null}
              </tr>
              <tr>
                <td>
                  <label className={cx('label')}>Giá mới</label>
                </td>
                <td>
                  <CurrencyInput
                    placeholder="100,000 đ"
                    maxLength={10}
                    onValueChange={(value) => setNewPrice([value, newPrice[1]])}
                    suffix={' đ'}
                  />
                </td>
                <td>
                  <CurrencyInput
                    placeholder="100,000 đ"
                    maxLength={10}
                    onValueChange={(value) => setNewPrice([newPrice[0], value])}
                    suffix={' đ'}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <div className={cx('wrapper-comment')}>
            <label className={cx('label')}>Nội dung thay đổi</label>
            <Input
              placeholder="Nhập nội dung thay đổi"
              bsSize={'lg'}
              className={cx('input-content')}
            />
          </div>

          <ButtonApply
            onClick={() => {
              handleUpdatePrice();
            }}
          />
        </div>
      </Modal> */}

      {/* Modal edit all */}
      <Modal
        isOpen={modalEdit[1]}
        onRequestClose={() => {
          handleModal(1);
          setDeltaPercent1(0);
          setDeltaPercent2(0);
          setDeltaPrice1(0);
          setDeltaPrice2(0);
        }}
        style={customStyles2}
        ariaHideApp={false}
      >
        <div className={cx('wrapper-modal')}>
          <Table bordered>
            <HeaderTableEditAll />
            <tbody>
              {checkedItem.map((e, i) => (
                <tr key={i}>
                  <td>
                    <label className={cx('label')}>{e?.title}</label>
                  </td>
                  <td>{e ? convertMoney(e?.price1, 'đ') : null}</td>
                  <td>{e ? convertMoney(e?.price2, 'đ') : null}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <label className={cx('label-mtb')}>{action} giá:</label>
          <div className={cx('wrapper-edit')}>
            <div className={cx('wrapper-delta')}>
              <label className={cx('label-long')}>Ở 2km đầu tiên</label>
              {tab1 === PRICE_1 ? (
                <div className={cx('view-input')}>
                  <CurrencyInput
                    placeholder="0"
                    maxLength={9}
                    onValueChange={(value) => setDeltaPrice1(value)}
                    value={deltaPrice1}
                    className={cx('currency-input')}
                  />
                  <div>đ</div>
                </div>
              ) : (
                <div className={cx('view-input')}>
                  <CurrencyInput
                    placeholder="0"
                    maxLength={2}
                    onValueChange={(value) => setDeltaPercent1(value)}
                    value={deltaPercent1}
                    className={cx('currency-input')}
                  />
                  <div>%</div>
                </div>
              )}
              <MyTab
                tab={tab1}
                nameTab1={PRICE_1}
                nameTab2={PERCENT_1}
                onClick1={() => {
                  setTab1(PRICE_1);
                  handleResetInput(1);
                }}
                onClick2={() => {
                  setTab1(PERCENT_1);
                  handleResetInput(1);
                }}
              />
            </div>
            <div className={cx('wrapper-delta')}>
              <label className={cx('label-long')}>Mỗi km tiếp theo</label>
              {tab2 === PRICE_2 ? (
                <div className={cx('view-input')}>
                  <CurrencyInput
                    placeholder="0"
                    maxLength={9}
                    onValueChange={(value) => setDeltaPrice2(value)}
                    className={cx('currency-input')}
                    value={deltaPrice2}
                  />
                  <div>đ</div>
                </div>
              ) : (
                <div className={cx('view-input')}>
                  <CurrencyInput
                    placeholder="0"
                    maxLength={2}
                    onValueChange={(value) => setDeltaPercent2(value)}
                    className={cx('currency-input')}
                    value={deltaPercent2}
                  />
                  <div>%</div>
                </div>
              )}
              <MyTab
                tab={tab2}
                nameTab1={PRICE_2}
                nameTab2={PERCENT_2}
                onClick1={() => {
                  setTab2(PRICE_2);
                  handleResetInput(2);
                }}
                onClick2={() => {
                  setTab2(PERCENT_2);
                  handleResetInput(2);
                }}
              />
            </div>
          </div>

          <label className={cx('label-mtb')}>Bảng giá sau khi thay đổi:</label>
          <Table bordered>
            <HeaderTableEditAll />
            <tbody>
              {checkedNewItem.map((e, i) => (
                <tr key={i}>
                  <td>
                    <label className={cx('label')}>{e?.title}</label>
                  </td>
                  <td>{e ? convertMoney(e?.price1, 'đ') : null}</td>
                  <td>{e ? convertMoney(e?.price2, 'đ') : null}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ButtonApply
            onClick={() => {
              handleUpdatePrice();
            }}
          />
        </div>
      </Modal>

      <div className={cx('title')}>Bảng giá vận chuyển</div>
      <Link to={'/pr/history-change'}>
        <div className={cx('title-link')}>Xem lịch sử thay đổi &#62;&#62;</div>
      </Link>
      {/* Bảng giá */}
      <Table bordered>
        <thead>
          <tr>
            {/* <th>Tỉnh/Thành phố</th> */}
            <th>Dịch vụ</th>
            <th>
              Giá cước <p style={{ color: '#04af46' }}>tối thiểu 2km</p> đầu tiên
            </th>
            <th>Giá cước mỗi km tiếp theo</th>
            <th>
              <Input
                type="checkbox"
                value={'All'}
                onChange={handleChange}
                checked={
                  checkedPostion.filter((item) => item === true).length === checkedPostion.length
                }
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e, i) => (
            <tr key={i}>
              <td>{e?.title}</td>
              <td>{convertMoney(e?.price1, ' đ')}</td>
              <td>{convertMoney(e?.price2, ' đ')}</td>
              <td>
                <Input
                  type="checkbox"
                  value={i}
                  onChange={handleChange}
                  checked={checkedPostion[i]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={cx('wrapper-button')}>
        {/* <Button
          size="lg"
          color="success"
          className={cx('button-up')}
          disabled={disableEdit}
          onClick={() => handleModal(0)}
        >
          <div className={cx('txt-price')}>Điều chỉnh đơn giá</div>
        </Button> */}
        <Button
          size="lg"
          color="success"
          className={cx('button-up')}
          disabled={disableEdit}
          onClick={() => {
            handleModal(1);
            setAction(UP);
          }}
        >
          <div className={cx('txt-price')}>Tăng giá</div>
        </Button>
        <Button
          size="lg"
          color="danger"
          className={cx('button-down')}
          disabled={disableEdit}
          onClick={() => {
            handleModal(1);
            setAction(DOWN);
          }}
        >
          <div className={cx('txt-price')}>Giảm giá</div>
        </Button>
      </div>
    </div>
  );
}

export default Price;
