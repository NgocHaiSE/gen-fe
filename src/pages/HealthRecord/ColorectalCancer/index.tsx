import HealthRecordService from '@/services/healthRecord';
import { PageContainer, PageLoading } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Col, Form, Menu, MenuProps, Row } from 'antd';
import { useEffect, useState } from 'react';
import ControlButton from '../ControlButton';
import CustomInput from '../CustomInput';
import GenTestForm from '../GenTestForm';
import listMenu from '../Menu';
import PatientInfo from '../PatientInfo';
import './colorectalCancer.css';
import COLORECTAL from './colorectalTemplate';

let CANCER = JSON.parse(JSON.stringify(COLORECTAL));

export default () => {
  const [patientInfoForm] = Form.useForm();
  const [genTestForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('patient_info');
  const getHealthRecord = async (id, type) => {
    let data = await HealthRecordService.getHealthRecord(id, type);
    CANCER = data.data;
    patientInfoForm.setFieldsValue(CANCER.patientInfo);
    genTestForm.setFieldsValue(CANCER.genTestInfo);
  };

  const params = useParams();
  useEffect(() => {
    patientInfoForm.setFieldsValue({
      address: '',
      dob: '',
      fullname: '',
      healthRecordId: '',
      job: '',
      phone: '',
      sex: '',
    });
    genTestForm.setFieldsValue({
      concentrateDNA: '',
      dateSample: '',
      patientId: '',
      purityDNA: '',
      sourceSample: '',
      testCode: '',
      testDate: '',
      typeSample: '',
    });

    if (params.id !== '0') {
      getHealthRecord(params, CANCER.typeHealthRecord);
    } else {
      CANCER = JSON.parse(JSON.stringify(COLORECTAL));
    }
    setLoading(false);
  }, []);
  const handleSubmit = async () => {
    const patientInfo = patientInfoForm.getFieldsValue();
    const genTestInfo = genTestForm.getFieldsValue();
    console.log('submit', genTestInfo);
    const healthRecordId = patientInfo?.healthRecordId;
    const data: object = Object.assign(
      {},
      CANCER,
      { patientInfo },
      { genTestInfo },
      { healthRecordId },
    );
    console.log('send value', data);
    const demo = await HealthRecordService.saveHealthRecord(data);

    console.log('response', demo);
    console.log(history);
  };
  const changeMenu: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  if (loading) return <PageLoading />;
  return (
    <div className="cancer-page">
      <div className={collapsed ? 'sidebar-1' : 'sidebar'}>
        <Menu
          onClick={changeMenu}
          className="menu"
          inlineCollapsed={collapsed}
          mode="inline"
          selectedKeys={[current]}
          defaultSelectedKeys={['patient_info']}
          items={listMenu}
        ></Menu>
      </div>
      <div className="content">
        <PageContainer
          header={{
            title: 'BỆNH ÁN UNG THƯ TRỰC TRÀNG',
          }}
        >
          {/* <h3>PHẦN 1: THÔNG TIN CHUNG</h3>
      <p style={{ color: 'red' }}>
        (*Chứa toàn bộ thông tin bệnh nhân từ khi phát hiện bệnh đến ngày bắt đầu theo dõi)
      </p> */}
          <div className={current !== 'patient_info' ? 'none' : ''}>
            <h4>I{'>'} HÀNH CHÍNH</h4>
            <PatientInfo form={patientInfoForm} />
          </div>

          {CANCER.generalInfo.map((category, categoryId) => {
            return (
              <div key={categoryId} className={current !== category.key ? 'none' : ''}>
                {/* {category.name.includes('IV> KHÁM LÂM SÀNG') && <h3>PHẦN 2:THEO DÕI BỆNH NHÂN</h3>} */}
                <h4 className="category-title">{category.name}</h4>
                <table>
                  <thead></thead>
                  <tbody>
                    {category.listQuestions.map((item, index) => {
                      return (
                        <tr key={index}>
                          {/* <td style={{ width: "10px" }}>{index}</td> */}
                          {item.map((listQuestion, listId) => {
                            return (
                              <td
                                colSpan={
                                  item.length === 1
                                    ? '100%'
                                    : item.length === 2 && listId === 1
                                    ? '2'
                                    : '1'
                                }
                                key={listId}
                              >
                                {listQuestion.map((ques, quesId) => {
                                  if (
                                    ques?.question &&
                                    ques.type !== 'title' &&
                                    ques.type !== 'none'
                                  ) {
                                    return (
                                      <Row key={quesId}>
                                        <Col
                                          span={24}
                                          style={{ minHeight: '48px' }}
                                          className="cell"
                                        >
                                          {ques.question}
                                        </Col>
                                        <Col span={18}>
                                          {' '}
                                          <CustomInput
                                            className="cell"
                                            quesId={quesId}
                                            ques={ques}
                                            index={index}
                                            categoryId={categoryId}
                                            listId={listId}
                                            CANCER={CANCER}
                                            templateInfo={
                                              CANCER.generalInfo[categoryId].listQuestions[index][
                                                listId
                                              ][quesId]
                                            }
                                          />
                                        </Col>
                                      </Row>
                                    );
                                  }

                                  return (
                                    <>
                                      <div
                                        key={quesId}
                                        style={{ minHeight: '48px' }}
                                        className={
                                          ques?.unit === 'bao/ngày' || ques?.unit === 'năm'
                                            ? 'cell half-width'
                                            : 'cell full-width'
                                        }
                                      >
                                        <div className="full-width">
                                          <CustomInput
                                            quesId={quesId}
                                            ques={ques}
                                            index={index}
                                            categoryId={categoryId}
                                            listId={listId}
                                            CANCER={CANCER}
                                            templateInfo={
                                              CANCER.generalInfo[categoryId].listQuestions[index][
                                                listId
                                              ][quesId]
                                            }
                                          />
                                        </div>
                                      </div>
                                      {ques?.unit === 'bao/ngày' && ' x '}
                                    </>
                                  );
                                })}{' '}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
          <div className={current !== 'assessment_response_treatment' ? 'none' : ''}>
            <h4>VII{'>'} ĐÁNH GIÁ ĐÁP ỨNG ĐIỀU TRỊ </h4>
            <div>
              Xét nghiệm sau điều trị:
              <table>
                <thead>
                  <tr>
                    <th>Thời gian sau sử dụng hóa chất</th>
                    <th>CEA</th>
                    <th>CA 19-9</th>
                    <th>Hóa chất</th>
                    <th>CLVT</th>
                    <th>Tác dụng phụ</th>
                    <th>
                      Cơ quan di căn mới*
                      <br />
                      0. Không 1. Có (ghi rõ)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CANCER.responeToTreatment.map((res, resId) => {
                    return (
                      <tr key={resId}>
                        {res.map((ques, quesId) => {
                          return (
                            <td key={quesId}>
                              <CustomInput
                                quesId={quesId}
                                ques={ques}
                                CANCER={CANCER}
                                templateInfo={ques}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p>
                *Cơ quan di căn mới xuất hiện trong thời gian theo dõi (bằng các phương tiện chẩn
                đoán hình ảnh)
              </p>
              {CANCER.assessmentResponseTreatment.listQuestions.map((ques, quesId) => {
                return (
                  <Row key={quesId} gutter={[16, 40]} style={{ marginTop: '8px' }}>
                    <Col span={8}> {ques?.question}</Col>
                    <Col span={16}>
                      <CustomInput quesId={quesId} ques={ques} />
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
          <div className={current !== 'gen_test' ? 'none' : ''}>
            <h4>VIII{'>'} THÔNG TIN XÉT NGHIỆM DI TRUYỀN</h4>
            <GenTestForm form={genTestForm} cancer={CANCER} />

            <h5>Kết luận</h5>
            <CustomInput ques={CANCER.otherInfo.genTestResult.conclude} />
          </div>
          <ControlButton link={CANCER.typeHealthRecord} handleSubmit={handleSubmit} />
        </PageContainer>
      </div>
    </div>
  );
};
