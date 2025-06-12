import HealthRecordService from '@/services/healthRecord';
import { PageContainer, PageLoading } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Col, Form, Menu, MenuProps, Row } from 'antd';
import { useEffect, useState } from 'react';
import ControlButton from '../ControlButton';
import CustomInput from '../CustomInput';
import CustomTable from '../CustomTable';
import GenTestForm from '../GenTestForm';
import listMenu from '../Menu';
import PatientInfo from '../PatientInfo';
import './breastCancer.css';
import BREAST from './BreastTemplate';

let CANCER = JSON.parse(JSON.stringify(BREAST));

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
      CANCER = JSON.parse(JSON.stringify(BREAST));
    }
    setLoading(false);
  }, []);

  const handleSubmit = async () => {
    const patientInfo = patientInfoForm.getFieldsValue();
    const genTestInfo = genTestForm.getFieldsValue();
    console.log('submit', patientInfo);
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

    // console.log("response", demo);
    // console.log(history)
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
            title: 'BỆNH ÁN UNG THƯ VÚ',
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
          {CANCER.generalInfo?.map((category, categoryId) => {
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
              <CustomTable record={CANCER.clinicalSymptoms} isAddRow={false} />
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
              <h4>Xét nghiệm sau điều trị hoá chất:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Thời gian sau sử dụng hóa chất</th>
                    <th>Hồng cầu(T/L)</th>
                    <th>Hb (g/L)</th>
                    <th>Bạch cầu (G/L)</th>
                    <th>Tiểu cầu (G/L)</th>
                    <th>
                      Khối u tái phát <br />
                      0. Không 1. Có
                    </th>
                    <th>
                      Cơ quan di căn mới* <br />
                      0. Không 1. Có (ghi rõ)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CANCER?.responeToTreatment?.map((res, resId) => {
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
              <h4>Marker</h4>
              <table>
                <thead>
                  <tr>
                    <th>Thời gian sau sử dụng hóa chất</th>
                    <th>Nồng độ CEA (ng/ml)</th>
                    <th>Nồng độ CA 15-3 (ng/ml)</th>
                    <th>Nồng độ CA 27-29 (ng/ml)</th>
                  </tr>
                </thead>
                <tbody>
                  {CANCER?.otherInfo?.marker?.map((res, resId) => {
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
            <h4>Số lượng u</h4>
            <CustomTable record={CANCER?.otherInfo?.tumor} isAddRow={false} />
            {CANCER?.assessmentResponseTreatment?.listQuestions.map((ques, quesId) => {
              return (
                <Row key={quesId} gutter={[16, 40]} style={{ marginTop: '8px' }}>
                  <Col span={6}> {ques?.question}</Col>
                  <Col span={8}>
                    <CustomInput quesId={quesId} ques={ques} />
                  </Col>
                </Row>
              );
            })}

            {CANCER?.assessmentResponseTreatment?.postListQuestions.map((ques, quesId) => {
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
