import HealthRecordService from '@/services/healthRecord';
import { PageContainer, PageLoading } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Col, Form, Menu, Row } from 'antd';
import { useEffect, useState } from 'react';
import ControlButton from '../ControlButton';
import CustomInput from '../CustomInput';
import CustomTable from '../CustomTable';
import GenTestForm from '../GenTestForm';
import listMenu from '../Menu';
import PatientInfo from '../PatientInfo';
import './thyroidCancer.css';
import THYROID from './ThyroidTemplate';
let CANCER = JSON.parse(JSON.stringify(THYROID));
export default () => {
  const [patientInfoForm] = Form.useForm();
  const [genTestForm] = Form.useForm();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('patient_info');

  const getHealthRecord = async (id, type) => {
    let data = await HealthRecordService.getHealthRecord(id, type);
    CANCER = data.data;
    patientInfoForm.setFieldsValue(CANCER.patientInfo);
    genTestForm.setFieldsValue(CANCER.genTestInfo);
  };

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
      CANCER = JSON.parse(JSON.stringify(THYROID));
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
            title: 'BỆNH ÁN NC- K GIÁP',
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

          {CANCER?.generalInfo?.map((category, categoryId) => {
            return (
              <div key={categoryId} className={current !== category.key ? 'none' : ''}>
                {/* {category.name.includes('IV> KHÁM LÂM SÀNG') && <h3>PHẦN 2:THEO DÕI BỆNH NHÂN</h3>} */}
                <h4 className="category-title">{category.name}</h4>
                <table>
                  <thead></thead>
                  <tbody>
                    {category.listQuestions?.map((item, index) => {
                      return (
                        <tr key={index}>
                          {/* <td style={{ width: "10px" }}>{index}</td> */}
                          {item?.map((listQuestion, listId) => {
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
                                {listQuestion?.map((ques, quesId) => {
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
            <h4>VII{'>'} ĐÁNH GIÁ ĐÁP ỨNG ĐIỀU TRỊ</h4>

            <div>
              <h4> Triệu chứng lâm sàng sau điều trị thuốc đích:</h4> Mức độ: 0. Không 1. Ít 2. Vừa
              3. Nhiều
              <table>
                <thead>
                  <tr>
                    <th>Thời gian sau sử dụng hóa chất</th>
                    <th>PS*(1-5)</th>
                    <th>Cân nặng</th>
                    <th>Mức độ mệt mỏi</th>
                    <th>Mức độ chán ăn</th>
                    <th>Mức độ nôn/buồn nôn</th>
                    <th>
                      Mẩn ngứa <br /> 0. Không 1. Có
                    </th>
                    <th>
                      Tiêu chảy <br /> 0. Không 1. Có
                    </th>
                    <th>Khác(Ghi rõ)</th>
                  </tr>
                </thead>
                <tbody>
                  {CANCER?.clinicalSymptoms?.body?.map((res, resId) => {
                    return (
                      <tr key={resId}>
                        {res.map((ques, quesId) => {
                          return (
                            <td key={quesId}>
                              <CustomInput quesId={quesId} ques={ques} />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              *Với PS là thang đánh giá toàn trạng (PS) theo ECOG
              <p>• PS 0: Hoạt động bình thường.</p>
              <p>• PS 1: Bị hạn chế hoạt động nặng, nhưng đi lại được và làm được việc nhẹ.</p>
              <p>
                • PS 2: Đi lại được nhưng không làm được các việc, hoàn toàn chăm sóc được bản thân,
                phải nghỉ ngơi dưới 50% thời gian thức.
              </p>
              <p>• PS 3: Chỉ chăm sóc bản thân tối thiểu, phải nghỉ trên 50% thời gian.</p>
              <p>
                • PS 4: Mất khả năng chăm sóc bản thân và hoàn toàn nằm nghỉ tại giường hoặc ghế.
              </p>
              <p>• PS 5: Bệnh nhân tử vong.</p>
              <h4>Xét nghiệm sau điều trị</h4>
              <table>
                <thead>
                  <tr>
                    <th>Thời gian sau sử dụng hóa chất</th>
                    <th>Hồng cầu(T/L)</th>
                    <th>Hb (g/L)</th>
                    <th>Bạch cầu (G/L)</th>
                    <th>Tiểu cầu (G/L)</th>
                    <th>AST/ALT (UI/L)</th>
                    <th>Ure (mmol/L)</th>
                    <th>Creatinin (umol/L)</th>
                  </tr>
                </thead>
                <tbody>
                  {CANCER.responeToTreatment.map((res, resId) => {
                    return (
                      <tr key={resId}>
                        {res.map((ques, quesId) => {
                          return (
                            <td key={quesId}>
                              <CustomInput quesId={quesId} ques={ques} />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h4>Theo dõi đáp ứng điều trị</h4>
              <table>
                <thead>
                  <tr>
                    {' '}
                    <th>Thời gian sau sử dụng hóa chất</th>
                    <th>FT3 (pmol/L)</th>
                    <th>FT4 (pmol/L)</th>
                    <th>TSH (uIU/mL)</th>
                    <th>Tg</th>
                    <th>Anti - Tg</th>
                    <th>Calcitonin</th>
                    <th>CEA</th>
                    <th>Ca2+</th>
                    <th>PTH</th>
                  </tr>
                </thead>
                <tbody>
                  {CANCER.otherInfo.bloodTest.map((res, resId) => {
                    return (
                      <tr key={resId}>
                        {res?.map((ques, quesId) => {
                          return (
                            <td key={quesId}>
                              <CustomInput quesId={quesId} ques={ques} templateInfo={ques} />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {CANCER.assessmentResponseTreatment.listQuestions.map((ques, quesId) => {
              return (
                <Row key={quesId} gutter={[16, 40]} style={{ marginTop: '8px' }}>
                  <Col span={6}> {ques?.question}</Col>
                  <Col span={8}>
                    <CustomInput quesId={quesId} ques={ques} />
                  </Col>
                </Row>
              );
            })}
            <CustomTable record={CANCER.otherInfo.thyroidTable}></CustomTable>
            {CANCER.assessmentResponseTreatment.postListQuestions.map((ques, quesId) => {
              return (
                <Row key={quesId} gutter={[16, 40]} style={{ marginTop: '8px' }}>
                  <Col span={6}> {ques?.question}</Col>
                  <Col span={8}>
                    <CustomInput quesId={quesId} ques={ques} />
                  </Col>
                </Row>
              );
            })}
          </div>
          <div className={current !== 'gen_test' ? 'none' : ''}>
            <h4>VIII{'>'} THÔNG TIN XÉT NGHIỆM DI TRUYỀN</h4>
            <GenTestForm form={genTestForm} cancer={CANCER} />
          </div>

          <ControlButton link={CANCER.typeHealthRecord} handleSubmit={handleSubmit} />
        </PageContainer>
      </div>
    </div>
  );
};
