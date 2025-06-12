const BREAST: any = {
  typeHealthRecord: 'breast-record',
  generalInfo: [
    {
      name: 'II> TIỀN SỬ',
      key: 'medical_history',
      listQuestions: [
        [
          [
            {
              question: 'Kinh nguyệt',
              type: 'none',
              key: 'kinh_nguyet',
            },
          ],
          [
            {
              question: 'Tuổi bắt đầu có kinh',
              type: 'text',
              key: 'tuoi_bat_dau_co_kinh',
            },
            {
              question: 'Tuổi mãn kinh(nếu có)',
              type: 'text',
              key: 'tuoi_man_kinh_neu_co',
            },
            {
              question: 'Chu kì kinh',
              listChoice: ['Không đều', 'Đều'],
              horizontal: true,
              type: 'radio',
              key: 'chu_ki_kinh',
            },
            {
              question: 'Độ dài một chu kì kinh nguyệt:',
              type: 'text',
              unit: 'ngày',
              key: 'do_dai_mot_chu_ki_kinh_nguyet',
            },
          ],
        ],
        [
          [
            {
              question: 'Sản khoa (nếu có)',
              type: 'none',
              key: 'san_khoa_neu_co',
            },
          ],
          [
            {
              question: 'Số lần mang thai đủ tháng',
              unit: '',
              type: 'text',
              answer: '',
              key: 'so_lan_mang_thai_du_thang',
            },
            {
              question: 'Số lần mang thai thiếu tháng',
              unit: '',
              type: 'text',
              answer: '',
              key: 'so_lan_mang_thai_thieu_thang',
            },
            {
              question: 'Số lần sảy/nạo phá thai',
              unit: '',
              type: 'text',
              answer: '',
              key: 'so_lan_say_nao_pha_thai',
            },
            {
              question: 'Cho con bú',
              listChoice: ['Không', 'Có'],
              type: 'radio',
              horizontal: true,
              key: 'cho_con_bu',
            },
            {
              question: 'Tuổi sinh con đầu lòng',
              type: 'text',
              key: 'tuoi_sinh_con_dau_long',
            },
          ],
        ],
        [
          [
            {
              question: 'Bệnh vú lành tính',
              type: 'none',
              key: 'benh_vu_lanh_tinh',
            },
          ],
          [
            {
              listChoice: [
                'Chưa từng mắc',
                'Xơ nang tuyến vú',
                'U xơ tuyến vú',
                'Viêm tuyến vú',
                'Áp xe vú',
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
              question: 'Bệnh kèm theo khác nếu có:',
              type: 'none',
              key: 'benh_kem_theo_khac_neu_co',
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
              question: 'Chế độ sinh hoạt',
              type: 'none',
              key: 'che_do_sinh_hoat',
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
              question: 'Mức độ vận động hàng ngày',
              type: 'none',
              key: 'muc_do_van_dong_hang_ngay',
            },
          ],
          [
            {
              listChoice: ['Không', 'Ít', 'Vừa', 'Nhiều'],
              type: 'radio',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Biện pháp tránh thai từng sử dụng',
              type: 'none',
              key: 'bien_phap_tranh_thai_tung_su_dung',
            },
          ],
          [
            {
              listChoice: [
                'Chưa từng sử dụng',
                'Dùng thuốc tránh thai chỉ chứa progesterone',
                'Dùng thuốc tránh thai hai thành phần',
                'Đặt vòng tránh thai chứa hormone',
                'Que cấy tránh thai',
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
              question: 'Tiếp xúc với yếu tố độc hại (hóa chất, tia xạ,… )',
              type: 'none',
              key: 'tiep_xuc_voi_yeu_to_doc_hai_hoa_chat_tia_xa_…',
            },
          ],
          [
            {
              listChoice: ['Không', 'Có'],
              horizontal: true,
              type: 'radio',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question:
                'Tiền sử gia đình di truyền (mẹ, chị em ruột mắc ung thư vú, ung thư buồng trứng)',
              type: 'none',
              key: 'tien_su_gia_dinh_di_truyen_me_chi_em_ruot_mac_ung_thu_vu_ung_thu_buong_trung',
            },
          ],
          [
            {
              type: 'text',
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
              question: 'Cơ quan di căn (nếu có)',
              type: 'none',
              key: 'co_quan_di_can_neu_co',
            },
          ],
          [
            {
              listChoice: ['Xương', 'Phổi', 'Não', 'Gan', 'Khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Gầy sút cân *(so với cân nặng trung bình trước khi phát hiện bệnh)',
              type: 'none',
              key: 'gay_sut_can_so_voi_can_nang_trung_binh_truoc_khi_phat_hien_benh',
            },
          ],
          [
            {
              type: 'text',
              unit: 'kg',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question:
                'Phương pháp điều trị đã sử dụng (*từ khi phát hiện bệnh đến ngày bắt đầu theo dõi BN)',
              type: 'none',
              key: 'phuong_phap_dieu_tri_da_su_dung_tu_khi_phat_hien_benh_den_ngay_bat_dau_theo_doi_bn',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Hóa trị tân bổ trợ'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Năm:',
              type: 'none',
              key: 'nam',
            },
            {
              listChoice: ['Phác đồ CMF', 'Phác đồ AC', 'Phác đồ ACF', 'khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
          ],
          [
            {
              unit: '',
              type: 'text',
              answer: '',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xạ trị tân bổ trợ'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Năm:',
              unit: '',
              type: 'date',
              answer: '',
              key: '',
            },
            {
              prefix: 'Liều xạ',
              type: 'text',
              answer: '',
              unit: 'Gy',
              key: '',
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
              prefix: 'Năm:',
              unit: '',
              type: 'text',
              answer: '',
              key: '',
            },
            {
              type: 'radio',
              listChoice: ['Bảo tồn', 'Cắt tuyến vú', 'Vét hạch nách', 'inh thiết hạch cửa'],
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Hóa trị bổ trợ'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              question: 'Năm:',
              type: 'none',
              key: 'nam',
            },
            {
              listChoice: ['Phác đồ CMF', 'Phác đồ AC', 'Phác đồ ACF', 'khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
          ],
          [
            {
              unit: '',
              type: 'text',
              answer: '',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xạ trị tân bổ trợ'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              prefix: 'Năm:',
              unit: '',
              type: 'date',
              answer: '',
              key: '',
            },
            {
              prefix: 'Liều xạ',
              type: 'text',
              answer: '',
              unit: 'Gy',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Điều trị nội tiết',
              type: 'none',
              key: 'dieu_tri_noi_tiet',
            },
          ],
          [
            {
              question: '',
              listChoice: [
                'Tamoxifen',
                'Chất ức chế aromatase',
                'Cắt buồng trứng (phẫu thuật, xạ trị, thuốc)',
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
              listChoice: ['Điều trị đích và điều trị miễn dịch'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Transtuzumab',
                'Pertuzumab',
                'T-DMT1',
                'Lapatimib',
                'Everolimus',
                'Bevacizumab',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false],
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
              type: 'textarea',
              answer: '',
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
              question: 'Đau vùng vú',
              type: 'none',
              key: 'dau_vung_vu',
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
              question: 'Chảy dịch đầu vú',
              type: 'none',
              key: 'chay_dich_dau_vu',
            },
          ],
          [
            {
              listChoice: ['Không', 'Dịch máu', 'Khác (ghi rõ):'],
              type: 'radio',
              answer: '',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'U cục vùng vú',
              type: 'none',
              key: 'u_cuc_vung_vu',
            },
          ],
          [
            {
              prefix: 'Số lượng u:',
              type: 'text',
              key: '',
            },
            {
              question: 'Vị trí: Vú T',
              listChoice: ['Trung tâm', 'Trên ngoài', 'Trên trong', 'Dưới trong', 'Dưới ngoài'],
              key: 'vi_tri',
              type: 'radio',
            },
            {
              question: 'Vị trí: Vú P',
              listChoice: ['Trung tâm', 'Trên ngoài', 'Trên trong', 'Dưới trong', 'Dưới ngoài'],
              key: 'vi_tri',
              type: 'radio',
            },
            {
              prefix: 'Kích thước lớn nhất',
              unit: 'cm',
              type: 'text',
              key: '',
            },
            {
              listChoice: ['Mềm', 'Chắc'],
              type: 'radio',
              horizontal: true,
              answer: '',
              question: 'Mật độ u:',
              key: 'mat_do_u',
            },
            {
              listChoice: ['Không', 'Có'],
              type: 'radio',
              horizontal: true,
              answer: '',
              question: 'Di động:',
              key: 'di_dong',
            },
            {
              listChoice: ['Không', 'Có'],
              type: 'radio',
              horizontal: true,
              answer: '',
              question: 'Dính da:',
              key: 'dinh_da',
            },
          ],
        ],
        [
          [
            {
              question: 'Hạch',
              type: 'none',
              key: 'hach',
            },
          ],
          [
            {
              prefix: 'Số lượng hạch:',
              type: 'number',
              key: '',
            },
            {
              question: 'Vị trí',
              listChoice: ['Hạch nách', 'Hạch vú trong', 'Hạch thượng đòn', 'Hạch cửa'],
              answer: [false, false, false, false],
              type: 'checkbox',
              key: 'vi_tri',
            },
          ],
        ],
        [
          [
            {
              question: 'Chán ăn, mệt mỏi',
              type: 'none',
              key: 'chan_an_met_moi',
            },
          ],
          [
            {
              listChoice: ['Không', 'Có'],
              answer: [false, false],
              type: 'radio',
              hirizontal: true,
              key: 'chan_an_met_moi',
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
              question: 'Calci máu',
              type: 'none',
              key: 'calci_mau',
            },
          ],
          [
            {
              unit: 'mol/L',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'ALP',
              type: 'none',
              key: 'alp',
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
              question: 'Progesterone',
              type: 'none',
              key: 'progesterone',
            },
          ],
          [
            {
              unit: 'ng/mL',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Estradiol',
              type: 'none',
              key: 'estradiol',
            },
          ],
          [
            {
              unit: 'ng/mL',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'FSH',
              type: 'none',
              key: 'fsh',
            },
          ],
          [
            {
              unit: 'mU/mL',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'β-HCG',
              type: 'none',
              key: 'β_hcg',
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
              question: 'Maker ung thư',
              type: 'none',
              key: 'maker_ung_thu',
            },
          ],
          [
            {
              prefix: 'CEA :',
              type: 'text',
              unit: 'ng/mL',
              key: '',
            },
            {
              prefix: 'CA 15-3:',
              type: 'text',
              unit: 'ng/mL',
              key: '',
            },
            {
              prefix: 'CA 27-29:',
              type: 'text',
              unit: 'ng/mL',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Hóa mô miễn dịch',
              type: 'title',
              key: 'hoa_mo_mien_dich',
            },
          ],
        ],
        [
          [
            {
              prefix: 'ER:',
              type: 'text',
              unit: 'điểm',
              key: '',
            },
          ],
          [
            {
              listChoice: ['Âm tính (≤ 10 điểm)', '11 – 199 điểm', '≥ 200 điểm'],
              type: 'radio',
              key: '',
            },
          ],
        ],
        [
          [
            {
              prefix: 'PR:',
              type: 'text',
              unit: 'điểm',
              key: '',
            },
          ],
          [
            {
              listChoice: ['Âm tính (≤ 10 điểm)', '11 – 199 điểm', '≥ 200 điểm'],
              type: 'radio',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'HER2',
              type: 'none',
              key: 'her2',
            },
          ],
          [
            {
              listChoice: ['0', '1+', '2+', '3+'],
              type: 'radio',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Khuếch đại HER2-FISH',
              type: 'none',
              key: 'khuech_dai_her2_fish',
            },
          ],
          [
            {
              type: 'radio',
              listChoice: ['Không', 'Có'],
              horizontal: true,
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Ki67',
              type: 'none',
              key: 'ki67',
            },
          ],
          [
            {
              type: 'number',
              unit: '%',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'p53',
              type: 'none',
              key: 'p53',
            },
          ],
          [
            {
              type: 'number',
              unit: '%',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Bcl2',
              type: 'none',
              key: 'bcl2',
            },
          ],
          [
            {
              type: 'radio',
              listChoice: ['Âm tính', 'Dương tính'],
              horizontal: true,
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'CK18',
              type: 'none',
              key: 'ck18',
            },
          ],
          [
            {
              type: 'radio',
              listChoice: ['Âm tính', 'Dương tính'],
              horizontal: true,
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'CK5/6',
              type: 'none',
              key: 'ck5_6',
            },
          ],
          [
            {
              type: 'radio',
              listChoice: ['Âm tính', 'Dương tính'],
              horizontal: true,
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'CK17',
              type: 'none',
              key: 'ck17',
            },
          ],
          [
            {
              type: 'radio',
              listChoice: ['Âm tính', 'Dương tính'],
              horizontal: true,
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'EGFR',
              type: 'none',
              key: 'egfr',
            },
          ],
          [
            {
              type: 'radio',
              listChoice: ['Âm tính', 'Dương tính'],
              horizontal: true,
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'p63',
              type: 'none',
              key: 'p63',
            },
          ],
          [
            {
              type: 'radio',
              listChoice: ['Âm tính', 'Dương tính'],
              horizontal: true,
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'D2-40',
              type: 'none',
              key: 'd2_40',
            },
          ],
          [
            {
              type: 'radio',
              listChoice: ['Âm tính', 'Dương tính'],
              horizontal: true,
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Chẩn đoán hình ảnh và y học hạt nhân',
              type: 'title',
              key: 'chan_doan_hinh_anh_va_y_hoc_hat_nhan',
            },
          ],
        ],
        [
          [
            {
              question: 'Siêu âm tuyến vú',
              type: 'none',
              key: 'sieu_am_tuyen_vu',
            },
            {
              prefix: 'Tổng số khối',
              type: 'number',
              key: '',
            },
            {
              type: 'table',
              header: ['Khối thứ', 'Vị trí', 'Kích thước (mm x mm)', 'Phân độ BRADS'],
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
              key: '',
            },
            {
              prefix: 'Tổng số hạch',
              type: 'number',
              key: '',
            },
          ],
        ],
        [
          [
            {
              prefix: 'X-quang',
              type: 'text',
              key: '',
            },
            {
              prefix: 'MRI',
              type: 'text',
              key: '',
            },
            {
              prefix: 'PET/CT',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Mô bệnh học',
              type: 'title',
              key: 'mo_benh_hoc',
            },
          ],
        ],
        [
          [
            {
              prefix: 'Type mô bệnh học',
              type: 'text',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Nhóm mô bệnh học',
              type: 'none',
              key: 'nhom_mo_benh_hoc',
            },
          ],
          [
            {
              listChoice: ['Nhóm A', 'Nhóm B', 'Nhóm C', 'Nhóm D'],
              type: 'radio',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Độ mô học',
              type: 'none',
              key: 'do_mo_hoc',
            },
          ],
          [
            {
              listChoice: ['Độ I', 'Độ II', 'Độ III'],
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
              listChoice: ['Hóa trị tân bổ trợ'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: ['Phác đồ CMF', 'Phác đồ AC', 'Phác đồ ACF', 'khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Hóa trị bổ trợ'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: ['Phác đồ CMF', 'Phác đồ AC', 'Phác đồ ACF', 'khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Hóa trị và điều trị đích giai đoạn tái phát, di căn'],
              type: 'checkbox',
              answer: [false],
              key: '',
            },
          ],
          [
            {
              listChoice: ['Phác đồ CMF', 'Phác đồ AC', 'Phác đồ ACF', 'khác (ghi rõ):'],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
          ],
          [
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
            {
              type: 'text',
              unit: 'chu kì',
              key: '',
            },
          ],
        ],
        [
          [
            {
              question: 'Phương pháp điều trị cùng hóa chất',
              type: 'none',
              key: 'phuong_phap_dieu_tri_cung_hoa_chat',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Phẫu thuật'],
              answer: [false],
              type: 'checkbox',
              key: '',
            },
          ],
          [
            {
              listChoice: ['Bảo tồn', 'Cắt tuyến vú', 'Vét hạch nách', 'Sinh thiết hạch cửa'],
              type: 'checkbox',
              answer: [false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Xạ trị'],
              answer: [false],
              type: 'checkbox',
              key: '',
            },
          ],
          [
            {
              type: 'text',
              unit: 'Gy',
              prefix: 'Liều xạ',
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Điều trị nội tiết'],
              answer: [false],
              type: 'checkbox',
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Tamoxifen',
                'Chất ức chế aromatase',
                'Cắt buồng trứng (phẫu thuật, xạ trị, thuốc)',
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
              listChoice: ['Điều trị đích và điều trị miễn dịch'],
              answer: [false],
              type: 'checkbox',
              key: '',
            },
          ],
          [
            {
              listChoice: [
                'Transtuzumab',
                'Pertuzumab',
                'T-DMT1',
                'Lapatimib',
                'Everolimus',
                'Bevacizumab',
                'Khác (ghi rõ):',
              ],
              type: 'checkbox',
              answer: [false, false, false, false, false, false, false],
              key: '',
            },
          ],
        ],
        [
          [
            {
              listChoice: ['Điều trị khác (ghi rõ)'],
              answer: [false],
              type: 'checkbox',
              key: '',
            },
          ],
          [
            {
              type: 'textarea',
              key: '',
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
      'Mức độ chán ăn/nôn/buồn nôn',
      'Mức độ rụng tóc',
    ],
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
    ],
  ],
  otherInfo: {
    marker: [
      [
        {
          type: 'none',
          question: 'Sau 3 tháng',
        },
        {
          type: 'number',
        },
        {
          type: 'number',
        },
        {
          type: 'number',
        },
      ],
    ],
    tumor: {
      header: ['Thời gian sau sử dụng hóa chất', 'Lâm sàng', 'Siêu âm'],
      body: [
        [
          {
            type: 'none',
            question: 'Sau 3 tháng',
          },
          {
            type: 'number',
          },
          {
            type: 'number',
          },
        ],
      ],
    },
  },
  assessmentResponseTreatment: {
    name: '40.Theo dõi đáp ứng điều trị',
    listQuestions: [
      {
        question: 'Xquang - vú',
        type: 'text',
      },
    ],

    postListQuestions: [
      {
        question: 'Tử vong trong 2 năm theo dõi ',
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
};
export default BREAST;
