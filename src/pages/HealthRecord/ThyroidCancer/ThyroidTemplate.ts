const THYROID: any = {
  typeHealthRecord: 'thyroid-record',

  generalInfo: [
    {
      name: 'II> TIỀN SỬ',
      key: 'medical_history',
      listQuestions: [
        [
          [
            {
              question: 'Bệnh lý về tuyến giáp (trước khi được chẩn đoán ung thư tuyến giáp):',
              type: 'none',
              key: 'benh_ly_ve_tuyen_giap_truoc_khi_duoc_chan_doan_ung_thu_tuyen_giap',
            },
          ],
          [
            {
              listChoice: [
                'Bướu giáp lành tính',
                'Bướu nhân độc tuyến giáp',
                'Basedow',
                'Suy giáp',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Các bệnh khác (nếu có, ghi rõ)',
              type: 'none',
              key: 'cac_benh_khac_neu_co_ghi_ro',
            },
          ],
          [
            {
              question: '',
              unit: '',
              type: 'text',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Tiếp xúc với độc tố/hóa chất:',
              type: 'none',
              key: 'tiep_xuc_voi_doc_to_hoa_chat',
            },
          ],
          [
            {
              question: 'Loại hóa chất:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'loai_hoa_chat',
            },
            {
              question: 'Thời gian tiếp xúc:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'thoi_gian_tiep_xuc',
            },
          ],
        ],
        [
          [
            {
              question: 'Tiền sử tia xạ đầu cổ:',
              type: 'none',
              key: 'tien_su_tia_xa_dau_co',
            },
          ],
          [
            {
              listChoice: ['Không', 'Có'],
              type: 'radio',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Tiền sử gia đình (Cha, mẹ, anh chị em ruột):',
              type: 'none',
              key: 'tien_su_gia_dinh_cha_me_anh_chi_em_ruot',
            },
          ],
          [
            {
              listChoice: [
                'Ung thư tuyến giáp',
                'Bệnh đa bướu nội tiết',
                'Hội chứng Pendred',
                'Hội chứng Gardner',
                'Hội chứng Cowden',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false],
              key: '',
            },
          ],
        ],
      ],
    },
    {
      name: 'III> BỆNH SỬ (*từ khi phát hiện bệnh đến ngày bắt đầu theo dõi BN)',
      key: 'disease_history',
      listQuestions: [
        [
          [
            {
              question: 'Năm chẩn đoán bệnh lần đầu',
              type: 'none',
              key: 'nam_chan_doan_benh_lan_dau',
            },
          ],
          [
            {
              question: '',
              unit: '',
              type: 'date',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Năm phát hiện di căn (VD: 2023):',
              type: 'none',
              key: 'nam_phat_hien_di_can_vd_2023',
            },
          ],
          [
            {
              question: '',
              unit: '',
              type: 'date',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Cơ quan di căn (nếu có)',
              type: 'none',
              key: 'co_quan_di_can_neu_co',
            },
          ],
          [
            {
              listChoice: [
                'Vú',
                'Phổi',
                'Thận',
                'Hạch xa (hạch thượng đòn trái, …)',
                'Da',
                'Gan',
                'Lách',
                'Não',
                'Buồng trứng',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Phương pháp điều trị đã sử dụng:',
              type: 'none',
              key: 'phuong_phap_dieu_tri_da_su_dung',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Phẫu thuật cắt tuyến giáp:'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Năm:',
              unit: '',
              type: 'date',
              answer: '',
              key: 'nam',
            },
            {
              question: 'Với u giáp:',
              listChoice: ['Cắt giáp toàn bộ', 'Cắt giáp bán phần'],
              type: 'radio',
              answer: '',
              key: 'voi_u_giap',
            },
            {
              question: 'Với hạch cổ:',
              unit: '',
              type: '',
              answer: '',
              key: 'voi_hach_co',
            },
            {
              listChoice: [
                'Vét hạch cổ nhóm VI dự phòng',
                'Vét hạch cổ nhóm hạch có bằng chứng di căn',
                'Vét hạch cổ triệt căn còn khả năng phẫu thuật',
              ],
              type: 'radio',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xạ trị I131:'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Năm:',
              unit: '',
              type: 'date',
              answer: '',
              key: 'nam',
            },
            {
              question: 'Số liều',
              type: 'text',
              answer: '',
              key: 'so_lieu',
            },
            {
              question: 'Liều lần 1:',
              unit: 'mCi',
              type: 'text',
              answer: '',
              key: 'lieu_lan_1',
            },
            {
              question: 'Liều lần 2:',
              unit: 'mCi',
              type: 'text',
              answer: '',
              key: 'lieu_lan_2',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Liệu pháp hormon thay thế:'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Tên thuốc:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'ten_thuoc',
            },
            {
              prefix: 'Liều lượng:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'lieu_luong',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xạ trị chiếu ngoài'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Liều xạ:',
              unit: 'Gy',
              type: 'text',
              answer: '',
              key: 'lieu_xa',
            },
          ],
        ],
        [
          [
            {
              question: 'Điều trị khác (nếu có, ghi rõ):',
              type: 'none',
              key: 'dieu_tri_khac_neu_co_ghi_ro',
            },
          ],
          [
            {
              question: '',
              unit: '',
              type: 'textarea',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Hóa chất'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Doxorubicin',
                'Paclitaxel',
                'Docetaxel',
                'Cisplatin',
                'Carboplatin',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Thuốc điều trị đích:'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Sorafenib (Nexavar)',
                'Lenvatinib (Lenvima)',
                'Vandetanib',
                'Cabozantinib (Cabometyx)',
                'Dabrafenib',
                'Pralsetinib',
                'Trametinib',
                'Thuốc khác (Nếu có, ghi rõ)',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false, false],
              key: '',
            },
            {
              question: 'Thời gian sử dụng (VD: 2 tháng):',
              unit: '',
              type: 'text',
              answer: '',
              key: 'thoi_gian_su_dung_vd_2_thang',
            },
            {
              question: 'Liều lượng',
              unit: 'mg/ngày',
              type: 'text',
              answer: '',
              key: 'lieu_luong',
            },
          ],
        ],
      ],
    },
    {
      name: 'IV> KHÁM LÂM SÀNG (*ngay trước điều trị hoá chất)',
      key: 'clinical_examination',
      listQuestions: [
        [
          [
            {
              question: 'Cân nặng',
              type: 'none',
              key: 'can_nang',
            },
          ],
          [
            {
              question: '',
              unit: 'kg',
              type: 'text',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Chiều cao:',
              type: 'none',
              key: 'chieu_cao',
            },
          ],
          [
            {
              question: '',
              unit: 'cm',
              type: 'text',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Triệu chứng lâm sàng',
              type: 'title',
              key: 'trieu_chung_lam_sang',
            },
          ],
        ],
        [
          [
            {
              question: 'Nuốt nghẹn',
              type: 'none',
              key: 'nuot_nghen',
            },
          ],
          [
            {
              listChoice: ['Không', 'Có'],
              type: 'radio',
              horizontal: true,
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Khàn tiếng',
              type: 'none',
              key: 'khan_tieng',
            },
          ],
          [
            {
              listChoice: ['Không', 'Có'],
              type: 'radio',
              horizontal: true,
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Khó thở',
              type: 'none',
              key: 'kho_tho',
            },
          ],
          [
            {
              listChoice: ['Không', 'Có'],
              type: 'radio',
              horizontal: true,
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Tuyến giáp',
              type: 'none',
              key: 'tuyen_giap',
            },
          ],
          [
            {
              listChoice: [
                '0: K có bướu giáp',
                'IA: Không nhìn thấy bướu tư thế bình thường. Sờ thấy bướu, mỗi thùy tuyến giáp to hơn 1 đốt ngón cái của BN',
                'IB: Nhìn thấy bướu giáp to khi ngửa đầu ra sau tối đa. Sờ thấy bướu',
                'II: Nhìn thấy bướu tư thế bình thường. Tuyến giáp to, nhìn thấy khi đầu ở tư thế bt và ở gần',
                'III: Bướu giáp rất lớn, nhìn thấy rõ từ xa. Bướu lớn làm biến dạng cổ',
              ],
              answer: 'radio',
              type: 'radio',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Nhân tuyến giáp',
              type: 'none',
              key: 'nhan_tuyen_giap',
            },
          ],
          [
            {
              prefix: 'Số Lượng:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'so_luong',
            },
            {
              question: 'Vị trí',
              listChoice: ['Thùy trái', 'Thùy phải', 'Eo tuyến giáp'],
              answer: [false, false, false],
              type: 'checkbox',
              key: 'vi_tri',
            },
            {
              question: 'Mật độ:',
              type: 'none',
              key: 'mat_do',
            },
            {
              question: 'Mật độ:',
              listChoice: ['Chắc', 'Mềm'],
              answer: '',
              type: 'radio',
              horizontal: true,
              key: 'mat_do',
            },
            {
              question: 'Di động theo nhịp nuốt:',
              listChoice: ['Không', 'Có'],
              answer: '',
              type: 'radio',
              horizontal: true,
              key: 'di_dong_theo_nhip_nuot',
            },
            {
              question: 'Tính chất đau:',
              listChoice: ['Không', 'Có'],
              answer: '',
              type: 'radio',
              horizontal: true,
              key: 'tinh_chat_dau',
            },
          ],
        ],
        [
          [
            {
              question: 'Hạch cổ',
              type: 'none',
              key: 'hach_co',
            },
          ],
          [
            {
              prefix: 'Số Lượng:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'so_luong',
            },
            {
              question: 'Vị trí',
              listChoice: [
                'Hạch khoang trung tâm ',
                'Hạch khoang bên trái ',
                'Hạch khoang bên phải',
              ],
              answer: [false, false, false],
              type: 'checkbox',
              key: 'vi_tri',
            },
          ],
        ],
        [
          [
            {
              question: 'Triệu chứng khác (nếu có, ghi rõ)',
              type: 'none',
              key: 'trieu_chung_khac_neu_co_ghi_ro',
            },
          ],
          [
            {
              question: '',
              unit: '',
              type: 'text',
              answer: '',
              key: '',
            },
          ],
        ],
      ],
    },
    {
      name: 'V>CẬN LÂM SÀNG',
      key: 'subclinical',
      listQuestions: [
        [
          [
            {
              question: 'Xét nghiệm máu',
              type: 'title',
              key: 'xet_nghiem_mau',
            },
          ],
        ],
        [
          [
            {
              question: 'Hồng cầu(RBC)',
              type: 'none',
              key: 'hong_cau_rbc',
            },
          ],
          [
            {
              unit: 'T/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Hb',
              type: 'none',
              key: 'hb',
            },
          ],
          [
            {
              unit: 'g/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Bạch cầu(WBC)',
              type: 'none',
              key: 'bach_cau_wbc',
            },
          ],
          [
            {
              unit: 'G/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Bạch cầu đa nhân trung tính',
              type: 'none',
              key: 'bach_cau_da_nhan_trung_tinh',
            },
          ],
          [
            {
              unit: 'G/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Tiểu cầu',
              type: 'none',
              key: 'tieu_cau',
            },
          ],
          [
            {
              unit: 'G/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'PT%',
              type: 'none',
              key: 'pt',
            },
          ],
          [
            {
              unit: '%',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'INR',
              type: 'none',
              key: 'inr',
            },
          ],
          [
            {
              unit: 'none',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'APTT b/c',
              type: 'none',
              key: 'aptt_b_c',
            },
          ],
          [
            {
              unit: 'none',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Bilirubin toàn phần',
              type: 'none',
              key: 'bilirubin_toan_phan',
            },
          ],
          [
            {
              unit: 'μmol/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Bilirubin trực tiếp',
              type: 'none',
              key: 'bilirubin_truc_tiep',
            },
          ],
          [
            {
              unit: 'μmol/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Albumin',
              type: 'none',
              key: 'albumin',
            },
          ],
          [
            {
              unit: 'g/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'ALT',
              type: 'none',
              key: 'alt',
            },
          ],
          [
            {
              unit: 'UI/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'AST',
              type: 'none',
              key: 'ast',
            },
          ],
          [
            {
              unit: 'UI/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Ure',
              type: 'none',
              key: 'ure',
            },
          ],
          [
            {
              unit: 'mmol/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Creatinine',
              type: 'none',
              key: 'creatinine',
            },
          ],
          [
            {
              unit: 'mmol/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Chức năng tuyến giáp:',
              type: 'title',
              key: 'chuc_nang_tuyen_giap',
            },
          ],
        ],
        [
          [
            {
              question: 'FT3',
              type: 'none',
              key: 'ft3',
            },
            {
              question: 'FT4',
              type: 'none',
              key: 'ft4',
            },
            {
              question: 'TSH',
              type: 'none',
              key: 'tsh',
            },
            {
              question: 'Thyroglobulin (Tg)',
              type: 'none',
              key: 'thyroglobulin_tg',
            },
            {
              question: 'Calcitonin',
              type: 'none',
              key: 'calcitonin',
            },
            {
              question: 'TPO-Ab',
              type: 'none',
              key: 'tpo_ab',
            },
            {
              question: 'TRAb',
              type: 'none',
              key: 'trab',
            },
            {
              question: 'Anti - Tg',
              type: 'none',
              key: 'anti_tg',
            },
          ],
          [
            {
              unit: 'pmol/L',
              type: 'text',
              key: '',
            },
            {
              unit: 'pmol/L',
              type: 'text',
              key: '',
            },
            {
              unit: 'uIU/mL',
              type: 'text',
              key: '',
            },
            {
              unit: 'ng/mL',
              type: 'text',
              key: '',
            },
            {
              unit: 'pg/mL',
              type: 'text',
              key: '',
            },
            {
              unit: 'IU/mL',
              type: 'text',
              key: '',
            },
            {
              unit: 'UI/mL',
              type: 'text',
              key: '',
            },
            {
              unit: 'UI/mL',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Marker UT',
              type: 'none',
              key: 'marker_ut',
            },
          ],
          [
            {
              prefix: 'CEA (Antigene-carcino-embryonnaire): ',
              type: 'text',
              unit: 'ng/mL',
              answer: '',
              key: 'cea_antigene_carcino_embryonnaire',
            },
          ],
        ],
        [
          [
            {
              question: 'Siêu âm vùng cổ:',
              type: 'title',
              key: 'sieu_am_vung_co',
            },
          ],
        ],
        [
          [
            {
              question: 'Tổng số nhân tuyến giáp:',
              type: 'text',
              answer: '',
              key: 'tong_so_nhan_tuyen_giap',
            },
            {
              body: [
                [
                  {
                    type: 'text',
                  },
                  {
                    type: 'text',
                  },
                  {
                    type: 'text',
                  },
                  {
                    type: 'text',
                  },
                ],
              ],
              header: ['Nhân giáp thứ', 'Vị trí', 'Kích thước', 'Phân độ TIRADS'],
              key: '',
            },
            {
              question: 'Hạch vùng cổ',
              type: 'title',
              key: 'hach_vung_co',
            },
            {
              prefix: 'Vị trí:',
              type: 'text',
              answer: '',
              key: 'vi_tri',
            },
            {
              prefix: 'Kích thước lớn nhất:',
              type: 'text',
              answer: '',
              key: 'kich_thuoc_lon_nhat',
            },
          ],
        ],
        [
          [
            {
              question: 'FNA (Chọc tế bào kim nhỏ):',
              type: 'title',
              key: 'fna_choc_te_bao_kim_nho',
            },
            {
              question: 'Phân nhóm Bethesda',
              listChoice: [
                'I: Không đủ điều kiện chẩn đoán ',
                'II: Lành tính',
                'III: Không điển hình có ý nghĩa chưa xác định (AUS)',
                'IV: U tuyến dạng nang/Nghi ngờ u tuyến dạng nang',
                'V: Nghi ngờ ác tính',
                'VI: Ác tính',
              ],
              type: 'radio',
              answer: '',
              key: 'phan_nhom_bethesda',
            },
          ],
        ],
        [
          [
            {
              question: 'Xạ hình tuyến giáp:',
              type: 'textarea',
              answer: '',
              key: 'xa_hinh_tuyen_giap',
            },
          ],
        ],
        [
          [
            {
              question: 'CT/MRI:',
              type: 'textarea',
              answer: '',
              key: 'ct_mri',
            },
          ],
        ],
        [
          [
            {
              question: 'Kết quả sinh thiết GPB:',
              type: 'none',
              key: 'ket_qua_sinh_thiet_gpb',
            },
          ],
          [
            {
              listChoice: [
                'UT biểu mô dạng nhú',
                'UT biểu mô dạng nang ',
                'UT tế bào Hurthle',
                'UT Tủy giáp trạng ',
                'UT biểu mô không biệt hóa',
                'Khác (Ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Phân loại TNM (Theo AJCC)',
              type: 'none',
              key: 'phan_loai_tnm_theo_ajcc',
            },
          ],
          [
            {
              prefix: 'T:',
              type: 'text',
              answer: '',
              key: 't',
            },
            {
              prefix: 'N:',
              type: 'text',
              answer: '',
              key: 'n',
            },
            {
              prefix: 'M:',
              type: 'text',
              answer: '',
              key: 'm',
            },
          ],
        ],
        [
          [
            {
              question: 'Đánh giá toàn trạng (PS) theo ECOG: (trước điều trị hoá chất)',
              listChoice: [
                'PS 0: Hoạt động bình thường',
                'PS 1: Bị hạn chế hoạt động nặng, nhưng đi lại được và làm được việc nhẹ',
                'PS 2: Đi lại được nhưng không làm được các việc, hoàn toàn chăm sóc được bản thân, phải nghỉ ngơi dưới 50% thời gian thức',
                'PS 3: Chỉ chăm sóc bản thân tối thiểu, phải nghỉ trên 50% thời gian',
                'PS 4: Mất khả năng chăm sóc bản thân và hoàn toàn nằm nghỉ tại giường hoặc ghế',
              ],
              type: 'radio',
              answer: '',
              key: 'danh_gia_toan_trang_ps_theo_ecog_truoc_dieu_tri_hoa_chat',
            },
          ],
        ],
      ],
    },
    {
      name: 'VI> PHƯƠNG PHÁP ĐIỀU TRỊ (*tính từ ngày bắt đầu theo dõi)',
      key: 'treatments',
      listQuestions: [
        [
          [
            {
              question: 'Thuốc điều trị đích:',
              type: 'none',
              key: 'thuoc_dieu_tri_dich',
            },
          ],
          [
            {
              listChoice: [
                'Sorafenib (Nexavar)',
                'Lenvatinib (Lenvima)',
                'Vandetanib',
                'Cabozantinib (Cabometyx)',
                'Dabrafenib',
                'Pralsetinib',
                'Trametinib',
                'Thuốc khác (Nếu có, ghi rõ)',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Phương pháp điều trị kết hợp:',
              type: 'title',
              key: 'phuong_phap_dieu_tri_ket_hop',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Phẫu thuật cắt tuyến giáp:'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Với u giáp:',
              listChoice: ['Cắt giáp toàn bộ', 'Cắt giáp bán phần'],
              type: 'checkbox',
              answer: [false, false],
              key: 'voi_u_giap',
            },
            {
              question: 'Với hạch cổ:',
              listChoice: [
                'Vét hạch cổ nhóm VI dự phòng',
                'Vét hạch cổ nhóm hạch có bằng chứng di căn',
                'Vét hạch cổ triệt căn còn khả năng phẫu thuật',
              ],
              type: 'checkbox',
              answer: [false, false, false],
              key: 'voi_hach_co',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xạ trị I131:'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Số liều:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'so_lieu',
            },
            {
              prefix: 'Liều lần 1:',
              unit: 'mCi',
              type: 'text',
              answer: '',
              key: 'lieu_lan_1',
            },
            {
              prefix: 'Liều lần 2:',
              unit: 'mCi',
              type: 'text',
              answer: '',
              key: 'lieu_lan_2',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Liệu pháp hormon thay thế:'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Tên thuốc:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'ten_thuoc',
            },
            {
              prefix: 'Liều lượng:',
              unit: '',
              type: 'text',
              answer: '',
              key: 'lieu_luong',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xạ trị chiếu ngoài'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Liều xạ:',
              unit: 'Gy',
              type: 'text',
              answer: '',
              key: 'lieu_xa',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Hóa chất'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Doxorubicin',
                'Paclitaxel',
                'Docetaxel',
                'Cisplatin',
                'Carboplatin',
                'Thuốc khác (Nếu có, ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Điều trị khác (nếu có, ghi rõ):',
              type: 'none',
              key: 'dieu_tri_khac_neu_co_ghi_ro',
            },
          ],
          [
            {
              question: '',
              unit: '',
              type: 'text',
              answer: '',
              key: '',
            },
          ],
        ],
      ],
    },
  ],
  clinicalSymptoms: {
    header: [],
    body: [
      [
        { question: 'Sau 3 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'text',
        },
      ],
      [
        { question: 'Sau 4 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'text',
        },
      ],
      [
        { question: 'Sau 6 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'text',
        },
      ],
      [
        { question: 'Sau 8 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'text',
        },
      ],
      [
        { question: 'Sau 10 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'text',
        },
      ],
      [
        { question: 'Sau 12 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [0, 1],
          answer: '',
        },
        {
          type: 'text',
        },
      ],
    ],
  },
  responeToTreatment: [
    [
      {
        question: 'Sau 2 tháng',
        type: 'none',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 4 tháng',
        type: 'none',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 6 tháng',
        type: 'none',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 8 tháng',
        type: 'none',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 10 tháng',
        type: 'none',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 12 tháng',
        type: 'none',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
      {
        type: 'text',
      },
    ],
  ],

  assessmentResponseTreatment: {
    name: '40.Theo dõi đáp ứng điều trị',
    listQuestions: [
      {
        question: 'Siêu âm vùng cổ:',
        type: 'text',
      },
      {
        question: 'Tổng số nhân tuyến giáp:',
        type: 'text',
      },
      {
        question: 'Hạch vùng cổ:',
        type: 'title',
      },
      {
        question: 'Tổng số hạch:',
        type: 'text',
      },
      {
        question: 'Vị trí:',
        type: 'text',
      },
      {
        question: 'Kích thước lớn nhất:',
        type: 'text',
      },
      {
        question: 'Xạ hình tuyến giáp/toàn thân: ',
        type: 'text',
      },
      {
        question: '-	CT/MRI',
        type: 'text',
      },
      {
        question: '-	PET/CT:',
        type: 'text',
      },
    ],

    postListQuestions: [
      {
        question: 'Tử vong trong 1 năm theo dõi ',
        type: 'radio',
        listChoice: ['Không', 'Có'],
        horizontal: true,
      },
      {
        question: 'Thời gian tử vong',
        type: 'date',
      },
      {
        question: 'Nguyên nhân (ghi rõ)',
        type: 'text',
        answer: '',
      },
    ],
  },

  genTest: {
    header: [
      'Gen',
      'Trình tự tham chiếu',
      'Biến thể',
      'Vị trí trên nhiễm sắc thể',
      'Kiểu gen',
      'Kiểu di truyền',
    ],
    body: [
      [
        {
          type: 'text',
          answer: '',
        },
        {
          type: 'text',
          answer: '',
        },
        {
          type: 'text',
          answer: '',
        },
        {
          type: 'text',
          answer: '',
        },
        {
          type: 'text',
          answer: '',
        },
        {
          type: 'text',
          answer: '',
        },
      ],
    ],
  },
  genTestResponseTreatment: {
    header: [
      'Gen',
      'Trình tự tham chiếu',
      'Biến thể',
      'Vị trí trên nhiễm sắc thể',
      'Nhạy cảm/Kháng thuốc đích',
      'Thuốc đích ảnh hưởng',
    ],
    body: [
      [
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
      ],
    ],
  },
  otherInfo: {
    bloodTest: [
      [
        {
          question: 'Sau 2 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
      ],
      [
        {
          question: 'Sau 4 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
      ],
      [
        {
          question: 'Sau 6 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
      ],
      [
        {
          question: 'Sau 8 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
      ],
      [
        {
          question: 'Sau 10 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
      ],
      [
        {
          question: 'Sau 12 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
        {
          type: 'text',
        },
      ],
    ],
    thyroidTable: {
      body: [
        [
          {
            type: 'text',
          },
          {
            type: 'text',
          },
          {
            type: 'text',
          },
          {
            type: 'text',
          },
        ],
      ],
      header: ['Nhân giáp thứ', 'Vị trí', 'Kích thước', 'Phân độ TIRADS'],
    },
  },
};
export default THYROID;
