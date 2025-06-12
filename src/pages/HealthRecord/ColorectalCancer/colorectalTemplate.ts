const COLORECTAL: any = {
  typeHealthRecord: 'colorectal-record',

  generalInfo: [
    {
      name: 'II> TIỀN SỬ',
      key: 'medical_history',
      listQuestions: [
        [
          [
            {
              listChoice: ['Nguy cơ dinh dưỡng bất thường'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Ăn ít chất xơ <20g/ngày (tương đương <400g rau/ngày)',
                'Ăn nhiều thịt đỏ (thịt bò, thịt lợn, …) >300g/tuần',
                'Ăn nhiều đồ ăn dầu mỡ, chiên rán, thực phẩm chế biến sẵn',
              ],
              type: 'checkbox',
              answer: [false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: [' Nguy cơ lối sống'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: ['Thuốc lá', 'Rượu bia'],
              type: 'checkbox',
              answer: [false, false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              unit: 'bao/ngày',
              key: '',
            },
            {
              type: 'text',
              unit: 'năm',
              key: '',
            },
            {
              type: 'text',
              unit: 'bao/ngày',
              key: '',
            },
            {
              type: 'text',
              unit: 'năm',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Nguy cơ bệnh lý tiền ung thư'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Polyp đại - trực tràng',
                'Viêm loét đại trực tràng chảy máu ',
                'Bệnh Crohn',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: [
                'Nguy cơ bệnh lý gia đình di truyền (cha mẹ, anh chị em ruột mắc các hội chứng di truyền và ung thư đại trực tràng)',
              ],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Tiền sử gia đình có các hội chứng/bệnh sau',
              listChoice: [
                'Ung thư đại trực tràng',
                'Bệnh đa polyp đại - trực tràng gia đình',
                'HC ung thư đại -- trực tràng di truyền không polyp (HC Lynch)',
                'HC Peutz-Jeghers',
                'HC Gardner',
                'HC Turcot',
                'HC Polyp Juvenile',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false, false],
              key: 'tien_su_gia_dinh_co_cac_hoi_chung_benh_sau',
            },
          ],
        ],
        [
          [
            {
              listChoice: [
                'Sử dụng ít nhất 1 trong 2 phương pháp sàng lọc ung thư đại - trực tràng sau',
              ],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Xét nghiệm máu ẩn trong phân',
                'Nội soi đại trực tràng',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false],
              key: '',
            },
          ],
        ],
      ],
    },
    {
      name: 'III> BỆNH SỬ ',
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
              type: 'text',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Vị trí:',
              type: 'none',
              key: 'vi_tri',
            },
          ],
          [
            {
              listChoice: [
                'Đại tràng phải ',
                'Đại tràng ngang',
                'Đại tràng trái',
                'Đại tràng sigma',
                'Trực tràng cao',
                'Trực tràng trung bình',
                'Trực tràng thấp',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false,false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Đánh giá giai đoạn theo TNM',
              type: 'none',
              answer: '',
              key: 'danh_gia_giai_doan_theo_tnm',
            },
          ],
          [
            {
              type: 'text',
              answer: '',
              question: 'T',
              key: 't',
            },
            {
              type: 'text',
              answer: '',
              question: 'N',
              key: 'n',
            },
            {
              type: 'text',
              answer: '',
              question: 'M',
              key: 'm',
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
                'Gan',
                'Phổi',
                'Phúc mạc',
                'Hạch xa (hạch thượng đòn trái, …)',
                'Xương ',
                'Lách',
                'Não',
                'Buồng trứng',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Biến chứng',
              type: 'none',
              key: 'bien_chung',
            },
          ],
          [
            {
              listChoice: ['Tắc ruột', 'Vỡ u', 'Xuất huyết tiêu hóa', 'Khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Thể giải phẫu bệnh. Mức độ biệt hóa: 1. Thấp 2. Vừa 3. Cao',
              type: 'none',
              key: 'the_giai_phau_benh_muc_do_biet_hoa_1_thap_2_vua_3_cao',
            },
          ],
          [
            {
              listChoice: [
                'Ung thư biểu mô tuyến',
                'Ung thư biểu mô chế nhầy',
                'Ung thư sarcoma',
                'Khác (ghi rõ):'
              ],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
            {
              type: 'text',
              question: 'Mức độ biệt hóa',
              key: 'muc_do_biet_hoa',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Gầy sút cân *(so với cân nặng trung bình trước khi phát hiện bệnh)'],
              type: 'checkbox',
              answer: [false],
              key: 'gay_sut_can_so_voi_can_nang_trung_binh_truoc_khi_phat_hien_benh',
            },
          ],
          [
            {
              type: 'text',
              answer: '',
              unit: 'kg',
              key: '',
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
              question: 'Chiều cao',
              type: 'none',
              key: 'chieu_cao',
            },
          ],
          [
            {
              unit: 'cm',
              type: 'text',
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
              listChoice: ['Đi ngoài phân nhầy máu thường xuyên > 3 tháng'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Đau bụng'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '  (thang VAS: 0-10 điểm)',
              unit: '/10',
              type: 'text',
              key: 'thang_vas_0_10_diem',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Rối loạn đại tiện'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Táo bón',
                'Tiêu chảy',
                'Kết hợp xen kẽ táo bón vào tiêu chảy',
                'Khác (ghi rõ):',
              ],
              answer: [false, false, false, false],
              type: 'checkbox',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Thay đổi tính chất phân'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Bảng phân loại Bristol',
              type: 'none',
              key: 'bang_phan_loai_bristol',
            },
            {
              type: 'checkbox',
              listChoice: ['Loại 1', 'Loại 2', 'Loại 3', 'Loại 4', 'Loại 5', 'Loại 6', 'Loại 7'],
              answer: [false, false, false, false, false, false, false],
              key: '',
            },
          ],
          [
            {
              question: '',
              type: 'none',
              key: '',
            },
            {
              unit: 'Từng cục rời rạc, cứng và rất khó ra',
              type: 'text',
              key: '',
            },
            {
              unit: 'Giống như xúc xích khô và lọn cợn',
              type: 'text',
              key: '',
            },
            {
              unit: 'Giống như xúc xích khô và nứt nẻ',
              type: 'text',
              key: '',
            },
            {
              unit: 'Giống như xúc xích hay con rấn, trơn tru và mềm',
              type: 'text',
              key: '',
            },
            {
              unit: 'Từng cục nhầy và mềm (rất dễ ra)',
              type: 'text',
              key: '',
            },
            {
              unit: 'Lợn cợn lầy nhầy',
              type: 'text',
              key: '',
            },
            {
              unit: 'Phân lỏng hoàn toàn',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Đánh giá toàn trạng (PS) theo ECOG: (trước điều trị hoá chất)',
              listChoice: [
                'PS 0: Hoạt động bình thường.',
                'PS 1: Bị hạn chế hoạt động nặng, nhưng đi lại được và làm được việc nhẹ. ',
                'PS 2: Đi lại được nhưng không làm được các việc, hoàn toàn chăm sóc được bản thân, phải nghỉ ngơi dưới 50% thời gian thức.',
                'PS 3: Chỉ chăm sóc bản thân tối thiểu, phải nghỉ trên 50% thời gian.',
                'PS 4: Mất khả năng chăm sóc bản thân và hoàn toàn nằm nghỉ tại giường hoặc ghế.',
              ],
              type: 'radio',
              key: 'danh_gia_toan_trang_ps_theo_ecog_truoc_dieu_tri_hoa_chat',
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
              question: 'Marker ung thư',
              type: 'none',
              key: 'marker_ung_thu',
            },
          ],
          [
            {
              question: 'CEA',
              type: 'text',
              unit: 'ng/mL',
              key: 'cea',
            },
            {
              question: 'CA 19-9',
              type: 'text',
              unit: 'ng/mL',
              key: 'ca_19_9',
            },
          ],
        ],
        [
          [
            {
              question: 'Nội soi đại tràng',
              type: 'none',
              key: 'noi_soi_dai_trang',
            },
          ],
        ],
        [
          [
            {
              question: 'Hình ảnh đại thể khối u:',
              listChoice: [
                'U loét',
                'U sùi',
                'U thể thâm nhiễm hay thể chai',
                'U thể chít hẹp, nghẹt',
                'U thể dưới niêm mạc',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false],
              key: 'hinh_anh_dai_the_khoi_u',
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
              question: 'Phương pháp điều trị(*tính từ ngày bắt đầu theo dõi)',
              type: 'title',
              key: 'phuong_phap_dieu_tri_bat_buoc',
            },
          ],
        ],
        [
          [
            {
              question: 'Phác đồ điều trị',
              type: '',
              key: 'phac_do_dieu_tri',
            },
          ],
          [
            {
              unit: '',
              type: 'text',
              key: '',
            },
          ],
        ],
                [
          [
            {
              listChoice: ['Thuốc đích(ghi rõ các loại thuốc)'],
              type: 'checkbox',
              answer: [false],
              key: 'thuoc_dich',
            },
          ],
          [
            {
              unit: '',
              type: 'text',
              key: '',
            },
          ],
        ],
      ],
    },
        {
      name: 'VII> ĐÁNH GIÁ ĐÁP ỨNG ĐIỀU TRỊ (*tính từ ngày bắt đầu theo dõi)',
      key: 'treatments2',
      listQuestions: [
        [
          [
            {
              question: 'Đánh giá đáp ứng',
              type: 'none',
              key: 'ly_do_dung_dieu_tri',
            },
          ],
          [
            {
              type: 'select',
              listChoice: ['Hoàn toàn (CR)','Tiến tiển (PD)','Một phần (PR)','Ổn định (SD)'],
              answer: '',
            },
          ],
        ],
        
        [
          [
            {
              question: 'Thời gian sống thêm toàn bộ (OS) ',
              type: 'none',
              key: 'thoi_gian_song_them_toan_bo',
            },
          ],
          [
            {
              unit: 'tháng',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: ' Thời gian tử vong',
              type: 'none',
              key: 'thoi_gian_tu_vong',
            },
          ],
          [
            {
              unit: '',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Nguyên nhân tử vong',
              type: 'none',
              key: 'nguyen_nhan_tu_vong',
            },
          ],
          [
            {
              unit: '',
              type: 'text',
              key: '',
            },
          ],
        ],
      ],
    },
  ],
  assessmentResponseTreatment: {
    listQuestions: [
      {
        question: 'Ghi chú',
        type: 'text',
      },
      {
        question: 'Đánh giá đáp ứng',
        type: 'radio',
        listChoice: ['Hoàn toàn(CR)', 'Một phần(PR)', 'Ổn định(SD)','Tiến triển(PD)'],
      },
      {
        question: 'Thời gian sống thêm toàn bộ(tháng)',
        type: 'text',
      },
      {
        question: 'Thời gian tử vong',
        type: 'date',
      },
      {
        question: 'Nguyên nhân tử vong',
        type: 'text',
        answer: '',
      },
    ],
  },

  clinicalSymptoms: {
    header: [
      'Thời gian sau sử dụng hóa chất',
      'PS*(1-5)',
      'Cân nặng',
      'Mức độ mệt mỏi',
      'Mức độ chán ăn/ nôn/ buồn nôn',
      'Mức độ đau bụng',
      'Mức độ đi ngoài ra nhầy máu',
    ],
    listQuestions: [
      [
        { question: 'Sau 3 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
      ],
      [
        { question: 'Sau 6 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
      ],
      [
        { question: 'Sau 9 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
      ],
      [
        { question: 'Sau 12 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
      ],
      [
        { question: 'Sau 15 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
      ],
      [
        { question: 'Sau 18 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
      ],
      [
        { question: 'Sau 21 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
      ],
      [
        { question: 'Sau 24 tháng', type: 'none' },
        {
          type: 'select',
          listChoice: [1, 2, 3, 4, 5],
          answer: '',
        },
        {
          type: 'text',
          unit: 'kg',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
        {
          type: 'select',
          listChoice: [1, 2, 3],
          answer: '',
        },
      ],
    ],
  },
  responeToTreatment: [
    [
      {
        question: 'Sau 3 tháng',
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
        type: 'select',
        listChoice: ['Không','Có'],
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
        type: 'select',
        listChoice: ['Không','Có'],
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 9 tháng',
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
        type: 'select',
        listChoice: ['Không','Có'],
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
        type: 'select',
        listChoice: ['Không','Có'],
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 15 tháng',
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
        type: 'select',
        listChoice: ['Không','Có'],
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 18 tháng',
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
        type: 'select',
        listChoice: ['Không','Có'],
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 21 tháng',
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
        type: 'select',
        listChoice: ['Không','Có'],
      },
      {
        type: 'text',
      },
    ],
    [
      {
        question: 'Sau 24 tháng',
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
        type: 'select',
        listChoice: ['Không','Có'],
      },
      {
        type: 'text',
      },
    ],
  ],

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
    genTestResult: {
      listQuestions: [
        {
          type: 'date',
          question: 'Ngày thực hiện xét nghiệm',
        },
        {
          type: 'text',
          question: 'Phương pháp xét nghiệm',
        },
        {
          type: 'text',
          question: 'Bộ hóa chất',
        },
      ],

      conclude: {
        type: 'text',
        question: 'Kết luận',
      },
    },
    CEA: [
      [
        {
          question: 'Sau 3 tháng',
          type: 'none',
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
      ],
      [
        {
          question: 'Sau 9 tháng',
          type: 'none',
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
      ],
      [
        {
          question: 'Sau 15 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
      ],
      [
        {
          question: 'Sau 18 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
      ],
      [
        {
          question: 'Sau 21 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
      ],
      [
        {
          question: 'Sau 24 tháng',
          type: 'none',
        },
        {
          type: 'text',
        },
      ],
    ],
  },
};
export default COLORECTAL;
