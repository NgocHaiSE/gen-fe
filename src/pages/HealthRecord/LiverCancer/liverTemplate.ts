const LUNG: any = {
  typeHealthRecord: 'liver-record',

  generalInfo: [
    {
      name: 'II> TIỀN SỬ',
      key: 'medical_history',
      listQuestions: [
        [
          [
            {
              listChoice: ['Uống rượu'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              type: 'text',
              unit: 'ml/ngày',
              key: '',
            },
            {
              question: '',
              type: 'text',
              unit: 'năm',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xơ gan'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'date',
              prefix: 'Năm được chẩn đoán:',
              key: 'nam_duoc_chan_doan',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Viêm gan B'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'date',
              prefix: 'Năm chẩn đoán bệnh lần đầu',
              key: 'nam_chan_doan_benh_lan_dau',
            },
            {
              type: 'text',
              prefix: 'Định lượng HCV RNA (nếu có):',
              key: 'dinh_luong_hcv_rna_neu_co',
            },
            {
              question: '',
              type: 'text',
              prefix: 'Điều trị thuốc:',
              key: 'dieu_tri_thuoc',
            },
            {
              type: 'text',
              prefix: 'Tình trạng hiện tại:',
              key: 'tinh_trang_hien_tai',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Viêm gan C'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              type: 'text',
              prefix: 'Năm chẩn đoán:',
              key: 'nam_chan_doan',
            },
            {
              type: 'text',
              prefix: 'Định lượng HCV RNA (nếu có):',
              key: 'dinh_luong_hcv_rna_neu_co',
            },
            {
              type: 'text',
              prefix: 'Điều trị thuốc:',
              key: 'dieu_tri_thuoc',
            },
            {
              type: 'text',
              prefix: 'Tình trạng hiện tại:',
              key: 'tinh_trang_hien_tai',
            },
          ],
        ],
        [
          [
            {
              question: 'Các bệnh khác (nếu có, ghi rõ):',
              type: 'none',
              key: 'cac_benh_khac_neu_co_ghi_ro',
            },
          ],
          [
            {
              type: 'text',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Tiếp xúc với độc tố hoặc hoá chất'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Năm tiếp xúc:',
              type: 'date',
              answer: '',
              key: 'nam_tiep_xuc',
            },
            {
              prefix: 'Loại hoá chất:',
              type: 'text',
              answer: '',
              key: 'loai_hoa_chat',
            },
            {
              prefix: 'Thời gian tiếp xúc:',
              type: 'date',
              answer: '',
              key: 'thoi_gian_tiep_xuc',
            },
          ],
        ],
        [
          [
            {
              listChoice: [
                'Tiểu sử gia đình (xét người thân trong gia đình ít nhất 3 thế hệ) nhiễm viên gan (VGB, VGC) và ung thư biểu mô tế bào gan',
              ],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Quan hệ với bệnh nhân:',
              type: 'text',
              answer: '',
              key: 'quan_he_voi_benh_nhan',
            },
            {
              question: 'Các bệnh:',
              listChoice: ['VGB', 'VGC', 'Ung thư biểu mô tế bàn gan'],
              type: 'checkbox',
              answer: [false, false, false],
              key: 'cac_benh',
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
              question: 'Năm chẩn đoán bệnh lần đầu (VD: 2019)',
              type: 'date',
              key: 'nam_chan_doan_benh_lan_dau_vd_2019',
            },
          ],
        ],
        [
          [
            {
              question: 'Năm phát hiện di căn ngoài gan (nếu có)(VD: 2019)',
              type: 'date',
              key: 'nam_phat_hien_di_can_ngoai_gan_neu_co_vd_2019',
            },
          ],
        ],
        [
          [
            {
              question: 'Gầy sút cân \n(so với cân nặng trung bình trước khi phát hiện bệnh)',
              type: 'none',
              answer: '',
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
        [
          [
            {
              question: 'Phương pháp điều trị đã sử dụng',
              type: 'none',
              answer: '',
              key: 'phuong_phap_dieu_tri_da_su_dung',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Phẫu thuật'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              type: 'date',
              answer: '',
              prefix: 'Năm:',
              key: 'nam',
            },
            {
              question: '',
              prefix: 'Số phân thùy đã cắt:',
              type: 'text',
              answer: '',
              key: 'so_phan_thuy_da_cat',
            },
            {
              question: '',
              prefix: 'Thể tích gan còn lại (ước tính):',
              type: 'text',
              answer: '',
              key: 'the_tich_gan_con_lai_uoc_tinh',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Ghép gan'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Năm:',
              type: 'date',
              answer: '',
              key: 'nam',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Ghép gan'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Số lần:',
              type: 'text',
              answer: '',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Đốt sống cao tần (RF)'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Số lần:',
              type: 'text',
              answer: '',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Đốt vi sóng'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Số lần:',
              type: 'text',
              answer: '',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Tiêm cồn'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Số lần:',
              type: 'text',
              answer: '',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Nút mạch'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Số lần:',
              type: 'text',
              answer: '',
              key: 'so_lan',
            },
            {
              question: 'Hóa chất nút mạch:',
              listChoice: ['Không', 'Có'],
              type: 'radio',
              key: 'hoa_chat_nut_mach',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xạ trị chọn lọc ĐM gan (bằng Y-90)'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Số lần:',
              type: 'text',
              answer: '',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Truyền hoá chất qua động mạch gan (Cisplatin với 5FU liều thấp)'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Số lần:',
              type: 'text',
              answer: '',
              key: 'so_lan',
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
              question: '',
              prefix: 'Liều xạ',
              type: 'text',
              answer: '',
              key: 'lieu_xa',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Điều trị đích và điều trị miễn dịch'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Thuốc',
              listChoice: [
                'Sorafenib',
                'Lenvantinib',
                'Regorafenib',
                'Pembrolizumab',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false],
              key: 'thuoc',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Hoá trị'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Phác đồ',
              listChoice: ['Phác đồ PIAF', 'Phác đồ GEMOX', 'Phác đồ FOLFOX4', 'Khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: 'phac_do',
            },
          ],
          [
            {
              question: 'Số chu kì',
              type: 'none',
              key: 'so_chu_ki',
            },
            {
              question: '',
              unit: 'chu kì',
              type: 'text',
              answer: '',
              key: '',
            },
            {
              question: '',
              unit: 'chu kì',
              type: 'text',
              answer: '',
              key: '',
            },
            {
              question: '',
              unit: 'chu kì',
              type: 'text',
              answer: '',
              key: '',
            },
            {
              question: '',
              unit: 'chu kì',
              type: 'text',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Điều trị khác (nếu có, ghi rõ)'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              unit: '',
              type: 'text',
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
              listChoice: ['Đau hạ sườn phải (thang VAS: 0-10 điểm)'],
              type: 'checkbox',
              answer: '',
              key: '',
            },
          ],
          [
            {
              question: '',
              unit: '/10',
              type: 'text',
              answer: [false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Gan to'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Dưới bờ sườn',
              unit: 'cm',
              type: 'text',
              answer: '',
              key: 'duoi_bo_suon',
            },
            {
              question: 'Mật độ',
              listChoice: ['Mềm', 'Chắc'],
              type: 'radio',
              key: 'mat_do',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Vàng da'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              quesion: '',
              unit: '',
              type: 'none',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Tuần hoàn bàng hệ'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: '',
              prefix: 'Loại:',
              type: 'text',
              answer: '',
              key: 'loai',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Cổ chướng'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Mức độ',
              listChoice: ['Ít/Không', 'Vừa', 'Nhiều'],
              type: 'radio',
              key: 'muc_do',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Phù vị trí khác (chân, tràn dịch màng phổi, màng tim, mặt,...)'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              quesion: '',
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
              listChoice: ['Lách to'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              quesion: '',
              prefix: 'Độ',
              type: 'text',
              answer: '',
              key: 'do',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Đầy bụng, rối loạn tiêu hoá'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              quesion: '',
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
              listChoice: ['Chán ăn'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              quesion: '',
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
              listChoice: ['Mệt mỏi'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              quesion: '',
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
      name: 'V>CẬN LÂM SÀNG (TRƯỚC ĐIỀU TRỊ HOÁ CHẤT)',
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
              question: 'Miễn dịch',
              type: 'none',
              key: 'mien_dich',
            },
          ],
          [
            {
              question: 'HBsAg',
              listChoice: ['Âm tính', 'Dương tính'],
              type: 'radio',
              key: 'hbsag',
            },
            {
              question: 'Anti-HCV',
              listChoice: ['Âm tính', 'Dương tính'],
              type: 'radio',
              key: 'anti_hcv',
            },
          ],
        ],
        [
          [
            {
              question: 'Maker ung thư',
              type: 'none',
              key: 'maker_ung_thu',
            },
          ],
          [
            {
              prefix: 'AFP:',
              type: 'text',
              key: 'afp',
            },
            {
              prefix: 'AFP-L3:',
              type: 'text',
              key: 'afp_l3',
            },
            {
              prefix: 'PIVKA II (DCP)',
              type: 'text',
              key: 'pivka_ii_dcp',
            },
            {
              prefix: 'Marker khác (nếu có):',
              type: 'text',
              key: 'marker_khac_neu_co',
            },
          ],
        ],
        [
          [
            {
              question: 'Tải lượng virus (nếu có):',
              type: 'none',
              key: 'tai_luong_virus_neu_co',
            },
          ],
          [
            {
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Đánh giá Child Pugh (5-15 điểm)',
              type: 'none',
              key: 'danh_gia_child_pugh_5_15_diem',
            },
          ],
          [
            {
              type: 'text',
              unit: 'điểm',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Nội soi dạ dày TQ:',
              type: 'none',
              key: 'noi_soi_da_day_tq',
            },
          ],
          [
            {
              listChoice: ['Không', 'Độ 1', 'Độ 2', 'Độ 3'],
              type: 'radio',
              question: 'Giãn tĩnh mạch TQ (theo Hội Nội soi Nhật Bản)',
              key: 'gian_tinh_mach_tq_theo_hoi_noi_soi_nhat_ban',
            },
          ],
          [
            {
              listChoice: ['Không', 'Độ 1', 'Độ 2', 'Độ 3'],
              type: 'radio',
              question: 'Giãn tĩnh mạch phình vị',
              key: 'gian_tinh_mach_phinh_vi',
            },
          ],
        ],
        [
          [
            {
              question:
                'Kết quả chẩn đoán hình ảnh (ưu tiên kết quả cận lâm sàng có giá trị lớn nhất)',
              type: 'none',
              key: 'ket_qua_chan_doan_hinh_anh_uu_tien_ket_qua_can_lam_sang_co_gia_tri_lon_nhat',
            },
            {
              question: 'Loại kết quả hình ảnh:',
              type: 'radio',
              listChoice: ['Siêu âm', 'CT/Cắt lớp vi tính', 'MRI/Cộng hưởng từ'],
              key: 'loai_ket_qua_hinh_anh',
            },
            {
              prefix: 'Tổng số khối u gan:',
              type: 'text',
              key: 'tong_so_khoi_u_gan',
            },
            {
              type: 'table',
              header: ['Khối thứ', 'vị trí', 'Kích thước'],
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
                ],
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
                ],
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
                ],
              ],
              key: '',
            },
            {
              question: 'Huyết khối TM chủ',
              listChoice: ['Không', 'Có'],
              horizontal: true,
              type: 'radio',
              key: 'huyet_khoi_tm_chu',
            },
            {
              question: 'Xâm lấn TM chủ/ TM trên gan',
              listChoice: ['Không', 'Có'],
              type: 'radio',
              horizontal: true,
              answer: [false, false],
              key: 'xam_lan_tm_chu_tm_tren_gan',
            },
            {
              question: 'Cơ quan có di căn',
              listChoice: ['Không', 'Phổi', 'Xương', 'Hạch', 'Não', 'Khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false, false, false],
              key: 'co_quan_co_di_can',
            },
          ],
        ],
        [
          [
            {
              question: 'Kết quả sinh thiết (nếu có):',
              type: 'textarea',
              key: 'ket_qua_sinh_thiet_neu_co',
            },
          ],
        ],
        [
          [
            {
              question: 'Kết quả chẩn đoán lâm sàng trước điều trị hoá chất',
              type: 'title',
              key: 'ket_qua_chan_doan_lam_sang_truoc_dieu_tri_hoa_chat',
            },
          ],
        ],
        [
          [
            {
              question: 'Giai đoạn HCC theo phân loại Barcelona',
              type: 'none',
              key: 'giai_doan_hcc_theo_phan_loai_barcelona',
            },
          ],
          [
            {
              listChoice: ['Rất Sớm (0)', 'Sớm (A)', 'Tiến triển (B)', 'Muộn (C)', 'Cuối (D)'],
              type: 'radio',
              key: '',
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
              question: 'Phương pháp điều trị',
              type: 'title',
              key: 'phuong_phap_dieu_tri',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Phẫu thuật'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              prefix: 'Số phân thùy cắt:',
              key: 'so_phan_thuy_cat',
            },
            {
              type: 'text',
              prefix: 'Thể tích gan còn lại (ước tính):',
              key: 'the_tich_gan_con_lai_uoc_tinh',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              answer: [false],
              listChoice: ['Ghép gan'],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Đốt sóng cao tần(RF)'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              prefix: 'Số lần:',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Đốt vi sóng (MWA)'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              prefix: 'Số lần:',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Tiêm cồn'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              prefix: 'Số lần:',
              key: 'so_lan',
            },
            {
              type: 'radio',
              question: 'Hóa chất nút mạch',
              listChoice: ['Không', 'Có'],
              horizontal: true,
              key: 'hoa_chat_nut_mach',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Tiêm cồn'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              prefix: 'Số lần:',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Xạ trị chọn lọc ĐM gan (bằng Y-90)'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              prefix: 'Số lần:',
              key: 'so_lan',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Truyền hoá chất qua động mạch gan (Cisplatin với 5FU liều thấp)'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              prefix: 'Liều xạ:',
              key: 'lieu_xa',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Phác đồ hoá chất sử dụng'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'checkbox',
              listChoice: ['Phác đồ PIAF', 'Phác đồ GEMOX', 'Phác đồ FOLFOX 4', 'Khác (ghi rõ):'],
              answer: [false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Thuốc kháng virus viêm gan (nếu có)'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              type: 'checkbox',
              listChoice: ['Điều trị khác (nếu có, ghi rõ)'],
              answer: [false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Điều trị đích và điều trị miễn dịch',
              listChoice: [
                'Sorafenib',
                'Lenvatinib',
                'Regorafenib',
                'Cabozantinib',
                'Pembrolizumab',
                'Atezolizmab',
                'Bevacizumab',
                'Nivolumab',
                'Ramucirumab',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false, false, false, false],
              key: 'dieu_tri_dich_va_dieu_tri_mien_dich',
            },
          ],
        ],
      ],
    },
  ],

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

  assessmentResponseTreatment: {
    listQuestions: [
      {
        question: 'Tử vong trong 05 năm theo dõi(kể từ ngày bắt đầu theo dõi)',
        type: 'radio',
        listChoice: ['Không', 'Có'],
        answer: '',
        horizontal: true,
      },
      {
        question: 'Thời gian tử vong ',
        type: 'date',
      },
      {
        question: 'Nguyên nhân (ghi rõ)',
        type: 'text',

        answer: '',
      },
    ],
  },
  otherInfo: {
    responseToTreatmentRECIST: [
      [
        {
          question: ' Sau 1 tháng',
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
          question: ' Sau 3 tháng',
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
          question: ' Sau 6 tháng',
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
          question: ' Sau 1 tháng',
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
          question: ' Sau 9 tháng',
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
          question: ' Sau 12 tháng',
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
          question: ' Sau 18 tháng',
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
          question: ' Sau 24 tháng',
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
          question: ' Sau 30 tháng',
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
          question: ' Sau 36 tháng',
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
  },
};
export default LUNG;
